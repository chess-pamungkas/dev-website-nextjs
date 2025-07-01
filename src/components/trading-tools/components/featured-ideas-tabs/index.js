import React from "react";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import {
  FeaturedIdeas1,
  FeaturedIdeas2,
  FeaturedIdeas3,
} from "../../../shared/icons";
import Tabs from "../../../shared/tabs";
import idea1 from "../../../../assets/images/trading-tools/idea1.png";
import idea2 from "../../../../assets/images/trading-tools/idea2.png";
import idea3 from "../../../../assets/images/trading-tools/idea3.png";
import TradingToolsTabContent from "../trading-tools-tab-content";

const FeaturedIdeasTabs = () => {
  const { t } = useTranslationWithVariables();

  const tabs = [
    {
      id: 1,
      title: t("trading-tools_featured-ideas_tabs_title1"),
      isTitleWithIcon: true,
      icon: <FeaturedIdeas1 className="trading-tools-tabs__icon" />,
      content: (
        <TradingToolsTabContent
          img1={idea1}
          title={t("trading-tools_featured-ideas_tabs_content1_title")}
          className="trading-tools-tab-content--black"
        >
          <p>{t("trading-tools_featured-ideas_tabs_content1_text")}</p>
        </TradingToolsTabContent>
      ),
    },
    {
      id: 2,
      title: t("trading-tools_featured-ideas_tabs_title2"),
      isTitleWithIcon: true,
      icon: <FeaturedIdeas2 className="trading-tools-tabs__icon" />,
      content: (
        <TradingToolsTabContent
          img1={idea2}
          title={t("trading-tools_featured-ideas_tabs_content2_title")}
          className="trading-tools-tab-content--black"
        >
          <p>{t("trading-tools_featured-ideas_tabs_content2_text")}</p>
        </TradingToolsTabContent>
      ),
    },
    {
      id: 3,
      title: t("trading-tools_featured-ideas_tabs_title3"),
      isTitleWithIcon: true,
      icon: <FeaturedIdeas3 className="trading-tools-tabs__icon" />,
      content: (
        <TradingToolsTabContent
          img1={idea3}
          title={t("trading-tools_featured-ideas_tabs_content3_title")}
          className="trading-tools-tab-content--black"
        >
          <p>{t("trading-tools_featured-ideas_tabs_content3_text")}</p>
        </TradingToolsTabContent>
      ),
    },
  ];

  return <Tabs tabList={tabs} classname="trading-tools-tabs" />;
};

export default FeaturedIdeasTabs;
