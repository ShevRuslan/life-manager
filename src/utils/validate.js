export default  values => {
  let errors = {};
  if (!values.email) {
    errors.email = 'Введите email адрес.';
  // eslint-disable-next-line no-useless-escape
  } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
    errors.email = 'Неправильно набран email адрес.';
  }
  if (!values.password) {
    errors.password = 'Введите пароль.';
  } else if (values.password.length < 8) {
    errors.password = 'Пароль должен быть больше 8 символов.';
  }

  if (!values.repeatPassword) {
    errors.repeatPassword = 'Введите повторный пароль!';
  }
  else if (values.repeatPassword.length < 8) {
    errors.repeatPassword = 'Повторый пароль должен быть больше 8 символов.';
  }

  if (values.password != values.repeatPassword) {
    errors.checkPassword = 'Пароли не совпадают!'; 
  }
  
  return errors;
};