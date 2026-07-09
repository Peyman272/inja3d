// دسته‌بندی‌ها دیگر ثابت نیستند — هرچه در پنل ووکامرس تعریف شود همان‌جا نمایش داده می‌شود.
export type ProductCategory = string;

export type Category = {
  id: number;
  name: string;
  slug: string;
  image?: string;
  count: number;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductVariation = {
  id: string;
  price: number;
  attributes: {
    name: string;
    option: string;
  }[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;

  // پشتیبانی از محصولات ساده و متغیر ووکامرس
  type?: "simple" | "variable";
  variations?: ProductVariation[];

  series: string;
  category: ProductCategory;
  categoryId?: number;

  price: number; // به تومان
  compareAtPrice?: number;

  editionSize: number;
  editionLeft: number;

  scale: string;
  sku: string;

  rating: number;
  reviewCount: number;

  shortDescription: string;
  description: string[];

  specs: ProductSpec[];

  image?: string;
  images?: string[];

  featured?: boolean;
  isNew?: boolean;
};

export type ProductReview = {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  series: string;
  category: ProductCategory;
  price: number;
  scale: string;
  qty: number;
};

export type Address = {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  postalCode: string;
  addressLine: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  address: Address;
  paymentMethod: "online" | "cod";
  createdAt: string;
};

export type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
};
