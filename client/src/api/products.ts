import axios from "axios";
import endpoints from "../endpoints/endpoints";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  sku?: string;
  category: string;
  brand?: string;
  price: number;
  compareAtPrice: number | null;
  currency: string;
  stock: number;
  trackInventory: boolean;
  lowStockThreshold: number;
  images: ProductImage[];
  hasVariants: boolean;
  variants: ProductVariant[];
  status: "draft" | "active" | "archived";
  isFeatured: boolean;
  totalSales: number;
  averageRating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  url: string;
  alt?: string;
  isPrimary: boolean;
}

export interface ProductVariantOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  name?: string;
  sku?: string;
  options: ProductVariantOption[];
  price?: number;
  stock: number;
  image?: string;
}

interface ApiResponse<T> {
  status: "success";
  results?: number;
  data: T;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<ApiResponse<Product[]>>(
    endpoints.products.all,
  );
  return response.data.data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await axios.get<ApiResponse<Product>>(
    endpoints.products.id(id),
  );
  return response.data.data;
};
