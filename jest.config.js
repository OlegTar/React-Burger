export const roots = ["<rootDir>/src"];
export const testMatch = [
  "**/__tests__/**/*.(test|spec).(ts|tsx|js)",
  "**/*.test.(ts|tsx|js)",
];
export const transform = {
  "^.+.(ts|tsx)$": "ts-jest",
};
