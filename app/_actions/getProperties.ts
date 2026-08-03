export const getProperties = async ({
  query,
}: {
  query?: { [key: string]: string | undefined };
}) => {
  const params = new URLSearchParams();

  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }

  if (query && query.location) {
    params.set("location", query.location as string);
  }
  if (query && query.category) {
    params.set("category", query.category as string);
  }
  if (query && query.price) {
    params.set("price", query.price as string);
  }
  if (query && query.page) {
    params.set("page", query.page as string);
  }
  if (query && query.skip) {
    params.set("skip", query.skip as string);
  }
  if (query && query.sortBy) {
    params.set("sortBy", query.sortBy as string);
  }
  if (query && query.sortOrder) {
    params.set("sortOrder", query.sortOrder as string);
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties?${params.toString()}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 6,
        tags: ["properties"],
      },
    },
  );

  const result = await res.json();

  return result;
};
