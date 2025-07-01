import promoOption1 from "../assets/images/swap-free/promoOption1.png";
import promoOption2 from "../assets/images/swap-free/promoOption2.png";
import sfAdv1 from "../assets/images/swap-free/sfAdv1.svg";
import sfAdv2 from "../assets/images/swap-free/sfAdv2.svg";
import sfAdv3 from "../assets/images/swap-free/sfAdv3.svg";
import sfAdv4 from "../assets/images/swap-free/sfAdv4.svg";
import { COMPANY_PAGE_LINK } from "./constants";

export const SWAP_FREE_PROMO_LIST = [
  {
    text: "swap-free_promotion-text1",
  },
  {
    text: "swap-free_promotion-text2",
  },
  {
    text: "swap-free_promotion-text3",
  },
  {
    text: "swap-free_promotion-text4",
  },
];

export const SWAP_FREE_PROMO_OPTIONS = [
  {
    title: "swap-free_center-promotion-card1-title",
    titleAccent: "swap-free_center-promotion-card1-title-accent",
    text: "swap-free_center-promotion-card1-text",
    img: promoOption1,
    btnTitle: "swap-free_center-promotion-card1-btn",
  },
  {
    title: "swap-free_center-promotion-card2-title",
    titleAccent: "swap-free_center-promotion-card2-title-accent",
    text: "swap-free_center-promotion-card2-text",
    img: promoOption2,
    btnTitle: "swap-free_center-promotion-card2-btn",
  },
];

export const SWAP_FREE_ADVANTAGES = [
  {
    title: "swap-free_advantages-adv1",
    titleAccent: "swap-free_advantages-adv1-accent",
    img: sfAdv1,
  },
  {
    title: "swap-free_advantages-adv2",
    titleAccent: "swap-free_advantages-adv2-accent",
    img: sfAdv2,
  },
  {
    title: "swap-free_advantages-adv3",
    titleAccent: "swap-free_advantages-adv3-accent",
    img: sfAdv3,
  },
  {
    img: sfAdv4,
    titleObject: {
      p1: "swap-free_advantages-adv4-p1",
      p2: "swap-free_advantages-adv4-p2",
      linkText: "swap-free_advantages-adv4-link",
      link: COMPANY_PAGE_LINK,
    },
  },
];
