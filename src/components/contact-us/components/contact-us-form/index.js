import React, { useState } from "react";
import { Formik } from "formik";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import Input from "../../../shared/form/input";
import Textarea from "../../../shared/form/textarea";
import cn from "classnames";
import { ContactUsSchema } from "../../../../validations/contact-us";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { currentEntity } from "../../../../helpers/entity-resolver";
import { sendLog } from "../../../../helpers/services/log-service";

const ContactUsForm = () => {
  const { t } = useTranslationWithVariables();
  const [isSentSuccessful, setIsSentSuccessful] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_OQTIMA_API_URL;
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleApiResponse = (isSuccessful) => {
    setIsSentSuccessful(isSuccessful);
    setTimeout(() => {
      setIsSentSuccessful(null);
    }, 3000);
  };

  const handleContactForm = async (values) => {
    const token = await executeRecaptcha("contact_us");
    axios
      .post(`${API_URL}mail`, {
        ...values,
        entity: currentEntity,
        token,
      })
      .then(() => {
        handleApiResponse(true);
      })
      .catch((error) => {
        sendLog({ message: error.message, type: error.name });
        handleApiResponse(false);
      });
  };

  return (
    <Formik
      initialValues={{ fullName: "", email: "", subject: "", message: "" }}
      validationSchema={ContactUsSchema}
      onSubmit={(values, { resetForm }) => {
        handleContactForm(values);
        resetForm();
      }}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit} className="contact-us-form">
          <Input
            type="text"
            name="fullName"
            title={t("contact-us_form_name")}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.fullName}
            isError={errors.fullName && touched.fullName}
            errorMessage={errors.fullName}
            isHalfWidth
          />
          <Input
            type="email"
            name="email"
            title={t("contact-us_form_email")}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            isError={errors.email && touched.email}
            errorMessage={errors.email}
            isHalfWidth
          />
          <Input
            type="text"
            name="subject"
            title={t("contact-us_form_subject")}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.subject}
            isError={errors.subject && touched.subject}
            errorMessage={errors.subject}
          />
          <Textarea
            type="text"
            name="message"
            title={t("contact-us_form_message")}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.message}
            isError={errors.message && touched.message}
            errorMessage={errors.message}
            placeholder={t("contact-us_form_placeholder")}
          />
          <button
            type="submit"
            className={cn(
              "button-link",
              "button-link--with-red-border",
              "contact-us-form__btn",
              {
                "button-link--disabled":
                  Object.values(errors).length > 0 ||
                  Object.values(touched).length === 0,
              }
            )}
          >
            {t("contact-us_form_btn")}
          </button>

          {isSentSuccessful !== null && (
            <p
              className={cn("contact-us-form__message", {
                "contact-us-form__message--failure": !isSentSuccessful,
              })}
            >
              {t(
                isSentSuccessful
                  ? "contact-us_form_success_message"
                  : "contact-us_form_failure_message"
              )}
            </p>
          )}
        </form>
      )}
    </Formik>
  );
};

export default ContactUsForm;
