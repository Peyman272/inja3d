"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";


type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
};


type AuthContextValue = {

  user: User | null;

  ready: boolean;

  login: (
    identifier: string,
    password: string
  ) => Promise<{
    ok: boolean;
    error?: string;
  }>;


  register: (
    fullName: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<{
    ok:boolean;
    error?:string;
  }>;


  logout:()=>void;

};



const AuthContext = createContext<AuthContextValue | undefined>(undefined);



const USER_KEY = "user";
const TOKEN_KEY = "token";



export function AuthProvider({
  children
}:{
  children:ReactNode
}){


  const [user,setUser] = useState<User | null>(null);

  const [ready,setReady] = useState(false);



  // خواندن کاربر بعد از باز شدن سایت

  useEffect(() => {

  console.log("🔥 AUTH MOUNT");


  setTimeout(()=>{

    const savedUser = localStorage.getItem("user");


    console.log(
      "🔥 DELAY USER:",
      savedUser
    );


    if(savedUser){

      setUser(
        JSON.parse(savedUser)
      );

    }


    setReady(true);


  },100);


},[]);





  async function login(
    identifier:string,
    password:string
  ){


    try{


      const res = await fetch(
        "/api/login",
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({

            identifier,

            password

          })

        }
      );



      const data = await res.json();



      if(!res.ok || !data.ok){

        return {

          ok:false,

          error:data.error || "ورود ناموفق بود"

        };

      }



      const userData:User = {


        id:
          data.user.id || "",


        fullName:
          data.user.fullName ||
          data.user.name ||
          "",


        email:
          data.user.email ||
          data.user_email ||
          "",


        phone:
          data.user.phone ||
          ""

      };




      localStorage.setItem(
        TOKEN_KEY,
        data.token
      );



      localStorage.setItem(
        USER_KEY,
        JSON.stringify(userData)
      );



      console.log(
        "LOGIN USER SAVED:",
        userData
      );



      setUser(userData);



      return {

        ok:true

      };



    }catch(error:any){


      return {

        ok:false,

        error:
          error.message ||
          "خطای اتصال"

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


      const res = await fetch(
        "/api/register",
        {

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

        }
      );



      const data = await res.json();



      if(!res.ok || !data.ok){

        return {

          ok:false,

          error:
          data.error ||
          "ثبت نام ناموفق بود"

        };

      }



      return {

        ok:true

      };



    }catch{


      return {

        ok:false,

        error:"خطای اتصال"

      };


    }


  }






  function logout(){


    localStorage.removeItem(USER_KEY);

    localStorage.removeItem(TOKEN_KEY);


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


  const context =
    useContext(AuthContext);



  if(!context){

    throw new Error(
      "useAuth باید داخل AuthProvider باشد"
    );

  }


  return context;


}
