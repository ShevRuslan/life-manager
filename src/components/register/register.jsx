import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import useStyles from '../styles/log-reg/styles';

const Register = props => {
    const { input, form, typo} = useStyles();
    const { onChange } = props;
    return (
        <div className="register" style={{ width: '100%' }}>
            <Typography variant="h5" className={typo}>
                Регистрация
            </Typography>
            <form className={form}>
                <Grid container direction="column" justify="center" alignItems="center">
                    <TextField className={input} variant="outlined" label="Почта" />
                    <TextField className={input} variant="outlined" type="password" label="Пароль" />
                    <Button className={input} onClick={onChange} size="large" variant="outlined">
                        Зарегистрироваться
                    </Button>
                </Grid>
            </form>
        </div>
    );
};
export default Register;
