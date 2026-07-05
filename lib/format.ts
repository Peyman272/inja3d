export function toPersianDigits(input: number | string): string {
  const map = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(input).replace(/[0-9]/g, (d) => map[Number(d)]);
}

export function formatToman(amount: number): string {
  const grouped = Math.round(amount).toLocaleString("en-US").replace(/,/g, "٬");
  return `${toPersianDigits(grouped)} تومان`;
}

export function formatNumber(amount: number): string {
  return toPersianDigits(Math.round(amount).toLocaleString("en-US").replace(/,/g, "٬"));
}
