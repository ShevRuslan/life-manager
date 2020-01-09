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

const Register = () => {
  const { input, form, typography, adjacentElement, register } = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    password: '',
    name: '',
    surname: '',
    email: ''
  });
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="register" className={register}>
      <Typography variant="h5" className={typography}>
        Регистрация
      </Typography>
      <form className={form}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid container direction="row" justify="space-between">
            <FormControl variant="outlined" className={adjacentElement}>
              <InputLabel htmlFor="outlined-adornment-name">Имя</InputLabel>
              <OutlinedInput
                id="outlined-adornment-name"
                value={values.name}
                onChange={handleChange('name')}
                labelWidth={70}
              />
            </FormControl>
            <FormControl variant="outlined" className={adjacentElement}>
              <InputLabel htmlFor="outlined-adornment-surname">Фамилия</InputLabel>
              <OutlinedInput
                id="outlined-adornment-surname"
                value={values.surname}
                onChange={handleChange('surname')}
                labelWidth={70}
              />
            </FormControl>
          </Grid>
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
          <Button className={input} size="large" variant="outlined">
            Зарегистрироваться
          </Button>
        </Grid>
      </form>
    </div>
  );
};
export default Register;
