import { useState, useEffect } from 'react';
import useForm from '../useForm/useForm';
import LifeManagerApiService from '../../services';
import validate from '../../utils/validate';
import { accountAuth } from '../../actions/index';
import { useDispatch } from 'react-redux';
import useViewErros from '../ViewErrors';

const useLoginLogic = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(auth, validate);
  const { viewErrors, openViewError } = useViewErros(errors);
  const [isAuth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  //TODO:Перенаправлять на dashboard
  async function auth() {
    if (!isAuth) {
      const api = new LifeManagerApiService();
      const data = JSON.stringify(values);
      const { token, refreshToken } = await api.loginUser(data);
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      dispatch(accountAuth(token, refreshToken));
      setAuth(true);
    }
  }

  useEffect(() => {
    if (isAuth) setLoading(false);
  }, [isAuth]);

  useEffect(() => {
    openViewError();
    if (Object.keys(errors).length === 0 && isSubmitting && !isAuth) {
      setLoading(true);
    }
  }, [errors]);


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const refHandleChange = e => {
    handleChange(e);
    openViewError();
  };

  const refHandleSubmit = e => {
    handleSubmit(e);
  };

  return {
    viewErrors,
    errors,
    values,
    refHandleChange,
    handleClickShowPassword,
    showPassword,
    refHandleSubmit,
    loading
  };
};

export default useLoginLogic;
