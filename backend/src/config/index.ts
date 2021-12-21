import { ConfigService } from '@nestjs/config';

export * from './messages';

export * from './app.config';
export * from './db.config';
export function logConfig(configService: ConfigService) {
  console.log('isDevelopment:', configService.get('isDevelopment'));
  console.log('isProduction:', configService.get('isProduction'));
  console.log('serverPort:', configService.get('serverPort'));
  console.log(
    'currencyLayerAccessKey:',
    configService.get('currencyLayerAccessKey'),
  );
  console.log('stripeKey:', configService.get('stripeKey'));
  console.log('paymentsRedirectUrl:', configService.get('paymentsRedirectUrl'));

  console.log('database.type:', configService.get('database.type'));
  console.log('database.host:', configService.get('database.host'));
  console.log('database.port:', configService.get('database.port'));
  console.log('database.username:', configService.get('database.username'));
  console.log('database.password:', configService.get('database.password'));
  console.log('database.entities:', configService.get('database.entities'));
  console.log(
    'database.synchronize:',
    configService.get('database.synchronize'),
  );
  console.log(
    'database.migrationsTableName:',
    configService.get('database.migrationsTableName'),
  );
  console.log('database.migrations:', configService.get('database.migrations'));
  console.log(
    'database.migrationsRun:',
    configService.get('database.migrationsRun'),
  );
  console.log('database.cli:', configService.get('database.cli'));
  console.log('database.name:', configService.get('database.name'));
  console.log(
    'database.typeormLoggingMode:',
    configService.get('database.typeormLoggingMode'),
  );
}
