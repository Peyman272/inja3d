"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type User = {
  email: string;
  name?: string;
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


  const [user,setUser] = useState<User|null>(null);
  const [ready,setReady] = useState(false);



  useEffect(()=>{

    const savedUser = localStorage.getItem("user");

    if(savedUser){
      setUser(JSON.parse(savedUser));
    }

    setReady(true);

  },[]);



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


      localStorage.setItem(
        "token",
        data.token
      );


      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );


      setUser(data.user);


      return {
        ok:true
      };


    }catch(e){

      return {
        ok:false,
        error:"خطا در اتصال"
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
