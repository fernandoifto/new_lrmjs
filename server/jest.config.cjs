/** @type {import("jest").Config} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/tests"],
    testMatch: ["**/*.test.ts"],
    moduleFileExtensions: ["ts", "js", "json"],
    clearMocks: true,
    resetMocks: true,
    setupFiles: ["<rootDir>/tests/jest-env-setup.ts"],
};
