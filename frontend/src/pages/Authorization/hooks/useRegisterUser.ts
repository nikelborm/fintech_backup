import React from 'react';

import { gql, useMutation } from '@apollo/client';

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
    }
  }
`;

export function useRegisterUser() {
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  return { loginUser, loading };
}
