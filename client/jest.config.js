module.exports = {
  setupFiles: ["raf/polyfill", "<rootDir>/setupTests.js"],
  collectCoverageFrom: ["**/*.{ts,tsx}", "!**/index.tsx", "!**/constant*.ts"],
  coverageDirectory: "<rootDir>/coverage/",
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  moduleNameMapper: {
    "^.+\\.(css|scss|png)$": "identity-obj-proxy"
  },
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./coverage/html-report",
        filename: "test-report.html",
        expand: true
      }
    ]
  ]
};
