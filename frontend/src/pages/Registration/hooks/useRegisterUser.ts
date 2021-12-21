import React from 'react';

import { gql, useMutation } from '@apollo/client';

const REGISTER_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
    }
  }
`;

export function useRegisterUser() {
  const [registerUser, { loading }] = useMutation(REGISTER_USER);
  return { registerUser, loading };
}
