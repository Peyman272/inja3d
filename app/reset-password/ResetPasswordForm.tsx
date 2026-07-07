"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function ResetPasswordPage() {

  const router = useRouter();
  const searchParams = useSearchParams();


  const key = searchParams.get("key");
  const login = searchParams.get("login");


  const [password,setPassword] = useState("");
  const [confirm,setConfirm] = useState("");

  const [message,setMessage] = useState("");
  const [error,setError] = useState("");

  const [loading,setLoading] = useState(false);



  async function handleSubmit(
    e:React.FormEvent
  ){

    e.preventDefault();


    setError("");
    setMessage("");


    if(!password || !confirm){

      setError(
        "رمز جدید را وارد کنید"
      );

      return;

    }


    if(password !== confirm){

      setError(
        "رمزها یکسان نیستند"
      );

      return;

    }



    try{

      setLoading(true);


      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/inja3d/v1/reset-password`,
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({

            key,

            login,

            password

          })

        }
      );



      const data = await res.json();

console.log("RESET RESPONSE:", data);

if(!data.ok){
  setError(
    data.message ||
    "خطا در تغییر رمز"
  );
  return;
}


      setMessage(
        "رمز عبور با موفقیت تغییر کرد. در حال انتقال به ورود..."
      );


      setTimeout(()=>{

        router.push("/login");

      },2000);



    }catch{

      setError(
        "خطا در ارتباط با سرور"
      );


    }finally{

      setLoading(false);

    }

  }




  return (

    <main>


      <Navbar />


      <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6">


        <div className="absolute inset-0 bg-gold-radial pointer-events-none" />


        <div className="relative mx-auto w-full max-w-md">


          <motion.div

            initial={{
              opacity:0,
              y:20
            }}

            animate={{
              opacity:1,
              y:0
            }}

            className="glass-strong rounded-sm p-8 md:p-10 border-gold/15"

          >


            <div className="flex items-center gap-3 mb-4">

              <LockKeyhole
                size={18}
                className="text-gold"
              />

              <span className="eyebrow">
                تغییر رمز عبور
              </span>

            </div>



            <h1 className="font-display text-3xl text-bone mb-3">
              رمز جدید
            </h1>



            <p className="font-body text-sm text-bone-dim mb-8">
              رمز عبور جدید خود را وارد کنید.
            </p>




            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >


              <input

                type="password"

                value={password}

                onChange={(e)=>
                  setPassword(e.target.value)
                }

                className="input-field"

                placeholder="رمز جدید"

              />



              <input

                type="password"

                value={confirm}

                onChange={(e)=>
                  setConfirm(e.target.value)
                }

                className="input-field"

                placeholder="تکرار رمز جدید"

              />



              {error && (

                <p className="text-red-400 text-xs">
                  {error}
                </p>

              )}



              {message && (

                <p className="text-green-400 text-xs">
                  {message}
                </p>

              )}




              <button

                disabled={loading}

                className="bg-gold text-ink py-3 font-body text-sm font-semibold"

              >

                {
                  loading
                  ?
                  "در حال تغییر..."
                  :
                  "تغییر رمز"
                }


              </button>


            </form>



            <Link

              href="/login"

              className="block text-center text-gold text-sm mt-8"

            >

              بازگشت به ورود

            </Link>



          </motion.div>


        </div>


      </section>



      <Footer />


    </main>

  );

}
