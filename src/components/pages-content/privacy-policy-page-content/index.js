import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import Seo from "../../shared/seo";
import PrivacyPolicyItem from "./privacy-policy-item";
import { getPrivacyPolicyContent } from "../../../helpers/privacy-policy.config";

const PrivacyPolicyContent = ({ className }) => {
  const policyContent = getPrivacyPolicyContent();

  return (
    <>
      <Seo title={"Privacy Policy"} />
      <section className={cn("privacy-policy", className)}>
        <div className="privacy-policy__wrapper">
          <h2 className="privacy-policy__title">{"Privacy Policy"}</h2>
          {policyContent.map((item, index) => (
            <PrivacyPolicyItem key={item.id || index} {...item} />
          ))}
        </div>
      </section>
    </>
  );
};

PrivacyPolicyContent.propTypes = {
  className: PropTypes.string,
};
export default PrivacyPolicyContent;
