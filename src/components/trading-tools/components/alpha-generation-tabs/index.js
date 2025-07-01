import React from "react";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import {
  AlphaGeneration1,
  AlphaGeneration2,
  AlphaGeneration3,
} from "../../../shared/icons";
import Tabs from "../../../shared/tabs";
import alpha1 from "../../../../assets/images/trading-tools/alpha1.png";
import alpha21 from "../../../../assets/images/trading-tools/alpha2_1.png";
import alpha22 from "../../../../assets/images/trading-tools/alpha2_2.png";
import alpha3 from "../../../../assets/images/trading-tools/alpha3.png";
import TradingToolsTabContent from "../trading-tools-tab-content";

const AlphaGenerationTabs = () => {
  const { t } = useTranslationWithVariables();

  const tabs = [
    {
      id: 1,
      title: t("trading-tools_alpha-generation_tabs_title1"),
      isTitleWithIcon: true,
      icon: <AlphaGeneration1 className="trading-tools-tabs__icon" />,
      content: (
        <TradingToolsTabContent
          darkBG
          img1={alpha1}
          title={t("trading-tools_alpha-generation_tabs_content1_title")}
        >
          <p>{t("trading-tools_alpha-generation_tabs_content1_text")}</p>
        </TradingToolsTabContent>
      ),
    },
    {
      id: 2,
      title: t("trading-tools_alpha-generation_tabs_title2"),
      isTitleWithIcon: true,
      icon: <AlphaGeneration2 className="trading-tools-tabs__icon" />,
      content: (
        <TradingToolsTabContent
          darkBG
          img1={alpha21}
          img2={alpha22}
          title={t("trading-tools_alpha-generation_tabs_content2_title")}
        >
          <p>{t("trading-tools_alpha-generation_tabs_content2_text1")}</p>
          <p>
            <span className="bold">
              {t("trading-tools_alpha-generation_tabs_content2_text2-bold")}
              &nbsp;
            </span>
            <span>
              {t("trading-tools_alpha-generation_tabs_content2_text2")}
            </span>
          </p>
          <p>
            <span className="bold">
              {t("trading-tools_alpha-generation_tabs_content2_text3-bold")}
              &nbsp;
            </span>
            <span>
              {t("trading-tools_alpha-generation_tabs_content2_text3")}
            </span>
          </p>
        </TradingToolsTabContent>
      ),
    },
    {
      id: 3,
      title: t("trading-tools_alpha-generation_tabs_title3"),
      isTitleWithIcon: true,
      icon: <AlphaGeneration3 className="trading-tools-tabs__icon" />,
      content: (
        <TradingToolsTabContent
          darkBG
          img1={alpha3}
          title={t("trading-tools_alpha-generation_tabs_content3_title")}
        >
          <p>{t("trading-tools_alpha-generation_tabs_content3_text1")}</p>
          <p>
            <span className="display-block">
              {t("trading-tools_alpha-generation_tabs_content3_text2")}
            </span>
            <span className="display-block">
              {t("trading-tools_alpha-generation_tabs_content3_text3")}
            </span>
            <span className="display-block">
              {t("trading-tools_alpha-generation_tabs_content3_text4")}
            </span>
            <span className="display-block">
              {t("trading-tools_alpha-generation_tabs_content3_text5")}
            </span>
          </p>
        </TradingToolsTabContent>
      ),
    },
  ];

  return <Tabs tabList={tabs} classname="trading-tools-tabs" />;
};

export default AlphaGenerationTabs;
