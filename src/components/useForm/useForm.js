import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [submit, setSubmit] = useState(false)
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting && !submit) {
      callback();
      setSubmit(true)
    }
    
    if (Object.keys(errors).length !== 0 && !isSubmitting && submit) {
      setSubmit(false);
    }

  }, [callback, errors, isSubmitting, submit]);

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
    errors,
    isSubmitting
  };
};

export default useForm;
