```ts
/**
 * Torob API v3 Types
 * مطابق مستندات رسمی ترب
 */

export interface TorobRequest {
  page?: number;
  sort?: string;
  page_urls?: string[];
  page_uniques?: string[];
}

export interface TorobProduct {
  page_unique: string;
  page_url: string;

  title: string;
  current_price: number;

  availability: boolean;

  image_url: string;

  category_name?: string;
  brand_name?: string;
}

export interface TorobResponse {
  products: TorobProduct[];

  total_products: number;

  current_page: number;

  total_pages: number;
}
```
