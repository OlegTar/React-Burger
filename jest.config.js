export const roots = ['<rootDir>/src'];
export const testMatch = [
	'**/__tests__/**/*.+(ts|tsx|js)',
	'**/*.test.(ts|tsx|js)',
];
export const transform = {
	'^.+.(ts|tsx)$': 'ts-jest',
};
