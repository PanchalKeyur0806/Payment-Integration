import Category from "../models/category.model";
import Product from "../models/product.model";

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    description: "Everyday electronic devices and accessories.",
    sortOrder: 1,
    isFeatured: true,
  },
  {
    name: "Home & Living",
    slug: "home-living",
    description: "Useful essentials for your home.",
    sortOrder: 2,
    isFeatured: true,
  },
  {
    name: "Fashion",
    slug: "fashion",
    description: "Comfortable clothing and everyday wear.",
    sortOrder: 3,
    isFeatured: true,
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Practical accessories for work and travel.",
    sortOrder: 4,
    isFeatured: false,
  },
];

const products = [
  {
    name: "Wireless Headphones",
    slug: "wireless-headphones",
    sku: "ELEC-001",
    category: "electronics",
    brand: "SoundCore",
    description:
      "Comfortable over-ear wireless headphones with clear sound and a long-lasting battery.",
    shortDescription: "Over-ear Bluetooth headphones with up to 30 hours of playback.",
    price: 2499,
    compareAtPrice: 3299,
    stock: 45,
    isFeatured: true,
    averageRating: 4.7,
    totalReviews: 38,
    totalSales: 120,
  },
  {
    name: "Portable Bluetooth Speaker",
    slug: "portable-bluetooth-speaker",
    sku: "ELEC-002",
    category: "electronics",
    brand: "SoundCore",
    description:
      "A compact Bluetooth speaker with balanced audio and a splash-resistant design.",
    shortDescription: "Portable speaker for music at home or on the go.",
    price: 1799,
    compareAtPrice: 2299,
    stock: 32,
    isFeatured: false,
    averageRating: 4.5,
    totalReviews: 24,
    totalSales: 86,
  },
  {
    name: "USB-C Fast Charger",
    slug: "usb-c-fast-charger",
    sku: "ELEC-003",
    category: "electronics",
    brand: "Volt",
    description:
      "A compact USB-C wall charger designed for fast, reliable charging of compatible devices.",
    shortDescription: "Compact 30W USB-C charger for compatible devices.",
    price: 899,
    compareAtPrice: 1199,
    stock: 75,
    isFeatured: false,
    averageRating: 4.6,
    totalReviews: 51,
    totalSales: 203,
  },
  {
    name: "Insulated Water Bottle",
    slug: "insulated-water-bottle",
    sku: "HOME-001",
    category: "home-living",
    brand: "Everday",
    description:
      "A reusable stainless-steel bottle that helps keep drinks at a comfortable temperature.",
    shortDescription: "Reusable stainless-steel bottle for everyday hydration.",
    price: 749,
    compareAtPrice: 999,
    stock: 60,
    isFeatured: true,
    averageRating: 4.4,
    totalReviews: 19,
    totalSales: 94,
  },
  {
    name: "Ceramic Coffee Mug Set",
    slug: "ceramic-coffee-mug-set",
    sku: "HOME-002",
    category: "home-living",
    brand: "Hearth",
    description:
      "A set of two sturdy ceramic mugs suited to your morning coffee or evening tea.",
    shortDescription: "Two ceramic mugs for coffee, tea, and more.",
    price: 599,
    compareAtPrice: 799,
    stock: 28,
    isFeatured: false,
    averageRating: 4.3,
    totalReviews: 14,
    totalSales: 47,
  },
  {
    name: "Classic Cotton T-Shirt",
    slug: "classic-cotton-t-shirt",
    sku: "FASH-001",
    category: "fashion",
    brand: "Northline",
    description:
      "A soft cotton crew-neck T-shirt with a comfortable fit for daily wear.",
    shortDescription: "An easy-to-wear everyday cotton T-shirt.",
    price: 699,
    compareAtPrice: 899,
    stock: 50,
    isFeatured: true,
    averageRating: 4.5,
    totalReviews: 31,
    totalSales: 112,
  },
  {
    name: "Everyday Canvas Tote",
    slug: "everyday-canvas-tote",
    sku: "FASH-002",
    category: "fashion",
    brand: "Northline",
    description:
      "A reusable canvas tote with reinforced handles for shopping, commuting, or errands.",
    shortDescription: "A durable reusable tote for everyday carry.",
    price: 449,
    compareAtPrice: 599,
    stock: 42,
    isFeatured: false,
    averageRating: 4.2,
    totalReviews: 12,
    totalSales: 58,
  },
  {
    name: "Minimalist Desk Organizer",
    slug: "minimalist-desk-organizer",
    sku: "ACC-001",
    category: "accessories",
    brand: "WorkSpace",
    description:
      "A compact organizer with dedicated spaces for pens, notes, and small desk essentials.",
    shortDescription: "Keep everyday desk essentials neatly arranged.",
    price: 999,
    compareAtPrice: 1299,
    stock: 24,
    isFeatured: false,
    averageRating: 4.4,
    totalReviews: 16,
    totalSales: 39,
  },
  {
    name: "Everyday Backpack",
    slug: "everyday-backpack",
    sku: "ACC-002",
    category: "accessories",
    brand: "Trailway",
    description:
      "A lightweight backpack with a roomy main compartment and practical pockets for daily essentials.",
    shortDescription: "A lightweight backpack for commuting and day trips.",
    price: 1899,
    compareAtPrice: 2499,
    stock: 18,
    isFeatured: true,
    averageRating: 4.6,
    totalReviews: 27,
    totalSales: 73,
  },
  {
    name: "Foldable Phone Stand",
    slug: "foldable-phone-stand",
    sku: "ACC-003",
    category: "accessories",
    brand: "WorkSpace",
    description:
      "An adjustable foldable stand that holds a compatible phone at a comfortable viewing angle.",
    shortDescription: "A portable adjustable stand for your phone.",
    price: 349,
    compareAtPrice: 499,
    stock: 90,
    isFeatured: false,
    averageRating: 4.1,
    totalReviews: 22,
    totalSales: 156,
  },
];

export async function seedProducts(): Promise<void> {
  const categoryIds = new Map<string, (typeof Category.prototype)["_id"]>();

  for (const category of categories) {
    await Category.updateOne(
      { slug: category.slug },
      { $set: category },
      { upsert: true },
    );

    const savedCategory = await Category.findOne({ slug: category.slug })
      .select("_id")
      .orFail();
    categoryIds.set(category.slug, savedCategory._id);
  }

  await Product.bulkWrite(
    products.map(({ category, ...product }) => {
      const categoryId = categoryIds.get(category);

      if (!categoryId) {
        throw new Error(`Missing seeded category: ${category}`);
      }

      return {
        updateOne: {
          filter: { slug: product.slug },
          update: {
            $set: {
              ...product,
              category: categoryId,
              currency: "INR",
              status: "active",
              images: [
                {
                  url: `https://placehold.co/600x600?text=${encodeURIComponent(product.name)}`,
                  alt: product.name,
                  isPrimary: true,
                },
              ],
            },
          },
          upsert: true,
        },
      };
    }),
  );
}