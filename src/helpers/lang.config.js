const LANG_CONFIG = [
  // English
  {
    id: "en",
    icon: "EnFlagIcon",
    name: "English (UK)",
    isDefault: true,
    URIPart: "",
  },
  // French
  {
    id: "fr",
    icon: "FrFlagIcon",
    name: "Français",
    URIPart: "/fr",
  },
  // Brazilian
  {
    id: "br",
    icon: "BrFlagIcon",
    name: "Português",
    URIPart: "/br",
  },
  // Vietnamese
  {
    id: "vn",
    icon: "VnFlagIcon",
    name: "Tiếng Việt",
    URIPart: "/vn",
  },
  // Thai
  {
    id: "th",
    icon: "ThFlagIcon",
    name: "ภาษาไทย",
    URIPart: "/th",
  },
  // Spanish
  {
    id: "es",
    icon: "EsFlagIcon",
    name: "Español",
    URIPart: "/es",
  },
  // Italian
  {
    id: "it",
    icon: "ItFlagIcon",
    name: "Italiano",
    URIPart: "/it",
  },
  // Chinese
  {
    id: "cn",
    icon: "CnFlagIcon",
    name: "简体中文",
    URIPart: "/cn",
  },
  // Taiwan
  {
    id: "zh",
    icon: "CnFlagIcon",
    name: "繁體中文",
    URIPart: "/zh",
  },
  // Indonesian
  {
    id: "id",
    icon: "IdFlagIcon",
    name: "Bahasa Indonesia",
    URIPart: "/id",
  },
  // Japanese
  {
    id: "jp",
    icon: "JpFlagIcon",
    name: "日本語",
    URIPart: "/jp",
  },
  // Malay (Malaysia)
  {
    id: "my",
    icon: "MyFlagIcon",
    name: "Bahasa Malaysia",
    URIPart: "/my",
  },
  // Arabic
  {
    id: "ar",
    icon: "ArFlagIcon",
    name: "عربي",
    URIPart: "/ar",
  },
];

const ARABIC_LANG_ID = "ar";

module.exports = {
  LANG_CONFIG,
  ARABIC_LANG_ID,
  uniqueList: LANG_CONFIG.map(({ id }) => id),
  list: LANG_CONFIG.map(({ id }) => id),
  defaultLangKey: LANG_CONFIG.find(({ isDefault }) => isDefault).id,
};
