/**
 * Torob API v3 Types
 */

export interface TorobRequest {
  page?: number;
  sort?: "date_added_desc" | "date_updated_desc";
  page_urls?: string[];
  page_uniques?: string[];
}


export interface TorobProduct {

  page_unique: string;

  page_url: string;

  product_group_id?: string;

  title: string;

  subtitle?: string;

  current_price: number;

  old_price?: number;

  availability: boolean;

  category_name?: string;

  image_links: string[];

  short_desc?: string;

  spec?: Record<string, string | number>;

  guarantee?: string;

  date_added: string;

  date_updated?: string;

}


export interface TorobResponse {

  api_version: "torob_api_v3";

  current_page: number;

  total: number;

  max_pages: number;

  products: TorobProduct[];

}
