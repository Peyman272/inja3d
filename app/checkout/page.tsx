async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError("");

  if (items.length === 0) {
    setError("سبد خرید شما خالی است.");
    return;
  }

  if (!address.fullName || !address.phone || !address.city || !address.addressLine || !address.postalCode) {
    setError("لطفاً همه‌ی فیلدهای آدرس را تکمیل کنید.");
    return;
  }

  if (!/^09\d{9}$/.test(address.phone)) {
    setError("شماره موبایل معتبر نیست.");
    return;
  }

  setSubmitting(true);

  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items.map((i) => ({
          id: i.productId,
          quantity: i.qty,
        })),
        billing: {
          first_name: address.fullName,
          phone: address.phone,
          address_1: address.addressLine,
          city: address.city,
          postcode: address.postalCode,
          country: "IR",
        },
        shipping: {
          first_name: address.fullName,
          address_1: address.addressLine,
          city: address.city,
          postcode: address.postalCode,
          country: "IR",
        },
        payment_method: payment === "online" ? "zarinpal" : "cod",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError("خطا در ثبت سفارش");
      setSubmitting(false);
      return;
    }

    // 💳 اگر درگاه برگرده
    if (data.payment_url) {
      window.location.href = data.payment_url;
      return;
    }

    // 🧾 اگر COD یا بدون درگاه
    clearCart();
    router.push(`/checkout/success?order=${data.order_id}`);
  } catch (err) {
    setError("خطا در ارتباط با سرور");
  }

  setSubmitting(false);
}
