const EXCLUDE_INDICES = ["USIDX", "NETH25"];
const EXCLUDE_FOREX = [
  "AUDNZD",
  "AUDCAD",
  "AUDCHF",
  "AUDCNH",
  "AUDSGD",
  "AUDZAR",
  "CADCHF",
  "CADJPY",
  "CHFJPY",
  "EURAUD",
  "EURCAD",
  "EURCHF",
  "EURNZD",
  "GBPAUD",
  "GBPCHF",
  "USDSGD",
];
const EXCLUDE_CRYPTO = ["MATUSD"];
const EXCLUDE_DEFAULT = [];

export const filterSymbols = (symbols, section) => {
  let toExclude = [];
  switch (section) {
    case "indices":
      toExclude = EXCLUDE_INDICES;
      break;
    case "forex":
      toExclude = EXCLUDE_FOREX;
      break;
    case "crypto":
      toExclude = EXCLUDE_CRYPTO;
      break;
    default:
      toExclude = EXCLUDE_DEFAULT;
      break;
  }

  return symbols.filter((symbol) => !toExclude.includes(symbol.symbol));
};
