import {
  OperationVariables,
  ApolloQueryResult,
  LazyQueryResult,
  QueryLazyOptions,
} from '@apollo/client';
import React, { useMemo } from 'react';
import { User } from 'types/user';
import { useUserData } from '../qraphql/hooks/userDataHook/useUserData';
import { createGenericContext } from '../utils/createGenericContext';

interface IPropsProvider {
  userData: User | undefined;
  loading: boolean;
  userDataRefetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
  refetchCookie: () => void;
  deleteCookie: () => void;
  loadUserById: (
    options?:
      | QueryLazyOptions<{
          id: string;
        }>
      | undefined
  ) => Promise<
    LazyQueryResult<
      any,
      {
        id: string;
      }
    >
  >;
}

interface IProps {
  children: React.ReactNode;
}

export const [useUserDataContext, UserDataContext] =
  createGenericContext<IPropsProvider>();

export function UserDataProvider({ children }: IProps) {
  const userDataResponse = useUserData();
  console.log('UserDataProvider');
  const memoizedValue = useMemo(
    () => userDataResponse,
    [JSON.stringify(userDataResponse || 'null')]
  );
  return (
    <UserDataContext value={memoizedValue as IPropsProvider}>
      {children}
    </UserDataContext>
  );
}
