import React, { useState, useEffect, useCallback } from 'react';
import useForm from '../useForm/useForm';
import LifeManagerApiService from '../../services';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import validate from '../../utils/validate';

const useLoginLogic = () => {
  const [showPassword, setShowPassword] = useState(false); //Флаг, отвечающий за показ пароля
  const [open, setOpen] = useState(false); //Флаг, отвечающий за показ Snackbar
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(auth, validate);
  const [isAuth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  //TODO:Добавлять в redux-state и перенаправлять на dashboard
  async function auth() {
    if (!isAuth) {
      const api = new LifeManagerApiService();
      const data = JSON.stringify(values);
      const { token, refreshToken } = await api.loginUser(data);
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      setAuth(true);
    }
  }

  const openViewError = useCallback(() => {
    if (Object.keys(errors).length === 0) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  });

  useEffect(() => {
    if (isAuth) setLoading(false);
  }, [isAuth]);

  useEffect(() => {
    openViewError();
    if (Object.keys(errors).length === 0 && isSubmitting && !isAuth) {
      setLoading(true);
    }
  }, [errors]);

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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

  const viewErrors = () => {
    let viewError = null;
    if (Object.keys(errors).length !== 0) {
      viewError = (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          {
            <Alert elevation={6} variant="filled" severity="error" onClose={handleClose}>
              {Object.keys(errors).map((fieldName, key) => {
                return <div key={key}>{errors[fieldName]}</div>;
              })}
            </Alert>
          }
        </Snackbar>
      );
    }
    return viewError;
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
