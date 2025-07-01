import axios from "axios";
import { currentEntity } from "../entity-resolver";
import { sendLog } from "./log-service";

const API_URL = process.env.NEXT_PUBLIC_OQTIMA_API_URL;

export const postClientConsent = (ipAddress, consentString) => {
  const data = {
    gaId: null, // we removed GA after we started use GTM
    ipAddress,
    entity: currentEntity,
    consentType: consentString,
  };
  axios
    .post(`${API_URL}client-consent`, data)
    .catch((error) => sendLog({ message: error.message, type: error.name }));
};
