export const getNameInitials = (name: string) => {
  const userNameInitials =
    name
      .toUpperCase()
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("") || "";

  return userNameInitials;
};
