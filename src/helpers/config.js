import {
  AdvantageIcon1,
  AdvantageIcon2,
  AdvantageIcon3,
  AdvantageIcon4,
  AdvantageIcon5,
  AdvantageIcon6,
  AdvantageIcon7,
  QualityAdvantageIcon,
  SafetyAdvantageIcon,
  TrustAdvantageIcon,
} from "../components/shared/icons";

export const ADVANTAGES = [
  {
    icon: AdvantageIcon1,
    text: "index_performance-advantage1",
    accent: "performance-advantage1-accent",
    subtext: "index_performance-advantage1-subtext",
  },
  {
    icon: AdvantageIcon2,
    text: "index_performance-advantage2-fsa",
    accent: "performance-advantage2-accent-fsa",
    subtext: "index_performance-advantage2-subtext",
  },
  {
    icon: AdvantageIcon3,
    text: "index_performance-advantage3-fsa",
    accent: "performance-advantage3-accent-fsa",
    subtext: "index_performance-advantage3-subtext",
  },
  {
    icon: AdvantageIcon4,
    text: "index_performance-advantage4",
    accent: "performance-advantage4-accent",
    subtext: "index_performance-advantage4-subtext",
  },
  {
    icon: AdvantageIcon5,
    text: "index_performance-advantage5-fsa",
    accent: "performance-advantage5-accent-fsa",
    subtext: "index_performance-advantage5-subtext",
  },
  {
    icon: AdvantageIcon6,
    text: "index_performance-advantage6-fsa",
    accent: "performance-advantage6-accent-fsa",
    subtext: "index_performance-advantage6-subtext",
  },
  {
    icon: AdvantageIcon7,
    text: "index_performance-advantage7",
    accent: "performance-advantage7-accent",
    subtext: "index_performance-advantage7-subtext",
  },
];

export const FSA_ADVANTAGES = [
  {
    icon: AdvantageIcon1,
    text: "index_performance-advantage1",
    accent: "performance-advantage1-accent",
  },
  {
    icon: AdvantageIcon2,
    text: "index_performance-advantage2-fsa",
    accent: "performance-advantage2-accent-fsa",
  },
  {
    icon: AdvantageIcon3,
    text: "index_performance-advantage3",
    accent: "performance-advantage3-accent",
  },
  {
    icon: AdvantageIcon5,
    text: "index_performance-advantage5-fsa",
    accent: "performance-advantage5-accent-fsa",
  },
  {
    icon: AdvantageIcon6,
    text: "index_performance-advantage6-fsa",
    accent: "performance-advantage6-accent-fsa",
  },
  {
    icon: AdvantageIcon7,
    text: "index_performance-advantage7",
    accent: "performance-advantage7-accent",
  },
];

export const MT4_PLATFORMS = {
  ios: {
    icon: "/images/icons/tools/ios_black.svg",
    title: "index_trading-tools-platforms-ios",
  },
  android: {
    icon: "/images/icons/tools/android.svg",
    title: "index_trading-tools-platforms-android",
  },
  windows: {
    icon: "/images/icons/tools/windows.svg",
    title: "index_trading-tools-platforms-windows",
  },
};

export const MOBILE_PLATFORMS = {
  ios: {
    icon: "/images/icons/tools/ios_black.svg",
    title: "index_trading-tools-platforms-ios",
  },
  android: {
    icon: "/images/icons/tools/android.svg",
    title: "index_trading-tools-platforms-android",
  },
};

const FSA_PLATFORMS = {
  webTrader: {
    icon: "/images/icons/tools/webTrader.svg",
    title: "index_trading-tools-platforms-webtrader",
  },
  ios: MOBILE_PLATFORMS.ios,
  android: MOBILE_PLATFORMS.android,
  metaTrader4: {
    icon: "/images/icons/tools/metaTrader4.svg",
    title: "index_trading-tools-platforms-metatrader4",
  },
  metaTrader5: {
    icon: "/images/icons/tools/metaTrader5.svg",
    title: "index_trading-tools-platforms-metatrader5",
  },
};

export const getPlatforms = () => FSA_PLATFORMS;

export const ADDITIONAL_PLATFORMS = {
  windows: {
    icon: "/images/icons/tools/windows.svg",
    title: "index_trading-tools-platforms-windows",
  },
};

export const COMPANY_ADVANTAGES = [
  {
    title: "company_company-advantages-title1",
    icon: SafetyAdvantageIcon,
    textArray: [
      "company_company-advantages-text1-1",
      "company_company-advantages-text1-2-fsa",
      "company_company-advantages-text1-3",
      "company_company-advantages-text1-4",
    ],
  },
  {
    title: "company_company-advantages-title2",
    icon: QualityAdvantageIcon,
    textArray: ["company_company-advantages-text2"],
  },
  {
    title: "company_company-advantages-title3",
    icon: TrustAdvantageIcon,
    textArray: ["company_company-advantages-text3"],
  },
];

export const CRYPTO_TRADING_SECTION = {
  id: "crypto",
  title: "index_trading-ticker-section-crypto",
};
export const FOREX_TRADING_SECTION = {
  id: "forex",
  title: "index_trading-ticker-section-forex",
};
export const SHARES_TRADING_SECTION = {
  id: "shares",
  title: "index_trading-ticker-section-shares",
};
export const ENERGIES_TRADING_SECTION = {
  id: "energies",
  title: "index_trading-ticker-section-energies",
};
export const METALS_TRADING_SECTION = {
  id: "metals",
  title: "index_trading-ticker-section-metals",
};
export const INDICES_TRADING_SECTION = {
  id: "indices",
  title: "index_trading-ticker-section-indices",
};
export const ETF_TRADING_SECTION = {
  id: "etf",
  title: "index_trading-ticker-section-etf",
};

const FSA_TRADING_SECTIONS = [
  CRYPTO_TRADING_SECTION,
  FOREX_TRADING_SECTION,
  SHARES_TRADING_SECTION,
  ENERGIES_TRADING_SECTION,
  METALS_TRADING_SECTION,
  INDICES_TRADING_SECTION,
  ETF_TRADING_SECTION,
];

export const getTradingSections = () => FSA_TRADING_SECTIONS;
