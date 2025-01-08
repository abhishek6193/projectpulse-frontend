// Helper function to get user initials
export const getUserInitials = (name) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return initials;
};

// Hash function to generate a color from a string
export const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};
