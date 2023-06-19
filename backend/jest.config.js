module.exports = {
	collectCoverageFrom: ["!src/**/*.d.ts", "src/**/*.{ts,tsx,js,jsx}"],
	coverageDirectory: "coverage",
	globals: {
		"ts-jest": {
			tsConfigFile: "tsconfig.json",
		},
	},
	moduleFileExtensions: ["js", "json", "jsx", "node", "ts", "tsx"],
	testEnvironment: "node",
	testMatch: ["**/__tests__/**/(*.)(spec|test).ts?(x)"],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
};
