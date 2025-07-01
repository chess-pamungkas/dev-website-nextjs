export function replaceTranslationVars(str, variables = {}) {
  if (!str || typeof str !== "string") return str;

  try {
    return str.replace(/{{\s*([\w-]+)\s*}}/g, (_, key) => variables[key] || "");
  } catch (error) {
    console.warn("Error replacing translation variables:", error);
    return str;
  }
}
