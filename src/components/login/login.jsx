import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    textAlign: "center",
    paddingBottom: 12
  },
  form: {
    width: "100%"
  },
  input: {
    marginBottom: 12,
    width: '100%'
  }
});

const Login = () =>{
  const { input, form } = useStyles();
  return (
    <div className="login">
      <Typography variant="h5">Авторизация</Typography>
      <form className={form}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <TextField className={input} variant="outlined" label="Имя" />
          <TextField className={input} variant="outlined" label="Фамилия" />
          <TextField className={input} variant="outlined" label="Почта" />
          <TextField
            className={input}
            variant="outlined"
            type="password"
            label="Пароль"
          />
          <TextField
            className={input}
            variant="outlined"
            type="password"
            label="Повторите пароль"
          />
          <Button size="large" variant="outlined" className={input}>
            Авторизироваться
          </Button>
        </Grid>
      </form>
    </div>
  );
}
export default Login;