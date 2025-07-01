import { useTranslation } from "react-i18next";
import Seo from "../../shared/seo";
import MainPromotion from "../../main-promotion";
import TradingTicker from "../../trading-ticker";
import PerformanceContent from "../main-page-content/performance-content";
import PromotionContent from "../main-page-content/promotion-content";

const MainHomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        title={t("page-main-title")}
        description={t("page-main-description")}
      />
      {/*isShowHero is workaround to hide hero image (e.g. Buffon)  */}
      <MainPromotion isShowHero />
      <TradingTicker />
      <PromotionContent />
      <PerformanceContent />
    </>
  );
};

export default MainHomePage;
