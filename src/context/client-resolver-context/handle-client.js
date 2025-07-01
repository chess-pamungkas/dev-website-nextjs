const handleClient = (clientConfig, setIsPopupShown) => {
  if (clientConfig?.banned || clientConfig?.recommendedRedirect) {
    setIsPopupShown(true);
  }
};

export default handleClient;
