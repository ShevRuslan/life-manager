import React, { useState, useEffect, useCallback } from 'react';
import useForm from '../useForm/useForm';
import LifeManagerApiService from '../../services';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const validate = values => {
  let errors = {};
  if (!values.email) {
    errors.email = 'Введите email адрес.';
  } else if (
    // eslint-disable-next-line no-useless-escape
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      values.email
    )
  ) {
    errors.email = 'Неправильно набран email адрес.';
  }
  if (!values.password) {
    errors.password = 'Введите пароль.';
  } else if (values.password.length < 8) {
    errors.password = 'Пароль должен быть больше 8 символов.';
  }

  if (!values.name) errors.name = 'Введите имя!';

  if (!values.surname) errors.surname = 'Введите фамилию!';

  return errors;
};

const useRegisterLogic = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false); //Флаг, отвечающий за показ Snackbar
  const { values, errors, handleChange, handleSubmit } = useForm(reg, validate);

  //FIXME:Добавлять в redux-state
  async function reg() {
    const api = new LifeManagerApiService();
    const data = JSON.stringify(values);
    const res = await api.registerUser(data);
    console.log(res);
  }

  const openViewError = useCallback(() => {
    if (Object.keys(errors).length === 0) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  });

  useEffect(() => {
    openViewError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    handleSubmit
  };
};
export default useRegisterLogic;
