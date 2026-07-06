"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();

  const key = searchParams.get("key");
  const login = searchParams.get("login");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  async function handleReset() {
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key,
        login,
        password,
      }),
    });

    const data = await res.json();

    if (!data.ok) setMsg(data.error);
    else setMsg("رمز تغییر کرد ✔");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[350px] p-5 bg-zinc-900 text-white rounded-xl">

        <h1>تغییر رمز</h1>

        <input
          type="password"
          placeholder="رمز جدید"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 text-black mt-3"
        />

        <input
          type="password"
          placeholder="تکرار رمز"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full p-2 text-black mt-2"
        />

        <button
          onClick={handleReset}
          className="w-full mt-4 bg-yellow-500 text-black p-2"
        >
          تغییر رمز
        </button>

        {msg && <p className="mt-3 text-sm">{msg}</p>}
      </div>
    </div>
  );
}
