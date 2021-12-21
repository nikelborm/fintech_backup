import React, { useState } from 'react';

import { Popup } from 'common/Popup';
import { Input } from 'common/Input/Input';
import { Button } from 'common/Button/Button';
import { useConnectToEstablishment } from 'qraphql/query/useConnectToEstablishment';
import { useUserDataContext } from 'context/UserDataContext';

interface IProps {
  isModalOpen: boolean;
  setisModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ConnectToEstablishment({
  isModalOpen,
  setisModalOpen,
}: IProps) {
  const [state, setState] = useState('');
  const [error, setError] = useState(false);
  const { userDataRefetch, loadUserById } = useUserDataContext();
  const { connectToEstablishmentMutation } = useConnectToEstablishment(state);

  async function connectToEstablishment() {
    try {
      await connectToEstablishmentMutation();
      await userDataRefetch();
      await loadUserById();
      setError(false);
      setisModalOpen(false);
    } catch (e) {
      setError(true);
    }
  }

  return (
    <Popup isOpen={isModalOpen} onClose={() => setisModalOpen(false)}>
      Введите номер{' '}
      <Input
        label="Номер"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      {error && 'Что-то пошло не так'}
      <Button theme="violet" onClick={() => connectToEstablishment()}>
        Ввести номер
      </Button>
    </Popup>
  );
}
