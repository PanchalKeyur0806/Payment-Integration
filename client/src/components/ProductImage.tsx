import { useState } from "react";

interface ProductImageProps {
  src?: string;
  alt: string;
  className: string;
  loading?: "eager" | "lazy";
}

const FALLBACK_IMAGE = "/product-placeholder.svg";

const ProductImage = ({
  src,
  alt,
  className,
  loading = "lazy",
}: ProductImageProps) => {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const imageSource = src?.trim() && failedSource !== src ? src : FALLBACK_IMAGE;

  return (
    <img
      src={imageSource}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => setFailedSource(src?.trim() ?? "")}
    />
  );
};

export default ProductImage;
