/* istanbul ignore file */
import assert from 'assert';

function getEnvOrDefault(envName: string, defaultValue: string): string {
  return process.env[envName] ?? defaultValue;
}

function getEnvOrThrow(envName: string): string {
  const env = process.env[envName];
  assert(env, `Missing environment variable ${envName}`);
  return env;
}

export const TYPEORM_HOST = getEnvOrThrow('TYPEORM_HOST');
export const TYPEORM_USERNAME = getEnvOrThrow('TYPEORM_USERNAME');
export const TYPEORM_PASSWORD = getEnvOrThrow('TYPEORM_PASSWORD');
export const TYPEORM_DATABASE = getEnvOrThrow('TYPEORM_DATABASE');
export const TYPEORM_PORT = getEnvOrThrow('TYPEORM_PORT');
export const TYPEORM_ENTITIES = getEnvOrThrow('TYPEORM_ENTITIES');
export const TYPEORM_MIGRATIONS_DIR = getEnvOrThrow('TYPEORM_MIGRATIONS_DIR');

export const VIA_CEP_URL = getEnvOrThrow('VIA_CEP_URL');

export const NODE_ENV = getEnvOrThrow('NODE_ENV');
export const ENVIRONMENT = getEnvOrThrow('ENVIRONMENT');
export const APP_PORT = parseInt(getEnvOrThrow('APP_PORT'));
