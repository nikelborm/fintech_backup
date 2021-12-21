import { gql, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useCookieValue } from '../useCookieValue';
import { useGetUserQuery } from '../useGetUserQuery';

const GET_USER_DATA = gql`
  query currentUser {
    currentUser {
      id
      firstName
      lastName
      middleName
      email
      password
      isOwner
      isCustomer
      isEmployer
      ownEstablishments {
        id
        address
        ITN
        name
      }
      employedInEstablishments {
        id
        address
        ITN
        name
      }
    }
  }
`;

export function useUserData() {
  const { cookieValue, deleteCookie, refetchCookie } =
    useCookieValue('connect.sid');
  const [userData, setUserData] = useState();
  function useGetAuthorizedUser() {
    return useLazyQuery(GET_USER_DATA, {
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
    });
  }
  const [
    getAuthorizedUser,
    { error, data, loading, refetch: userDataRefetch },
  ] = useGetAuthorizedUser();

  const { loadUserById, data: userDataById } = useGetUserQuery(
    Number(data?.currentUser?.id)
  );

  useEffect(() => {
    getAuthorizedUser();
  }, [JSON.stringify(userDataById || 'null')]);

  useEffect(() => {
    if (data) {
      setUserData(data.currentUser);
    }
    if (userDataById) {
      setUserData(userDataById.user);
    }
  }, [JSON.stringify(userDataById || 'null'), JSON.stringify(data || 'null')]);

  useEffect(() => {
    if (error) {
      deleteCookie();
    }
  }, [JSON.stringify(error || 'null')]);

  function isDataLoading() {
    if (loading) {
      return true;
    }
    if (!userDataRefetch) {
      return true;
    }
    if (data?.currentUser) {
      return false;
    }
    return !!data?.currentUser;
  }

  return {
    userData: userData,
    loadUserById: loadUserById,
    loading: isDataLoading(),
    userDataRefetch,
    refetchCookie,
    deleteCookie,
  };
}
