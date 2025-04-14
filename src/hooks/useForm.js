import { useState } from 'react';

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        setValues((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!values.name) newErrors.name = 'Full Name is required';
    if (!values.email) newErrors.email = 'Email Address is required';
    if (!values.role) newErrors.role = 'Role is required';
    if (!values.birthdate) newErrors.birthdate = 'Birth Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => setValues(initialValues);

  return {
    values,
    errors,
    handleChange,
    handleFileChange,
    validate,
    reset,
    setValues,
  };
}

export default useForm;