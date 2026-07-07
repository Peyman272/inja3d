"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type User = {
  id:string;
  fullName:string;
  email:string;
  phone:string;
};

type AuthContextValue = {
  user: User | null;
  ready: boolean;

  register: (
    fullName: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>;

  login: (
    identifier: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>;

  logout: () => void;
};


const AuthContext = createContext<AuthContextValue | undefined>(undefined);


export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);


useEffect(() => {

  console.log("AUTH CONTEXT MOUNTED");

  const savedUser = localStorage.getItem("user");
  const savedToken = localStorage.getItem("token");

  console.log("AUTH LOAD USER:", savedUser);
  console.log("AUTH LOAD TOKEN:", savedToken);


  if (savedUser && savedToken) {

    try {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

    } catch (error) {

      console.log("USER PARSE ERROR:", error);

    }

  }

  setReady(true);

}, []);


  async function login(
    identifier:string,
    password:string
  ){

    try{

      const res = await fetch("/api/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          identifier,
          password
        })
      });


      const data = await res.json();


      if(!res.ok || !data.ok){

        return {
          ok:false,
          error:data.error || "ورود ناموفق بود"
        };

      }


      const userData:User = {
        id:data.user?.id || "",
        fullName:data.user?.fullName || "",
        email:data.user?.email || "",
        phone:data.user?.phone || "",
      };


      localStorage.setItem(
        "token",
        data.token
      );


      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );


      setUser(userData);


      return {
        ok:true
      };


    }catch(error){

      return {
        ok:false,
        error:"خطا در اتصال به سرور"
      };

    }

  }



  async function register(
    fullName:string,
    email:string,
    phone:string,
    password:string
  ){

    try{

      const res = await fetch("/api/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          fullName,
          email,
          phone,
          password
        })
      });


      const data = await res.json();


      if(!res.ok || !data.ok){

        return {
          ok:false,
          error:data.error || "ثبت نام ناموفق بود"
        };

      }


      return {
        ok:true
      };


    }catch{

      return {
        ok:false,
        error:"خطا در اتصال"
      };

    }

  }




  function logout(){

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

  }



  return (

    <AuthContext.Provider
      value={{
        user,
        ready,
        login,
        register,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}



export function useAuth(){

  const ctx = useContext(AuthContext);

  if(!ctx){
    throw new Error(
      "useAuth باید داخل AuthProvider استفاده شود"
    );
  }


  return ctx;

}
