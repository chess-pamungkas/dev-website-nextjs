import React, { useEffect, useState } from "react";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import Seo from "../../shared/seo";
import TopMarket from "../../top-market";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
const image = "/images/about-pages/contact-us.svg";
import ContactUs from "../../contact-us";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";

const ContactUsContent = () => {
  const { t } = useTranslationWithVariables();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
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
      {isClient && <GoogleReCaptcha onVerify={() => {}} />}
      <ContactUs />
    </>
  );
};

export default ContactUsContent;
