import { NextResponse } from "next/server";


export async function POST(
  req:Request
){

  try{


    const {email}=await req.json();



    const res = await fetch(
      `${process.env.WORDPRESS_URL}/wp-json/inja3d/v1/forgot-password`,
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



    return NextResponse.json(data);



  }catch(error){


    return NextResponse.json(
      {
        ok:false,
        message:"خطای سرور"
      },
      {
        status:500
      }
    );

  }

}
