"use server";

// Get Property Details By Id
export const getPropertyDetails = async (id: string) => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties/${id}`,
  );

  const result = await res.json();

  return result.data;
};

// Get Categories
export const getCategories = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`);

  const result = await res.json();

  return result.data;
};
