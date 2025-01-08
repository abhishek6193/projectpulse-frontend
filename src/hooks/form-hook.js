import { useState, useCallback } from "react";

import { validate } from "../utils/validators";

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = useCallback((e, validators) => {
    const { name, value } = e.target;

    setValues((values) => {
      return {
        ...values,
        [name]: value,
      };
    });

    if (validators) {
      const errors = validate(value, validators, name);
      setFormErrors((formErrors) => {
        return {
          ...formErrors,
          [name]: errors,
        };
      });
    }
  }, []);

  const clearFormErrors = useCallback(() => {
    setFormErrors({});
  }, []);

  const clearFormData = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  return {
    values,
    formErrors,
    handleChange,
    clearFormErrors,
    clearFormData,
    setValues,
  };
};
