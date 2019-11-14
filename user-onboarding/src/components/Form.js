import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from 'styled-components';


const UserForm = ({ values, errors, touched, status }) => {
    const [users, setAnimals] = useState([]);
  
    useEffect(() => {
      status && setAnimals(users => [...users, status]);
    }, [status]);
  
    return (
      <div className="animal-form">
        <Form>
          <Field type="text" name="species" placeholder="species" />
          {touched.species && errors.species && (
            <p className="errors">{errors.species}</p>
          )}
          <Field type="text" name="size" placeholder="size" />
          {touched.size && errors.size && <p className="errors">{errors.size}</p>}
          <Field as="select" className="food-select" name="diet">
            <option>Please Choose an Option</option>
            <option value="herbivore">Herbivore</option>
            <option value="carnivore">Carnivore</option>
            <option value="omnivore">Omnivore</option>
          </Field>
          <label className="checkbox-container">
          Terms of Service
            <Field
              type="checkbox"
              name="termsOfService"
              checked={values.termsOfService}
            />
            <span className="checkmark" />
          </label>
          <Field as="textarea" type="text" name="notes" placeholder="notes" />
          <button>Submit!</button>
        </Form>
        {users.map(userpass => (
          <ul key={userpass.id}>
            <li>Species: {userpass.species}</li>
            <li>Size: {userpass.size}</li>
          </ul>
        ))}
      </div>
    );
  };
  const FormikUserForm = withFormik({
    mapPropsToValues({ species, size, diet, termsOfService, notes }) {
      return {
        species: species || "",
        size: size || "",
        diet: diet || "",
        termsOfService: termsOfService || false,
        notes: notes || ""
      };
    },
    validationSchema: Yup.object().shape({
      species: Yup.string().required(),
      size: Yup.string().required()
    }),
    handleSubmit(values, { setStatus }) {
      // values is our object with all our data on it
      axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
          setStatus(res.data);
          console.log(res);
        })
        .catch(err => console.log(err.response));
    }
  })(UserForm);
  export default FormikUserForm;
  console.log("This is the HOC", FormikUserForm);
  // HOC: A function that takes a component as its first argument and returns a new component that wraps the given component providing extra capabilities ( definition from Bob Ziroll on Scrimba)
  // Example of HOC syntax
  // const superComponent = withSpecialPowers(Component)
  // export default superComponent/
  