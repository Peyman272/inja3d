import { NextResponse } from "next/server";

export async function POST() {

  return NextResponse.json({
    api_version: "torob_api_v3",
    message: "Torob API is working"
  });

}
