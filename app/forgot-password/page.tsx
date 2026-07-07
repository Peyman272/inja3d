"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function ForgotPasswordPage() {


  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);



  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();


    setMessage("");
    setError("");


    if(!email){

      setError(
        "ایمیل را وارد کنید"
      );

      return;

    }



    try{


      setLoading(true);



      const res = await fetch(
        "/api/forgot-password",
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },


          body:JSON.stringify({
            email
          })

        }
      );



      const data = await res.json();



      if(!data.ok){

        setError(
          data.message ||
          "خطا در ارسال ایمیل"
        );

        return;

      }



      setMessage(
        "ایمیل بازیابی رمز ارسال شد. لطفاً صندوق ایمیل خود را بررسی کنید."
      );



    }catch{

      setError(
        "خطا در ارتباط با سرور"
      );


    }finally{

      setLoading(false);

    }

  }





  return (

    <main className="relative">


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

              <Mail
                size={18}
                className="text-gold"
              />

              <span className="eyebrow">
                بازیابی رمز عبور
              </span>

            </div>



            <h1 className="font-display text-3xl text-bone mb-3">
              رمز عبور را فراموش کرده‌اید؟
            </h1>


            <p className="font-body text-sm text-bone-dim mb-8">
              ایمیل خود را وارد کنید تا لینک تغییر رمز برای شما ارسال شود.
            </p>




            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >


              <input

                value={email}

                onChange={(e)=>
                  setEmail(e.target.value)
                }

                className="input-field"

                placeholder="example@email.com"

                dir="ltr"

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
                  "در حال ارسال..."
                  :
                  "ارسال لینک بازیابی"
                }

              </button>


            </form>




            <Link

              href="/login"

              className="flex items-center justify-center gap-2 text-gold text-sm mt-8"

            >

              بازگشت به ورود

              <ArrowRight size={14}/>

            </Link>



          </motion.div>


        </div>


      </section>



      <Footer />


    </main>

  );

}
