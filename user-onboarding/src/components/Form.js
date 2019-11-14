import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


const AnimalForm = ({ values, errors, touched, status }) => {
    const [animals, setAnimals] = useState([]);
  
    useEffect(() => {
      status && setAnimals(animals => [...animals, status]);
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
            vaccinations
            <Field
              type="checkbox"
              name="vaccinations"
              checked={values.vaccinations}
            />
            <span className="checkmark" />
          </label>
          <Field as="textarea" type="text" name="notes" placeholder="notes" />
          <button>Submit!</button>
        </Form>
        {animals.map(animal => (
          <ul key={animal.id}>
            <li>Species: {animal.species}</li>
            <li>Size: {animal.size}</li>
          </ul>
        ))}
      </div>
    );
  };
  const FormikAnimalForm = withFormik({
    mapPropsToValues({ species, size, diet, vaccinations, notes }) {
      return {
        species: species || "",
        size: size || "",
        diet: diet || "",
        vaccinations: vaccinations || false,
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
  })(AnimalForm);
  export default FormikAnimalForm;
  console.log("This is the HOC", FormikAnimalForm);
  // HOC: A function that takes a component as its first argument and returns a new component that wraps the given component providing extra capabilities ( definition from Bob Ziroll on Scrimba)
  // Example of HOC syntax
  // const superComponent = withSpecialPowers(Component)
  // export default superComponent/
  