import React, { useContext } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import LanguageContext from "../../../context/language-context";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";
import { DIR_LTR, DIR_RTL } from "../../../helpers/constants";

const noIndex = Boolean(Number(process.env.NEXT_PUBLIC_NOINDEX));
const microsoftAds = process.env.NEXT_PUBLIC_MICROSOFT_ADS;

const Seo = ({ title, description, fsaTitle, fsaDescription, fsaRobots }) => {
  const { selectedLanguage } = useContext(LanguageContext);
  const isRTL = useRtlDirection();

  return (
    <Head>
      <title>{title || fsaTitle}</title>
      <meta name="description" content={description || fsaDescription} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <meta name="robots" content={noIndex ? "noindex" : fsaRobots} />
      {microsoftAds && <meta name="msvalidate.01" content={microsoftAds} />}
    </Head>
  );
};

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  fsaTitle: PropTypes.string,
  fsaDescription: PropTypes.string,
  fsaRobots: PropTypes.string,
};

export default Seo;
