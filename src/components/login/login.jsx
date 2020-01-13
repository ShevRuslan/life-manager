import React, { useState } from 'react';
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

const Login = () => {
  const { input, form, typography, link, wrapperLink } = useStyles(); //Стили для элементов
  const [showPassword, setShowPassword] = useState(false); //Флаг, отвечающий за показ пароля
  const [errors, setErrors] = useState([]); //Массив ошибок
  // eslint-disable-next-line no-unused-vars
  const [visibleErrors, setVisibleErrors] = useState({email: undefined, password:undefined, repeatPassword:undefined});
  const [open, setOpen] = useState(false); //Флаг, отвечающий за показ Snackbar
  /**
   * Хранилище данных, для последующей авторизации
   * @param  email
   * @param  password
   * @param  repeatPassword
   */
  const [values, setValues] = useState({
    email: '',
    password: '',
    repeatPassword: ''
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  /** Функция, меняющая значение в хранилище данных по event
   * @param  values
   * @param  event
   */
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const addError = (error, input) => {
    const index = errors.findIndex(err => err.input == input && err.content == error);
    if (index == -1) {
      visibleErrors[input] = error;
      setErrors(old => [...old, { input: input, content: error }]);
    }
  };
  const deleteError = (error, input) => {
    setErrors(errors => errors.filter(item => item.content !== error && item.input !== input));
    visibleErrors[input] = undefined;
  };
  const validate = () => {
    const { password, email, repeatPassword } = values;

    if (password.trim() == '') {
      addError('Введите пароль!', 'password');
    } else {
      deleteError('Введите пароль!', 'password');
    }

    if (repeatPassword.trim() == '') {
      addError('Введите повторный пароль!', 'repeatPassword');
    } else {
      deleteError('Введите повторный пароль!', 'repeatPassword');
    }

    if (email.trim() == '') {
      addError('Введите email!', 'email');
    } else {
      deleteError('Введите email!', 'email');
    }

    if (errors.lenght != 0) setOpen(true);
  };
  const onSubmit = () => {
    validate();
  };
  let viewError = null;
  if (errors.length > 0) {
    viewError = (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {
          <Alert elevation={6} variant="filled" severity="error" onClose={handleClose}>
            {errors.map((err, key) => {
              return <div key={key}>{err.content}</div>;
            })}
          </Alert>
        }
      </Snackbar>
    );
  }
  return (
    <div className="login">
      {viewError}
      <Typography variant="h5" className={typography}>
        Авторизация
      </Typography>
      <form className={form}>
        <Grid container direction="column" justify="center" alignItems="center">
          <FormControl variant="outlined" className={input}>
            <InputLabel error={visibleErrors.email ? true : false} htmlFor="outlined-adornment-email">
              Почта
            </InputLabel>
            <OutlinedInput
              error={visibleErrors.email ? true : false}
              id="outlined-adornment-email"
              value={values.email}
              onChange={handleChange('email')}
              labelWidth={70}
            />
          </FormControl>
          <FormControl variant="outlined" className={input}>
            <InputLabel htmlFor="outlined-adornment-password" error={visibleErrors.password ? true : false}>Пароль</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              error={visibleErrors.password ? true : false}
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
            <InputLabel error={visibleErrors.repeatPassword ? true : false} htmlFor="outlined-adornment-repeat-repeat-password">Повторите пароль</InputLabel>
            <OutlinedInput
              error={visibleErrors.repeatPassword ? true : false}
              id="outlined-adornment-repeat-repeat-password"
              type={showPassword ? 'text' : 'password'}
              value={values.repeatPassword}
              onChange={handleChange('repeatPassword')}
              labelWidth={140}
            />
          </FormControl>
          <Button size="large" variant="outlined" className={input} onClick={onSubmit}>
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
