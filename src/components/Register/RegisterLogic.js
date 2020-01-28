import { useState, useEffect } from 'react';
import useForm from '../useForm/useForm';
import LifeManagerApiService from '../../services';
import { accountReg } from '../../actions/index';
import { useDispatch } from 'react-redux';
import useViewErros from '../ViewErrors';
import validate from './validate';

const useRegisterLogic = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(reg, validate);
  const [isRegister, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const { viewErrors, openViewError } = useViewErros(errors);

  //TODO:Перенаправлять на dashboard
  async function reg() {
    if (!isRegister) {
      const api = new LifeManagerApiService();
      const data = JSON.stringify(values);
      const { token, refreshToken }  = await api.registerUser(data);
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      dispatch(accountReg(token, refreshToken));
      setRegister(true);
    }
  }

  useEffect(() => {
    if (isRegister) setLoading(false);
  }, [isRegister]);

  useEffect(() => {
    openViewError();
    if (Object.keys(errors).length === 0 && isSubmitting && !isRegister) {
      setLoading(true);
    }
  }, [errors]);

  useEffect(() => {
    openViewError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const refHandleChange = e => {
    handleChange(e);
    openViewError();
  };

  return {
    viewErrors,
    errors,
    values,
    refHandleChange,
    handleClickShowPassword,
    showPassword,
    handleSubmit,
    loading
  };
};
export default useRegisterLogic;
