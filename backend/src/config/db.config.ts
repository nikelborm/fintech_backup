import { registerAs } from '@nestjs/config';
import * as ormconfig from '../../ormconfig';

export const dbConfig = registerAs('database', () => ({
  type: ormconfig.type,
  host: ormconfig.host,
  port: ormconfig.port,
  username: ormconfig.username,
  password: ormconfig.password,
  entities: ormconfig.entities,
  synchronize: ormconfig.synchronize,
  migrationsTableName: ormconfig.migrationsTableName,
  migrations: ormconfig.migrations,
  migrationsRun: ormconfig.migrationsRun,
  cli: ormconfig.cli,
  name: ormconfig.database,
  typeormLoggingMode: ormconfig.logging,
}));
