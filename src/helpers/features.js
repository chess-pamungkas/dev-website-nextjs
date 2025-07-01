const stages = {
  off: [],
  dev: ["local", "development"],
  test: ["local", "development", "staging"],
  prod: ["local", "development", "staging", "production"],
  deployed: ["development", "staging", "production"],
};

const features = {
  versionSentinel: "deployed",
};

const getEnv = () => {
  // Use an environment variable to set the current environment
  // If NODE_ENV is not set, default to "production"
  const env = process.env.NODE_ENV || "production";
  return env;
};

const hasFeature = (feature) => {
  const stage = features[feature];
  return stages[stage].includes(getEnv());
};

export { hasFeature, stages };
