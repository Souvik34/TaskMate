// src/utils/zodToFormik.js
export const zodToFormik = (schema) => (values) => {
    try {
      schema.parse(values);
      return {};
    } catch (err) {
      const errors = {};
      err.errors.forEach(({ path, message }) => {
        errors[path[0]] = message;
      });
      return errors;
    }
  };
  