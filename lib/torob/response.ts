import { TorobProduct, TorobResponse } from "./types";


export function createTorobResponse(
  products: TorobProduct[],
  page: number,
  total: number
): TorobResponse {

  return {

    api_version: "torob_api_v3",

    current_page: page,

    total: total,

    max_pages: Math.max(
      1,
      Math.ceil(total / 100)
    ),

    products

  };

}
