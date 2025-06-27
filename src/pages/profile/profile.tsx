import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { userSelectors } from '../../services/slices/user';
import { useDispatch, useSelector } from '../../services/store';
import { updateUserThunk } from '../../services/thunk/user';
import { Preloader } from '@ui';

export const Profile: FC = () => {
  const user = useSelector(userSelectors.getUserData);
  const userIsLoading = useSelector(userSelectors.getIsLoading);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const updatedData: { name: string; email: string; password?: string } = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password !== '' ? formValue.password : undefined
    };
    dispatch(updateUserThunk(updatedData))
      .unwrap()
      .catch((error) => console.log('Ошибка при изменении данных: ', error));
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return userIsLoading ? (
    <Preloader />
  ) : (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
