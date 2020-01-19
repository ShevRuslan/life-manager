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
import validate from '../../utils/validate.js';
import LifeManagerApiService from '../../services/';

const Login = () => {
  const { input, form, typography, link, wrapperLink } = useStyles(); //Стили для элементов
  const [showPassword, setShowPassword] = useState(false); //Флаг, отвечающий за показ пароля
  const [open, setOpen] = useState(false); //Флаг, отвечающий за показ Snackbar
  const { values, errors, handleChange, handleSubmit } = useForm(auth, validate);

  async function auth() {
    const api = new LifeManagerApiService();
    const data = JSON.stringify(values);
    const res = await api.loginUser(data);
    console.log(res);
  }

  const openViewError = useCallback(() => {
    if (Object.keys(errors).length === 0) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  })
  
  useEffect(() => {
    openViewError();
  }, [errors, openViewError]);

  const handleClose = reason => {
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
    <div className="login">
      {viewErrors()}
      <Typography variant="h5" className={typography}>
        Авторизация
      </Typography>
      <form className={form} onSubmit={handleSubmit}>
        <Grid container direction="column" justify="center" alignItems="center">
          <FormControl variant="outlined" className={input}>
            <InputLabel htmlFor="outlined-adornment-email" error={errors.email ? true : false}>
              Почта
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              value={values.email}
              name="email"
              onChange={refHandleChange}
              labelWidth={70}
              error={errors.email ? true : false}
            />
          </FormControl>
          <FormControl variant="outlined" className={input}>
            <InputLabel
              htmlFor="outlined-adornment-password"
              error={errors.password || errors.checkPassword ? true : false}
            >
              Пароль
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              onChange={refHandleChange}
              error={errors.password || errors.checkPassword ? true : false}
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
          <FormControl variant="outlined" className={input}>
            <InputLabel
              htmlFor="outlined-adornment-repeat-repeat-password"
              error={errors.repeatPassword || errors.checkPassword ? true : false}
            >
              Повторите пароль
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-repeat-repeat-password"
              type={showPassword ? 'text' : 'password'}
              value={values.repeatPassword}
              name="repeatPassword"
              onChange={refHandleChange}
              labelWidth={140}
              error={errors.repeatPassword || errors.checkPassword ? true : false}
            />
          </FormControl>
          <Button size="large" variant="outlined" className={input} onClick={handleSubmit}>
            Авторизироваться
          </Button>
          <Typography className={wrapperLink}>
            <a className={link} href="#">
              Восстановить пароль.
            </a>
          </Typography>
        </Grid>
      </form>
    </div>
  );
};
export default Login;
