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

const Login = () => {
  const { input, form, typography, link, wrapperLink } = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
    repeatPassword: ''
  });
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="login">
      <Typography variant="h5" className={typography}>
        Авторизация
      </Typography>
      <form className={form}>
        <Grid container direction="column" justify="center" alignItems="center">
          <FormControl variant="outlined" className={input}>
            <InputLabel htmlFor="outlined-adornment-email">Почта</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              value={values.email}
              onChange={handleChange('email')}
              labelWidth={70}
            />
          </FormControl>
          <FormControl variant="outlined" className={input}>
            <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
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
            <InputLabel htmlFor="outlined-adornment-repeat-repeat-password">Повторите пароль</InputLabel>
            <OutlinedInput
              id="outlined-adornment-repeat-repeat-password"
              type={showPassword ? 'text' : 'password'}
              value={values.repeatPassword}
              onChange={handleChange('repeatPassword')}
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
          <Button size="large" variant="outlined" className={input}>
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
