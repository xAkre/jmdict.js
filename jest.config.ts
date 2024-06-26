import type { Config } from 'jest';

const config: Config = {
    rootDir: './src',
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
    },
    testMatch: ['**/__tests__/**/*.test.ts']
};

export default config;
