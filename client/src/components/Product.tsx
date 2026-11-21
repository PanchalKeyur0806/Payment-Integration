import { useEffect, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct, type Product as ProductData } from "../api/products";
import ProductImage from "./ProductImage";

const formatPrice = (amount: number, currency: string) =>
  `${currency} ${amount.toLocaleString("en-IN")}`;

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));

const Detail = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="min-w-0">
    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {label}
    </dt>
    <dd className="mt-1 break-words text-sm font-medium text-slate-900">
      {children}
    </dd>
  </div>
);

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadProduct = async () => {
      try {
        setProduct(await getProduct(id));
        setError("");
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load product",
        );
      }
    };

    void loadProduct();
  }, [id]);

  if (!id) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 px-4">
        <p role="alert" className="text-red-700">
          Product id is required
        </p>
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
            Could not load product
          </p>
          <p className="mt-2 text-slate-600">{error}</p>
          <Link
            to="/products"
            className="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Back to products
          </Link>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 h-5 w-36 animate-pulse rounded bg-slate-200" />
          <div className="h-80 animate-pulse rounded-3xl bg-white shadow-sm ring-1 ring-slate-200" />
        </div>
      </main>
    );
  }

  const statusStyles: Record<ProductData["status"], string> = {
    active: "bg-emerald-100 text-emerald-800",
    draft: "bg-amber-100 text-amber-800",
    archived: "bg-slate-200 text-slate-700",
  };
  const primaryImage =
    product.images.find((image) => image.isPrimary) ?? product.images[0];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-slate-600 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
        >
          <span aria-hidden="true">←</span> Back to products
        </Link>

        <article className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="grid lg:grid-cols-[1fr_0.9fr]">
            <div className="relative min-h-72 bg-slate-100 lg:min-h-[480px]">
              <ProductImage
                src={primaryImage?.url}
                alt={primaryImage?.alt || product.name}
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
              />
              {primaryImage?.isPrimary && (
                <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                  Primary image
                </span>
              )}
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyles[product.status]}`}
                >
                  {product.status}
                </span>
                {product.isFeatured && (
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-800">
                    Featured
                  </span>
                )}
              </div>

              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
                {product.brand || "Product"}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-2 text-sm text-slate-500">/{product.slug}</p>

              {product.shortDescription && (
                <p className="mt-5 text-lg leading-7 text-slate-600">
                  {product.shortDescription}
                </p>
              )}

              <div className="mt-7 flex flex-wrap items-end gap-x-4 gap-y-2">
                <p className="text-3xl font-bold text-slate-950">
                  {formatPrice(product.price, product.currency)}
                </p>
                {product.compareAtPrice !== null && (
                  <p className="pb-1 text-lg text-slate-400 line-through">
                    {formatPrice(product.compareAtPrice, product.currency)}
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                    product.stock > 0
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </span>
                <span className="text-sm text-slate-600">
                  {product.averageRating.toFixed(1)} / 5 · {product.totalReviews}{" "}
                  reviews
                </span>
              </div>

              <p className="mt-7 border-t border-slate-100 pt-5 text-sm leading-6 text-slate-600">
                {product.description}
              </p>
            </div>
          </div>

          <div className="space-y-8 border-t border-slate-200 p-6 sm:p-10">
            <section aria-labelledby="product-info-title">
              <h2
                id="product-info-title"
                className="text-lg font-bold text-slate-900"
              >
                Product information
              </h2>
              <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
                <Detail label="Product ID">{product._id}</Detail>
                <Detail label="Slug">{product.slug}</Detail>
                <Detail label="SKU">{product.sku || "Not set"}</Detail>
                <Detail label="Category">{product.category}</Detail>
                <Detail label="Brand">{product.brand || "Not set"}</Detail>
                <Detail label="Price">
                  {formatPrice(product.price, product.currency)}
                </Detail>
                <Detail label="Compare-at price">
                  {product.compareAtPrice === null
                    ? "Not set"
                    : formatPrice(product.compareAtPrice, product.currency)}
                </Detail>
                <Detail label="Currency">{product.currency}</Detail>
                <Detail label="Status">
                  <span className="capitalize">{product.status}</span>
                </Detail>
                <Detail label="Featured">
                  {product.isFeatured ? "Yes" : "No"}
                </Detail>
              </dl>
            </section>

            <section
              aria-labelledby="inventory-title"
              className="border-t border-slate-100 pt-7"
            >
              <h2
                id="inventory-title"
                className="text-lg font-bold text-slate-900"
              >
                Inventory
              </h2>
              <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
                <Detail label="Stock">{product.stock}</Detail>
                <Detail label="Inventory tracking">
                  {product.trackInventory ? "Enabled" : "Disabled"}
                </Detail>
                <Detail label="Low-stock threshold">
                  {product.lowStockThreshold}
                </Detail>
                <Detail label="Has variants">
                  {product.hasVariants ? "Yes" : "No"}
                </Detail>
              </dl>
            </section>

            <section
              aria-labelledby="performance-title"
              className="border-t border-slate-100 pt-7"
            >
              <h2
                id="performance-title"
                className="text-lg font-bold text-slate-900"
              >
                Performance
              </h2>
              <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                <Detail label="Total sales">
                  {product.totalSales.toLocaleString("en-IN")}
                </Detail>
                <Detail label="Average rating">
                  {product.averageRating.toFixed(1)} / 5
                </Detail>
                <Detail label="Total reviews">{product.totalReviews}</Detail>
              </dl>
            </section>

            <section
              aria-labelledby="images-title"
              className="border-t border-slate-100 pt-7"
            >
              <h2
                id="images-title"
                className="text-lg font-bold text-slate-900"
              >
                Images <span className="text-sm font-medium text-slate-500">({product.images.length})</span>
              </h2>
              {product.images.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">No images added.</p>
              ) : (
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {product.images.map((image, index) => (
                    <div
                      key={`${image.url}-${index}`}
                      className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                    >
                      <ProductImage
                        src={image.url}
                        alt={image.alt || `${product.name} image ${index + 1}`}
                        className="h-48 w-full object-cover"
                      />
                      <dl className="grid gap-3 p-4 sm:grid-cols-2">
                        <Detail label="Image URL">{image.url}</Detail>
                        <Detail label="Alt text">{image.alt || "Not set"}</Detail>
                        <Detail label="Primary image">
                          {image.isPrimary ? "Yes" : "No"}
                        </Detail>
                      </dl>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section
              aria-labelledby="variants-title"
              className="border-t border-slate-100 pt-7"
            >
              <h2
                id="variants-title"
                className="text-lg font-bold text-slate-900"
              >
                Variants <span className="text-sm font-medium text-slate-500">({product.variants.length})</span>
              </h2>
              {product.variants.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">
                  No variants configured.
                </p>
              ) : (
                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  {product.variants.map((variant, index) => (
                    <div
                      key={`${variant.sku || variant.name || "variant"}-${index}`}
                      className="rounded-xl border border-slate-200 p-5"
                    >
                      {variant.image && (
                        <ProductImage
                          src={variant.image}
                          alt={variant.name || `${product.name} variant`}
                          className="mb-4 h-40 w-full rounded-lg object-cover"
                        />
                      )}
                      <dl className="grid gap-4 sm:grid-cols-2">
                        <Detail label="Name">{variant.name || "Not set"}</Detail>
                        <Detail label="SKU">{variant.sku || "Not set"}</Detail>
                        <Detail label="Price">
                          {variant.price === undefined
                            ? "Use product price"
                            : formatPrice(variant.price, product.currency)}
                        </Detail>
                        <Detail label="Stock">{variant.stock}</Detail>
                        <Detail label="Image URL">
                          {variant.image || "Not set"}
                        </Detail>
                        <Detail label="Options">
                          {variant.options.length === 0
                            ? "None"
                            : variant.options
                                .map(({ name, value }) => `${name}: ${value}`)
                                .join(", ")}
                        </Detail>
                      </dl>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section
              aria-labelledby="record-title"
              className="border-t border-slate-100 pt-7"
            >
              <h2
                id="record-title"
                className="text-lg font-bold text-slate-900"
              >
                Record timestamps
              </h2>
              <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                <Detail label="Created">{formatDate(product.createdAt)}</Detail>
                <Detail label="Last updated">
                  {formatDate(product.updatedAt)}
                </Detail>
              </dl>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
};

export default Product;
