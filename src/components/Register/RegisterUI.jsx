import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import useStyles from '../styles/log-reg/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import useRegisterLogic from './RegisterLogic';

const RegisterUI = () => {
  const { input, form, typography, adjacentElement, register, wrapper, buttonProgress, buttomSubmit } = useStyles();
  const {
    viewErrors,
    errors,
    values,
    refHandleChange,
    handleClickShowPassword,
    showPassword,
    handleSubmit,
    loading
  } = useRegisterLogic();
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
          <div className={wrapper}>
            <Button className={buttomSubmit} disabled={loading} size="large" variant="outlined" onClick={handleSubmit}>
              Зарегистрироваться
            </Button>
            {loading && <CircularProgress color="inherit" size={24} className={buttonProgress} />}
          </div>
        </Grid>
      </form>
    </div>
  );
};
export default RegisterUI;
