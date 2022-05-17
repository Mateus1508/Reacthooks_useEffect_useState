import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const initialValues = { email: "", message: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!values.email.includes("@", ".")) {
      errors.email = "Email with incorrext format!";
    }
    if (!values.message) {
      errors.message = "Message is required!";
    } else if (values.message.length <= 5) {
      errors.message = "Message must be more than 5 characters!";
    }
    return errors;
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={handleChanges}
            name="email"
            value={formValues.email}
            required=""
          />
          <span>{formErrors.email}</span>
        </div>
        <div className="inputs">
          <label htmlFor="message">Text</label>
          <input
            type="text"
            onChange={handleChanges}
            name="message"
            value={formValues.message}
          />
          <span>{formErrors.message}</span>
        </div>
        <button>Enviar</button>
      </form>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <h3>Successfull login</h3>
      ) : (
        <></>
      )}
    </div>
  );
}
