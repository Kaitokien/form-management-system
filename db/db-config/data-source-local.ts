import 'dotenv/config'
import { DataSource } from 'typeorm'
import * as path from 'path'

const projectRoot = path.resolve(__dirname, '..', '..')
const entitiesDir = path.join(projectRoot, 'src', 'modules', '**', 'entities', '*.entity{.ts,.js}')
const migrationsDir = path.join(projectRoot, 'db', '*{.ts,.js}')

/**
 * BACKUP: DataSource using env vars only (DB_HOST/DB_PORT/... or DATABASE_URL).
 * Use this if you need to run migrations without AWS Secrets Manager
 * (e.g. local Postgres, CI with injected DB_*).
 *
 * To use: temporarily point package.json scripts to this file:
 *   "migration:run": "typeorm-ts-node-commonjs migration:run -d db/db-config/data-source.env-fallback.ts"
 */
function getDataSourceConfig() {
  const useSsl = process.env.DB_SSL === 'true' || process.env.DB_SSL === '1'

  if (process.env.DATABASE_URL) {
    return {
      type: 'postgres' as const,
      url: process.env.DATABASE_URL,
      ssl: useSsl ? { rejectUnauthorized: false } : false,
      entities: [entitiesDir],
      migrations: [migrationsDir],
      migrationsTableName: 'typeorm_migrations',
    }
  }

  return {
    type: 'postgres' as const,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME || 'postgres',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    ssl: useSsl ? { rejectUnauthorized: false } : false,
    entities: [entitiesDir],
    migrations: [migrationsDir],
    migrationsTableName: 'typeorm_migrations',
  }
}

export default new DataSource(getDataSourceConfig())
