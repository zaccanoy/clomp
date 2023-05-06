module.exports = {
  roots: ["src"],
  testMatch: ["**/?(*.)+(spec).+(js)"],
  setupFilesAfterEnv: ["./jest.setup.js"],
  moduleDirectories: ["node_modules", "../../node_modules"],
};
