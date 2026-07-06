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
  const [loading, setLoading] = useState(false);

  async function handleReset() {
    setMsg("");

    if (!password || password.length < 6) {
      setMsg("رمز باید حداقل ۶ کاراکتر باشد");
      return;
    }

    if (password !== confirm) {
      setMsg("رمز و تکرار آن یکسان نیست");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key,
          login,
          password,
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        setMsg(data.error || "خطا در تغییر رمز");
      } else {
        setMsg("رمز با موفقیت تغییر کرد ✔");
      }
    } catch (err: any) {
      setMsg("خطای سرور");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-sm bg-zinc-900 p-6 rounded-xl">

        <h1 className="text-xl mb-4">تغییر رمز عبور</h1>

        <input
          type="password"
          placeholder="رمز جدید"
          className="w-full p-2 text-black rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="تکرار رمز"
          className="w-full p-2 text-black rounded"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full mt-4 bg-yellow-500 text-black py-2 rounded font-bold"
        >
          {loading ? "در حال ذخیره..." : "تغییر رمز"}
        </button>

        {msg && (
          <p className="mt-3 text-sm text-center text-white/80">
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}
