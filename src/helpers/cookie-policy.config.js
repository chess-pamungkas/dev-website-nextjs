import React from "react";

export const COOKIES_POLICY_CONTENT = [
  // FYI: There is no need to translate this text into other languages, so we don't need to store it in locales.
  {
    title: "INTRODUCTION",
    subItems: [
      {
        text: 'Oqtima Int. Ltd (operating under the tradename "Oqtima" and being referred to as "we" or "us" or the "Company") is authorised and regulated by the Seychelles Financial Services Authority (the "FSA") with license number SD109, having its registered address at F20, 1st Floor, Eden Plaza, Eden Island, Seychelles.',
      },
    ],
  },
  {
    title: "Oqtima uses cookies to:",
    subItems: [
      {
        text: "• Optimize your trading experience, including remembering your preferences, location, preferred language, browser and other details;",
      },
      {
        text: "• Authenticate your identity for security purposes;",
      },
      {
        text: "• Adjust our platform according to your trading habits and our regulatory requirements.",
      },
      {
        text: "• Analyze and track the use of our services;",
      },
      {
        text: "• Maintain our website and certain functions available on it;",
      },
    ],
  },
  {
    title: "What are cookies?",
    subItems: [
      {
        text: "Cookies are small text files of data that are sent to your computer by a website and stored on your computer. They allow websites to recognize visitors when they return and include basic information about them that is checked and updated every time you visit the website. Cookies are non-executable and cannot be used to install malware.",
      },
    ],
  },
  {
    title: "Managing your cookies",
    subItems: [
      {
        text: "At Oqtima, we respect your right to privacy and we provide you with tools to manage the cookies you receive from our website services.",
      },
      {
        text: "Some cookies are essential to the performance of our platform, you cannot opt out from these cookies if you wish to use our platform. Below you will find a list of some of the third-party cookies used by Oqtima.",
      },
      {
        text: "Your browser may also allow you to block the storage of cookies on your computer. Please be aware that if you use our web services without blocking cookies you are actually consenting to the cookies. We don't collect any information about you through our cookies that could identify you as an individual. While we do collect certain pieces of information about you in order to provide our products and services to you and improve our offering, this information is anonymised. Please be aware that if you choose not to accept cookies, you may not be able to take full advantage of our website.",
      },
    ],
  },
];

export const COLUMN_COOKIES = [
  {
    accessorKey: "col1",
    header: "Company",
  },
  {
    accessorKey: "col2",
    header: "Cookies",
  },
  {
    accessorKey: "col3",
    header: "Opt Out option",
  },
];
export const DATA_COOKIES = [
  {
    col1: "OQtima",
    col2: "used to store user consent settings for cookies.",
    col3: "Essential",
  },
  {
    col1: "OQtima",
    col2: "used to determine if a cookie popup or any other popup should be shown to the user",
    col3: "Essential",
  },
  {
    col1: "OQtima",
    col2: "used to store the last selected language",
    col3: "Essential",
  },
  {
    col1: "Nextroll",
    col2: "Used to re-target user based on interests on website",
    col3: "Segmentation (opt out option)",
  },
  {
    col1: "Alphabet",
    col2: "Used to store the Google Analytics ID for the user.",
    col3: "Segmentation (opt out option)",
  },
  {
    col1: "Meta",
    col2: "Used to store the Meta client ID to re-target client on Meta owned platform and partner sites",
    col3: "Segmentation (opt out option)",
  },
];
