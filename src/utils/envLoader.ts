import * as fs from 'fs';
import * as path from 'path';

export interface EnvConfig {
  baseUrl: string;
  apiUrl: string;
  username?: string;
  password?: string;
  apiKey?: string;
  useStorageState: boolean;
  timeout: number;
  headless: boolean;
}

/**
 * Load environment configuration from env files
 */
export function loadEnvConfig(env: string = 'dev'): EnvConfig {
  const envFilePath = path.join(__dirname, '../../env', `.env.${env}`);
  
  // Default configuration
  const defaultConfig: EnvConfig = {
    baseUrl: 'https://example.com',
    apiUrl: 'https://api.example.com',
    useStorageState: false,
    timeout: 30000,
    headless: true,
  };
  
  // Try to load environment-specific config
  if (fs.existsSync(envFilePath)) {
    const envFile = fs.readFileSync(envFilePath, 'utf-8');
    const envVars: Record<string, string> = {};
    
    envFile.split('\n').forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
        }
      }
    });
    
    return {
      baseUrl: envVars.BASE_URL || process.env.BASE_URL || defaultConfig.baseUrl,
      apiUrl: envVars.API_URL || process.env.API_URL || defaultConfig.apiUrl,
      username: envVars.USERNAME || process.env.USERNAME,
      password: envVars.PASSWORD || process.env.PASSWORD,
      apiKey: envVars.API_KEY || process.env.API_KEY,
      useStorageState: envVars.USE_STORAGE_STATE === 'true' || defaultConfig.useStorageState,
      timeout: parseInt(envVars.TIMEOUT || String(defaultConfig.timeout)),
      headless: envVars.HEADLESS !== 'false',
    };
  }
  
  // Fallback to process.env or defaults
  return {
    baseUrl: process.env.BASE_URL || defaultConfig.baseUrl,
    apiUrl: process.env.API_URL || defaultConfig.apiUrl,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    apiKey: process.env.API_KEY,
    useStorageState: defaultConfig.useStorageState,
    timeout: defaultConfig.timeout,
    headless: defaultConfig.headless,
  };
}

/**
 * Get current environment
 */
export function getCurrentEnv(): string {
  return process.env.ENV || 'dev';
}
