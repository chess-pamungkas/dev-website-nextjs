import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import handleClient from "./handle-client";
import { currentEntity } from "../../helpers/entity-resolver";
import { sendLog } from "../../helpers/services/log-service";

const API_URL = process.env.NEXT_PUBLIC_OQTIMA_API_URL;
const ClientResolverContext = createContext({});

export const ClientResolverProvider = ({ children }) => {
  const [clientConfig, setClientConfig] = useState({});
  const [isPopupShown, setIsPopupShown] = useState(false);

  useEffect(() => {
    if (currentEntity) {
      // Use AbortController to prevent memory leaks
      const abortController = new AbortController();

      // Use requestIdleCallback for API call to reduce initial load impact
      const fetchClientConfig = async () => {
        try {
          const response = await axios.get(
            `${API_URL}client-detection?entity=${currentEntity}`,
            {
              signal: abortController.signal,
              timeout: 3000, // Reduced timeout to prevent long waits
            }
          );

          // Use requestIdleCallback to batch state updates
          if ("requestIdleCallback" in window) {
            requestIdleCallback(
              () => {
                setClientConfig(response.data);
              },
              { timeout: 100 }
            );
          } else {
            requestAnimationFrame(() => {
              setClientConfig(response.data);
            });
          }

          // Use requestIdleCallback for client handling
          if ("requestIdleCallback" in window) {
            requestIdleCallback(
              () => {
                handleClient(response.data, setIsPopupShown);
              },
              { timeout: 100 }
            );
          } else {
            requestAnimationFrame(() => {
              handleClient(response.data, setIsPopupShown);
            });
          }
        } catch (error) {
          // Handle different types of errors
          if (error.name === "AbortError") {
            // Request was aborted, ignore
            return;
          }

          if (
            error.code === "ECONNABORTED" ||
            error.message.includes("timeout")
          ) {
            console.warn(
              "[ClientResolver] Request timeout, using fallback config"
            );
            // Use fallback configuration
            setClientConfig({});
            return;
          }

          if (error.response) {
            // Server responded with error status
            console.warn(
              "[ClientResolver] Server error:",
              error.response.status
            );
            sendLog({
              message: `Server error: ${error.response.status}`,
              type: "ClientResolverError",
            });
          } else if (error.request) {
            // Network error
            console.warn(
              "[ClientResolver] Network error, using fallback config"
            );
            sendLog({
              message: "Network error in client detection",
              type: "NetworkError",
            });
          } else {
            // Other error
            console.warn("[ClientResolver] Error:", error.message);
            sendLog({
              message: error.message,
              type: error.name,
            });
          }

          // Set empty config as fallback
          setClientConfig({});
        }
      };

      // Defer API call to reduce initial load impact
      if ("requestIdleCallback" in window) {
        requestIdleCallback(fetchClientConfig, { timeout: 500 });
      } else {
        setTimeout(fetchClientConfig, 100);
      }

      return () => {
        abortController.abort();
      };
    }
  }, [currentEntity]);

  return (
    <ClientResolverContext.Provider
      value={{
        clientConfig,
        isPopupShown,
        setIsPopupShown,
      }}
    >
      {children}
    </ClientResolverContext.Provider>
  );
};

ClientResolverProvider.propTypes = {
  children: PropTypes.node.isRequired, // children prop is required and must be a node
};
export default ClientResolverContext;
