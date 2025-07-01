export const getUrlParamValue = (paramName) => {
  if (typeof URLSearchParams === "function") {
    return new URLSearchParams(window.location.search).get(paramName);
  }
};
