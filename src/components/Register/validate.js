const validate = values => {
  let errors = {};
  if (!values.email) {
    errors.email = 'Введите email адрес.';
  } else if (
    // eslint-disable-next-line no-useless-escape
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      values.email
    )
  ) {
    errors.email = 'Неправильно набран email адрес.';
  }
  if (!values.password) {
    errors.password = 'Введите пароль.';
  } else if (values.password.length < 8) {
    errors.password = 'Пароль должен быть больше 8 символов.';
  }

  if (!values.name) errors.name = 'Введите имя!';

  if (!values.surname) errors.surname = 'Введите фамилию!';

  return errors;
};

export default validate;