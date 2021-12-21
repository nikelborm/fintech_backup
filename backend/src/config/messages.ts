export const messages = {
  auth: {
    incorrectUser: 'User with this email not found',
    incorrectPassword: 'Incorrect password',
    userDisabled: 'This user is blocked. Please contact the administrator',
    userHasNoAccessScopes:
      'This user has no access scopes. The user is not assigned to any rollup node and has no additional role. Please contact the administrator',
    developmentOnly: 'Development only',
    missingAuthHeader: 'Missing Authorization header (with Token)',
    incorrectTokenType: 'Token type should be Bearer',
    missingToken: `Missing Token in Authorization header`,
    invalidToken:
      'Token in Authorization header is not a valid JWT token, try requesting a new one',
  },
  matchRequest: {
    alreadyUsed: (code: string) =>
      `Match request with code={${code}} already used by another user`,
  },
  repo: {
    common: {
      cantGetNotFoundById: (entityName: string, id: number) =>
        `${
          entityName.charAt(0).toUpperCase() + entityName.slice(1)
        } with id={${id}} not found`,
      cantUpdateOneNotFound: (entityName: string, id: number) =>
        `Cannot update ${
          entityName || 'entity'
        } with id={${id}}, because it does not exist`,
      cantUpdateManyNotFound: (
        entityName: string,
        wantedToUpdateEntityIds: number[],
        notExistingEntityIds: number[],
      ) =>
        `Cannot update ${
          entityName || 'entitie'
        }s with ids={${wantedToUpdateEntityIds.join()}}, because some ${
          entityName || 'entitie'
        }s with ids={${notExistingEntityIds.join()}} does not exist`,
      cantCreateOne: (entityName: string, newEntity: any) =>
        `Unable to create new ${entityName || 'entity'} ={${JSON.stringify(
          newEntity,
        )}}`,
      cantCreateMany: (entityName: string, newEntities: any[]) =>
        `Unable to insert ${entityName || 'entitie'}s ={${JSON.stringify(
          newEntities,
        )}}`,
    },
    matchRequest: {
      cantGetNotFoundBy: (code: string) =>
        `Match request with code={${code}} not found`,
    },
  },
};
