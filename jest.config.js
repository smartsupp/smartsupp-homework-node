// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {

	// The test environment that will be used for testing
	testEnvironment: "node",

	// An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
	testPathIgnorePatterns: [
		"/node_modules/",
	],

	// A map from regular expressions to paths to transformers
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},

	// A map from regular expressions to module names
	moduleNameMapper: {
		"@src/(.*)": "<rootDir>/src/$1",
	},

	// A list of reporter names that Jest uses when writing coverage reports.
	coverageReporters: [
		"text"
	],

	// An array of regexp pattern strings that are matched against all file paths before executing the test
	coveragePathIgnorePatterns: [
		"<rootDir>/test",
	]

};
