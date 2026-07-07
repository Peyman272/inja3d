"use client";

export default function TrustBadges(){

  return (
    <div className="flex items-center gap-5">

      <a
        href="https://trustseal.enamad.ir/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="/images/enamad.png"
          alt="نماد اعتماد الکترونیکی"
          className="w-20"
        />
      </a>


      <div>
        <img
          src="/images/zarinpal.png"
          alt="زرین پال"
          className="w-20"
        />
      </div>

    </div>
  );

}
