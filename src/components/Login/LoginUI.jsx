import React from 'react';
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
import useLoginLogic from './LoginLogic';

const LoginUI = () => {
  const { input, form, typography, link, wrapperLink } = useStyles(); //Стили для элементов
  const {
    viewErrors,
    errors,
    values,
    refHandleChange,
    handleClickShowPassword,
    showPassword,
    handleSubmit
  } = useLoginLogic();
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
export default LoginUI;
