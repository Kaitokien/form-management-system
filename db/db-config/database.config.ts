import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export function getTypeOrmLocalOptions(): TypeOrmModuleOptions {
  const useSsl = process.env.DB_SSL === 'true' || process.env.DB_SSL === '1'
  const base = {
    extra: {
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    },
    autoLoadEntities: true,
    logging: process.env.ENVIRONMENT === 'test',
  }

  if (process.env.DATABASE_URL) {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: useSsl ? { rejectUnauthorized: false } : false,
      ...base,
    }
  }

  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME || 'postgres',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    ssl: useSsl ? { rejectUnauthorized: false } : false,
    ...base,
  }
}