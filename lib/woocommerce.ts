// این فایل فقط سمت سرور اجرا می‌شود (در مسیرهای app/api/*)
// کلیدهای ووکامرس هرگز نباید به مرورگر ارسال شوند.

const WC_URL = process.env.WORDPRESS_URL; // مثل: https://yourdomain.com
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

type WcResult<T> = {
  data: T;
  totalPages: number;
  total: number;
};

export async function wcFetch<T = any>(
  path: string,
  searchParams: Record<string, string | number | undefined> = {}
): Promise<WcResult<T>> {
  if (!WC_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
    throw new Error(
      "متغیرهای اتصال ووکامرس تنظیم نشده‌اند. لطفاً WORDPRESS_URL و WC_CONSUMER_KEY و WC_CONSUMER_SECRET را در .env.local وارد کنید."
    );
  }

  const url = new URL(`/wp-json/wc/v3${path}`, WC_URL);
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Basic ${auth}` },
    // در تولید هر ۶۰ ثانیه یک‌بار از ووکامرس رفرش می‌شود (کش Next.js)
    cache: "force-cache",
next: { revalidate: 300 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`خطای ووکامرس (${res.status}): ${text}`);
  }

  const totalPages = Number(res.headers.get("x-wp-totalpages") ?? "1");
  const total = Number(res.headers.get("x-wp-total") ?? "0");
  const data = (await res.json()) as T;

  return { data, totalPages, total };
}
