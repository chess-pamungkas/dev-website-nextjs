import * as yup from "yup";
import { emailRegex, textRegex } from "./regex";

export const ContactUsSchema = yup.object().shape({
  first_name: yup
    .string()
    .matches(textRegex, "contact-us-name-invalid")
    .required("contact-us-firstName-required")
    .trim(),
  last_name: yup
    .string()
    .matches(textRegex, "contact-us-name-invalid")
    .required("contact-us-lastName-required")
    .trim(),
  email: yup
    .string()
    .matches(emailRegex, "contact-us-email-invalid")
    .required("contact-us-email-required"),
  message: yup
    .string()
    .min(10, "contact-us-message-too-short")
    .required("contact-us-message-required"),
});
