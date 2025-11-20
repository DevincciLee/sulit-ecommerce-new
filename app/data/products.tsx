import { createClient } from "@/utils/supabase/client";

export const getProducts = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("products").select(`
      *
    `);

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  // ✅ Map DB fields to your desired object shape
  return data.map((p) => ({
    id: p.id,
    name: p.name,
    imageUrl: p.image, // map DB "image" to "imageUrl"
    price: p.price,
    originalPrice: p.original_price,
    rating: p.rating ?? 0, // default if null
    ratingCount: p.rating_count ?? 0,
    badge: p.badge,
    category: p.category,
  }));
};
