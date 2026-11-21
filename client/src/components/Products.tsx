import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, type Product } from "../api/products";
import ProductImage from "./ProductImage";

const formatPrice = (amount: number, currency: string) =>
  `${currency} ${amount.toLocaleString("en-IN")}`;

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setProducts(await getProducts());
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load products",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadProducts();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 h-8 w-48 animate-pulse rounded bg-slate-200" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="h-96 animate-pulse rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 px-4">
        <div
          role="alert"
          className="w-full max-w-lg rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
            Could not load products
          </p>
          <p className="mt-2 text-slate-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Discover
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Our products
            </h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Explore the collection and find the right product for you.
            </p>
          </div>
          <p className="text-sm font-medium text-slate-500">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </header>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <h2 className="text-lg font-semibold text-slate-900">
              No products yet
            </h2>
            <p className="mt-2 text-slate-600">
              Products will appear here once they are available.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const primaryImage =
                product.images.find((image) => image.isPrimary) ??
                product.images[0];

              return (
                <article
                  key={product._id}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link
                    to={`/products/${product._id}`}
                    className="relative block aspect-[4/3] overflow-hidden bg-slate-100"
                    aria-label={`View ${product.name}`}
                  >
                    <ProductImage
                      src={primaryImage?.url}
                      alt={primaryImage?.alt || product.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      {product.isFeatured && (
                        <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                          Featured
                        </span>
                      )}
                      <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold capitalize text-slate-700 shadow-sm">
                        {product.status}
                      </span>
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                          {product.brand || "Collection"}
                        </p>
                        <h2 className="mt-1 truncate text-lg font-bold text-slate-900">
                          <Link
                            to={`/products/${product._id}`}
                            className="rounded-sm outline-none hover:text-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-500"
                          >
                            {product.name}
                          </Link>
                        </h2>
                      </div>
                      <p className="shrink-0 text-right text-xs text-slate-500">
                        SKU
                        <span className="mt-1 block font-medium text-slate-700">
                          {product.sku || "—"}
                        </span>
                      </p>
                    </div>

                    <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-slate-600">
                      {product.shortDescription || product.description}
                    </p>

                    <div className="mt-4 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-xl font-bold text-slate-900">
                          {formatPrice(product.price, product.currency)}
                        </p>
                        {product.compareAtPrice !== null && (
                          <p className="text-sm text-slate-400 line-through">
                            {formatPrice(
                              product.compareAtPrice,
                              product.currency,
                            )}
                          </p>
                        )}
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          product.stock > 0
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </span>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-4 text-center">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {product.averageRating.toFixed(1)} / 5
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {product.totalReviews} reviews
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {product.totalSales.toLocaleString("en-IN")}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">Sales</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {product.images.length}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">Images</p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Products;
