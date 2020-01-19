import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [callback, errors, isSubmitting]);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
    setIsSent(true);
  };

  const handleChange = event => {
    event.persist && event.persist();
    setIsSubmitting(false);
    const newValues = { ...values, [event.target.name]: event.target.value };
    isSent && setErrors(validate(newValues));
    setValues(newValues);
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  };
};

export default useForm;
