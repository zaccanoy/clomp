module.exports = {
  roots: ["src"],
  testMatch: ["**/?(*.)+(spec).+(js)"],
  moduleDirectories: ["node_modules", "../../node_modules"],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "https://localhost/",
  },
};
