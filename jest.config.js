module.exports = {
    // The root of your project directory
    roots: ["<rootDir>"],
    
    // The file extensions to look for
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    
    // Define the test environment
    testEnvironment: "node",
    
    // Use ts-jest for TypeScript
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
    
    // Define the test match pattern, e.g., all files ending with .test.ts
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
    
    // Other options, plugins, and configurations as needed
  };
  