import React, { useEffect, useState } from 'react';
import { Establishment } from 'types/establishment';
import { Button } from 'common/Button/Button';
import { Popup } from 'common/Popup';

import classes from '../Account.module.scss';
import { Input } from '../../../common/Input/Input';
import { useCreateEstablishment } from '../../../qraphql/query/useCreateEstablishment';
import { useUserDataContext } from 'context/UserDataContext';
import { useGetEstablishments } from '../../../qraphql/query/useGetEstablishments';
import { useCreateMatchRequest } from '../../../qraphql/query/useCreateMatchRequest';

export function AccountOwner() {
  const [establishment, setEstablishment] = useState<Establishment>(Object);
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [code, setCode] = useState('');
  const { userData } = useUserDataContext();
  const createEstablishment = useCreateEstablishment();
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [isCreatingEstablishment, setIsCreatingEstablishment] = useState(false);
  const [selectedEstablishment, setSelectedEstablishment] =
    useState<Establishment | null>(null);
  const [selectedEstablishmentId, setSelectedEstablishmentId] = useState(-1);
  const dbEstablishments = useGetEstablishments();
  const generateStaffCode = useCreateMatchRequest();
  useEffect(() => {
    const fetch = () => {
      if (dbEstablishments?.establishments)
        setEstablishments(dbEstablishments.establishments);
    };
    fetch();
  }, [dbEstablishments]);
  const onCreateEstablishmentClick = async () => {
    if (userData) {
      const savedEstablishment = await createEstablishment(
        establishment,
        userData?.id
      );
      console.log(savedEstablishment);
      setIsCreatingEstablishment(false);
      const newEstablishments = [
        ...establishments,
        savedEstablishment.data.createEstablishment,
      ];
      setEstablishments(newEstablishments);
    }
  };

  const onGenerateCodeClick = async () => {
    const mutationResult = await generateStaffCode({
      establishmentId: selectedEstablishmentId,
    });
    setCode(mutationResult.data.createMatchRequest.code);
  };
  return (
    <div className={classes.account__owner}>
      <div className={classes.account__owner_establishments}>
        <div className={classes.account__title}>Мои заведения</div>
        <Button onClick={() => setIsCreatingEstablishment(true)}>
          Добавить заведение
        </Button>
      </div>

      <div className={classes.account__owner_establishments}>
        {establishments &&
          establishments.length &&
          establishments.map((item) => (
            <div
              key={item.id}
              className={classes.account__owner_establishment}
              onClick={() =>
                setSelectedEstablishment(
                  establishments.find((est) => est.id === item.id)!
                )
              }
            >
              {item.name}
            </div>
          ))}
      </div>

      <div className={classes.account__owner_establishments}>
        <div className={classes.account__title}>Мои Сотрудники</div>
        <Button onClick={() => setIsAddingEmployee(true)}>
          Добавить сотрудника
        </Button>
      </div>
      {selectedEstablishment && (
        <>
          <Popup
            onClose={() => setSelectedEstablishment(null)}
            isOpen={!!selectedEstablishment}
          >
            <label style={{ marginBottom: '10px' }}>
              Название:
              <div style={{ marginBottom: '20px' }}>
                {selectedEstablishment.name}
              </div>
            </label>

            <label style={{ marginBottom: '10px' }}>
              Адрес:
              <div style={{ marginBottom: '20px' }}>
                {selectedEstablishment.address}
              </div>
            </label>

            <label style={{ marginBottom: '10px' }}>
              ИНН:
              <div style={{ marginBottom: '20px' }}>
                {selectedEstablishment.ITN}
              </div>
            </label>
            <Button onClick={() => setSelectedEstablishment(null)}>
              Закрыть
            </Button>
          </Popup>
        </>
      )}

      {isCreatingEstablishment && (
        <>
          <Popup
            onClose={() => setIsCreatingEstablishment(false)}
            isOpen={isCreatingEstablishment}
          >
            <Input
              label={'Название: '}
              value={establishment.name}
              onChange={(event) =>
                setEstablishment({ ...establishment, name: event.target.value })
              }
            />
            <Input
              label={'Адрес: '}
              value={establishment.address}
              onChange={(event) =>
                setEstablishment({
                  ...establishment,
                  address: event.target.value,
                })
              }
            />
            <Input
              label={'ИНН: '}
              value={establishment.ITN}
              onChange={(event) =>
                setEstablishment({ ...establishment, ITN: event.target.value })
              }
            />

            {userData && (
              <Button onClick={() => onCreateEstablishmentClick()}>
                Создать
              </Button>
            )}
            <Button onClick={() => setIsCreatingEstablishment(false)}>
              Закрыть
            </Button>
          </Popup>
        </>
      )}

      {isAddingEmployee && (
        <>
          <Popup
            onClose={() => setIsAddingEmployee(false)}
            isOpen={isAddingEmployee}
          >
            {selectedEstablishmentId === -1 ? (
              <label
                style={{
                  marginBottom: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                Выберите заведение
                <select
                  style={{ marginTop: '10px' }}
                  onChange={(event) =>
                    setSelectedEstablishmentId(Number(event.target.value))
                  }
                >
                  <option value={"default"}></option>
                  {establishments.map((est) => {
                    return <option value={est.id}>{est.name}</option>;
                  })}
                </select>
              </label>
            ) : code ? (
              <div>Код для подключения сотрудника - {code}</div>
            ) : (
              <Button onClick={() => onGenerateCodeClick()}>
                Сгенерировать код
              </Button>
            )}

            <Button onClick={() => setIsAddingEmployee(false)}>Закрыть</Button>
          </Popup>
        </>
      )}
    </div>
  );
}
