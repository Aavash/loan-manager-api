import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { DATABASE_CONFIG } from '../config/main.config';

const dbConfig: ConnectionOptions = {
	type: 'postgres',
	url: DATABASE_CONFIG.url,
	// host: DATABASE_CONFIG.host,
	// port: DATABASE_CONFIG.port,
	// username: DATABASE_CONFIG.username,
	// password: DATABASE_CONFIG.password,
	// database: DATABASE_CONFIG.database,
	// We are using migrations, synchronize should be set to false.
	synchronize: false,
	migrationsRun: String(true) === process.env.MIGRATION_RUN,
	logging: true,
	migrationsTableName: 'nest_migration',
	logger: 'advanced-console',
	subscribers: [join(__dirname, '/../subscriber/*{.ts,.js}')],
	migrations: [join(__dirname, '/../migrations/*{.ts,.js}')],
	entities: [
		// User
		join(__dirname, '/../modules/**/entities/*.entity.{js,ts}'),
		join(__dirname, '/../entities/*.entity.{js,ts}'),
	],
	cli: {
		migrationsDir: join(__dirname, '/../migrations'),
		entitiesDir: join(__dirname, '/../modules/**/entities'),
	},
	extra: { max: 20 },
};

// console.log(process.env)
// console.log(dbConfig);
export = dbConfig;