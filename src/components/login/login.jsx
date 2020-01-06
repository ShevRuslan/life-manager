import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import useStyles from '../styles/log-reg/styles';

const Login = props => {
    const { input, form, typo, adjacentElement } = useStyles();
    const { onChange } = props;
    return (
        <div className="login">
            <Typography variant="h5" className={typo}>
                Авторизация
            </Typography>
            <form className={form}>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Grid container direction="row" justify="space-between">
                        <TextField className={adjacentElement} variant="outlined" label="Имя" />
                        <TextField className={adjacentElement} variant="outlined" label="Фамилия" />
                    </Grid>
                    <TextField className={input} variant="outlined" label="Почта" />
                    <TextField className={input} variant="outlined" type="password" label="Пароль" />
                    <TextField className={input} variant="outlined" type="password" label="Повторите пароль" />
                    <Button onClick={onChange} size="large" variant="outlined" className={input}>
                        Авторизироваться
                    </Button>
                </Grid>
            </form>
        </div>
    );
};
export default Login;
