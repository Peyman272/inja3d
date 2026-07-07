import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json(
        {
          ok: false,
          error: "ایمیل یا شماره موبایل و رمز عبور را وارد کنید",
        },
        { status: 400 }
      );
    }

    const baseUrl = process.env.WORDPRESS_URL;

    let username = identifier;
    let phone = "";


    // اگر شماره موبایل وارد شده
    if (/^09\d{9}$/.test(identifier)) {

      const consumerKey = process.env.WC_CONSUMER_KEY;
      const consumerSecret = process.env.WC_CONSUMER_SECRET;


      const auth = Buffer.from(
        `${consumerKey}:${consumerSecret}`
      ).toString("base64");


      const customerRes = await fetch(
        `${baseUrl}/wp-json/wc/v3/customers?search=${identifier}`,
        {
          headers:{
            Authorization:`Basic ${auth}`
          }
        }
      );


      const customers = await customerRes.json();


      if (!customers.length) {

        return NextResponse.json(
          {
            ok:false,
            error:"کاربری با این شماره پیدا نشد"
          },
          {
            status:404
          }
        );

      }


      username = customers[0].email;
      phone = customers[0]?.billing?.phone || "";

    }



    // ورود JWT وردپرس

    const loginRes = await fetch(
      `${baseUrl}/wp-json/jwt-auth/v1/token`,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          username,
          password
        })
      }
    );


    const data = await loginRes.json();



    if(!loginRes.ok){

      return NextResponse.json(
        {
          ok:false,
          error:"ایمیل یا رمز عبور اشتباه است"
        },
        {
          status:401
        }
      );

    }



    // گرفتن اطلاعات کامل کاربر

    const userRes = await fetch(
      `${baseUrl}/wp-json/wp/v2/users/${data.user_id}`,
      {
        headers:{
          Authorization:`Bearer ${data.token}`
        }
      }
    );


    const wpUser = await userRes.json();



    return NextResponse.json({

      ok:true,

      token:data.token,


      user:{

        id:String(data.user_id),

        fullName:
          wpUser.name || data.user_display_name,

        email:
          data.user_email,

        phone

      }

    });



catch(error:any){

    console.log("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        ok:false,
        error:error.message || "خطای سرور"
      },
      {
        status:500
      }
    );

}
