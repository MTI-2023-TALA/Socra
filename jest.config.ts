import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  coverageDirectory: './coverage',
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
};

export default config;
