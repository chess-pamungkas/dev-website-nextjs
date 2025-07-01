import * as yup from "yup";
import { emailRegex, textRegex } from "./regex";

export const PopupRegistrationSchema = yup.object().shape({
  first_name: yup
    .string()
    .matches(textRegex, "popup-registration-name-invalid")
    .required("popup-registration-firstName-required")
    .trim(),
  last_name: yup
    .string()
    .matches(textRegex, "popup-registration-name-invalid")
    .required("popup-registration-lastName-required")
    .trim(),
  email: yup
    .string()
    .matches(emailRegex, "popup-registration-email-invalid")
    .required("popup-registration-email-required"),
  country: yup
    .string()
    .required("popup-registration-countryOfResidence-required"),
  country_code: yup
    .string()
    .required("popup-registration-countryCode-required"),
  mobile: yup
    .string()
    .matches(/^\d+$/, "popup-registration-phoneNumber-numbers-only")
    .min(7, "popup-registration-phoneNumber-invalid")
    .required("popup-registration-phoneNumber-required"),
  agreement: yup
    .boolean()
    .oneOf([true], "popup-registration-agreement-required")
    .required("popup-registration-agreement-required"),
});
