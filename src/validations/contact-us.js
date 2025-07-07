import { object, string } from "yup";
import { emailRegex, textRegex } from "./regex";

export const ContactUsSchema = object().shape({
  fullName: string()
    .required("contact-us_form_error_message_required")
    .matches(textRegex, { message: "contact-us_form_error_message_invalid" })
    .trim(),
  email: string()
    .required("contact-us_form_error_message_required")
    .matches(emailRegex, {
      message: "contact-us_form_error_message_invalid",
    })
    .trim(),
  subject: string().required("contact-us_form_error_message_required").trim(),
  message: string().required("contact-us_form_error_message_required").trim(),
});
