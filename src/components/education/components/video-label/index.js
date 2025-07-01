import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";

const VideoLabel = ({ className, label }) => {
  const { t } = useTranslationWithVariables();
  return <span className={cn("video-label", className)}>{t(label)}</span>;
};

VideoLabel.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
};
export default VideoLabel;
