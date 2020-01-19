import React, { useState, useEffect, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import useStyles from '../styles/log-reg/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import useForm from '../useForm/useForm';
import LifeManagerApiService from '../../services/';

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

const Register = () => {
  const { input, form, typography, adjacentElement, register } = useStyles();
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

  return (
    <div className={register}>
      {viewErrors()}
      <Typography variant="h5" className={typography}>
        Регистрация
      </Typography>
      <form className={form}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid container direction="row" justify="space-between">
            <FormControl variant="outlined" className={adjacentElement}>
              <InputLabel htmlFor="outlined-adornment-name" error={errors.name ? true : false}>
                Имя
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-name"
                value={values.name}
                name="name"
                onChange={refHandleChange}
                labelWidth={70}
                error={errors.name ? true : false}
              />
            </FormControl>
            <FormControl variant="outlined" className={adjacentElement}>
              <InputLabel htmlFor="outlined-adornment-surname" error={errors.surname ? true : false}>
                Фамилия
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-surname"
                value={values.surname}
                name="surname"
                onChange={refHandleChange}
                error={errors.surname ? true : false}
                labelWidth={70}
              />
            </FormControl>
          </Grid>
          <FormControl variant="outlined" className={input}>
            <InputLabel htmlFor="outlined-adornment-email" error={errors.email ? true : false}>
              Почта
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              value={values.email}
              name="email"
              error={errors.email ? true : false}
              onChange={refHandleChange}
              labelWidth={70}
            />
          </FormControl>
          <FormControl variant="outlined" className={input}>
            <InputLabel htmlFor="outlined-adornment-password" error={errors.password ? true : false}>
              Пароль
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              error={errors.password ? true : false}
              name="password"
              onChange={refHandleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <Button className={input} size="large" variant="outlined" onClick={handleSubmit}>
            Зарегистрироваться
          </Button>
        </Grid>
      </form>
    </div>
  );
};
export default Register;
