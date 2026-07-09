import { Product, Category } from "./types";

const TOMAN_DIVIDER = 10;

export function adaptProduct(raw: any): Product {
  const firstCategory = raw?.categories?.[0];

  const variations = Array.isArray(raw?.variations)
    ? raw.variations.map((v: any) => ({
        id: String(v?.id ?? ""),
        price: toNumber(v?.price, 0) / TOMAN_DIVIDER,
        attributes: Array.isArray(v?.attributes)
          ? v.attributes.map((a: any) => ({
              name: a?.name ?? "",
              option: a?.option ?? "",
            }))
          : [],
      }))
    : [];

  const rawPrice = toNumber(raw?.price, 0) / TOMAN_DIVIDER;
  const rawRegular = toNumber(raw?.regular_price, rawPrice) / TOMAN_DIVIDER;

  const finalPrice =
    raw?.type === "variable" && variations.length > 0
      ? variations[0].price
      : rawPrice;

  const hasDiscount = rawRegular > finalPrice && finalPrice > 0;

  const images: string[] = Array.isArray(raw?.images)
    ? raw.images.map((img: any) => img?.src).filter(Boolean)
    : [];

  const inStock = raw?.stock_status === "instock";
  const stockQty =
    raw?.stock_quantity != null
      ? toNumber(raw.stock_quantity, 0)
      : undefined;

  return {
    id: String(raw?.id ?? raw?.slug ?? Math.random()),
    slug: raw?.slug ?? String(raw?.id ?? ""),

    name: raw?.name ?? "بدون‌نام",

    type: raw?.type ?? "simple",
    variations,

    series: firstCategory?.name ?? "مجموعه‌ی ویژه",
    category: firstCategory?.name ?? "عمومی",
    categoryId: firstCategory?.id,

    price: finalPrice,

    compareAtPrice: hasDiscount ? rawRegular : undefined,

    editionSize: stockQty ?? (inStock ? 100 : 0),
    editionLeft: stockQty ?? (inStock ? 40 : 0),

    scale:
      extractAttribute(raw, "مقیاس") ??
      extractAttribute(raw, "scale") ??
      "استاندارد",

    sku: raw?.sku ?? "",

    rating: toNumber(raw?.average_rating, 0),
    reviewCount: toNumber(raw?.rating_count, 0),

    shortDescription: stripHtml(raw?.short_description) ?? "",

    description: raw?.description
      ? splitParagraphs(stripHtml(raw.description) ?? "")
      : [],

    specs: Array.isArray(raw?.attributes)
      ? raw.attributes
          .filter((a: any) => a?.name && Array.isArray(a?.options))
          .map((a: any) => ({
            label: a.name,
            value: a.options.join("، "),
          }))
      : [],

    image: images[0],
    images,

    featured: Boolean(raw?.featured),
    isNew: isRecentlyPublished(raw?.date_created),
  };
}

export function adaptCategory(raw: any): Category {
  return {
    id: raw?.id,
    name: raw?.name ?? "",
    slug: raw?.slug ?? "",
    image: raw?.image?.src,
    count: toNumber(raw?.count, 0),
  };
}

function toNumber(value: unknown, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && value !== "" && value != null
    ? n
    : fallback;
}

function stripHtml(html?: string): string | undefined {
  if (!html) return undefined;

  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function extractAttribute(raw: any, name: string): string | undefined {
  const attr = raw?.attributes?.find(
    (a: any) => a?.name === name
  );

  return attr?.options?.[0];
}

function isRecentlyPublished(dateCreated?: string): boolean {
  if (!dateCreated) return false;

  const created = new Date(dateCreated).getTime();

  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

  return Date.now() - created < THIRTY_DAYS;
}
