const stages = {
  off: [],
  dev: ["local", "development"],
  test: ["local", "development", "staging"],
  prod: ["local", "development", "staging", "production"],
  deployed: ["development", "staging", "production"],
};

export { stages };
