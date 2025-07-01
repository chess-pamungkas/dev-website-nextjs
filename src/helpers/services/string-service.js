export const stringTransformToKebabCase = (str) => {
  return str.replace(/\s+/g, "-").toLowerCase();
};
