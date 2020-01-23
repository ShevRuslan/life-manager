import React, { useState, useEffect, useCallback } from 'react';
import useForm from '../useForm/useForm';
import LifeManagerApiService from '../../services';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import validate from '../../utils/validate';

const useLoginLogic = () => {
  const [showPassword, setShowPassword] = useState(false); //Флаг, отвечающий за показ пароля
  const [open, setOpen] = useState(false); //Флаг, отвечающий за показ Snackbar
  const { values, errors, handleChange, handleSubmit } = useForm(auth, validate);

  //FIXME:Добавлять в redux-state
  async function auth() {
    const api = new LifeManagerApiService();
    const data = JSON.stringify(values);
    const res = await api.loginUser(data);
    console.log(res);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
export default useLoginLogic;