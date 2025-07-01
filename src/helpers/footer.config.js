import React from "react";
import { LEGAL_PAGE_LINK } from "./constants";

const FOOTER_TEXT_FSA = "footer-text-fsa";

export const getFooterText = () => FOOTER_TEXT_FSA;

const FOOTER_COPYRIGHT_FSA = {
  p1: "footer-copyright-paragraph1-fsa",
  p1_2: "footer-copyright-paragraph1_2-fsa",
  p1_3: "footer-copyright-paragraph1_3-fsa",
  p2: "footer-copyright-paragraph2-fsa",
  p3_1: "footer-copyright-paragraph3-part1-fsa",
  p3_2: "footer-copyright-paragraph3-part2-fsa",
  p4: "footer-copyright-paragraph4-fsa",
  p3_a1: "footer-copyright-paragraph3-link-fsa",
  p3_link1: LEGAL_PAGE_LINK,
  p5: "footer-copyright-paragraph5-fsa",
};

const FOOTER_COMPANY = { p1: "footer-company-name-text" };

export const FOOTER_FOR_FUNDING = {
  p1: "footer-funding-1",
  p2: "footer-funding-2",
};

export const getFooterCopyright = (t) => {
  return (
    <>
      <p>{t(FOOTER_COPYRIGHT_FSA.p1)}</p>
      <p>{t(FOOTER_COPYRIGHT_FSA.p1_2)}</p>
      <p>{t(FOOTER_COPYRIGHT_FSA.p1_3)}</p>
      <p>{t(FOOTER_COPYRIGHT_FSA.p2)}</p>
      <p>
        {t(FOOTER_COPYRIGHT_FSA.p3_1)}&nbsp;
        <a
          href={FOOTER_COPYRIGHT_FSA.p3_link1}
          target="_blank"
          rel="noreferrer"
        >
          {t(FOOTER_COPYRIGHT_FSA.p3_a1)}
        </a>
        &nbsp;
        {t(FOOTER_COPYRIGHT_FSA.p3_2)}
      </p>
      <p>{t(FOOTER_COPYRIGHT_FSA.p4)}</p>
      <p>{t(FOOTER_COPYRIGHT_FSA.p5)}</p>
    </>
  );
};

export const getFooterCompanyName = (t) => {
  return <p>{t(FOOTER_COMPANY.p1)}</p>;
};
