module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

// import type { Config } from "jest";

// const config: Config = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   moduleFileExtensions: ["ts", "js", "json", "node"],
//   testMatch: ["**/?(*.)+(spec|test).ts"],
//   transform: {
//     "^.+\\.ts$": "ts-jest",
//   },
// };

// export default config;
