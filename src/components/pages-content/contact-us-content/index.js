import React from "react";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import Seo from "../../shared/seo";
import TopMarket from "../../top-market";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import image from "../../../assets/images/about-pages/contact-us.svg";
import ContactUs from "../../contact-us";
import ReCaptchaProvider from "../../shared/recaptcha-provider";

const ContactUsContent = () => {
  const { t } = useTranslationWithVariables();

  return (
    <ReCaptchaProvider showBadge={true}>
      <Seo title={t("page-contact-title")} />
      <TopMarket
        title={
          <HighlightedLocalizationText
            localizationText="contact-us_top-market-title"
            wordsToHighlight="contact-us_top-market-title-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-white"
          />
        }
        image={image}
      >
        <HighlightedLocalizationText
          localizationText="contact-us_top-market-promo-text"
          wordsToHighlight="contact-us-top-market-promo-text-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarket>
      <ContactUs />
    </ReCaptchaProvider>
  );
};

export default ContactUsContent;
