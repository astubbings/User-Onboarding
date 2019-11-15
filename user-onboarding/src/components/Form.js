import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import styled from 'styled-components';

// const MyForm = styled.form`
//     border: 2px solid red;
//     display: flex;
//     flex-direction: column;
//     width: 460px;
//     margin: 20px 50px;
//     padding: 32px;
//     font-weight: bold;
//     background-color: coral;
//     box-shadow: 2px 2px 10px 10px rgba(0, 0, 0, 0.1);
// `;

const UserForm = ({ values, errors, touched, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status]);

    return (
        <div>
            <Form>
                <Field type="text" name="userName" placeholder="userName" />
                {touched.userName && errors.userName && (
                    <p className="errors">{errors.userName}</p>
                )}
                <Field type="email" name="email" placeholder="email" />
                {touched.email && errors.email && (
                    <p className="email">{errors.email}</p>
                )}

                <Field as="select" className="userFitType" name="userFitType">
                    <option>Choose Type of Fitness</option>
                    <option value="dryland">Dry Land Fitness</option>
                    <option value="pool">Pool Fitness</option>
                    <option value="cycle">Tour Training (Cycle)</option>
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

                <Field as="textarea" type="text" name="userNotes" placeholder="userNotes" />
                <button type="submit">Submit!</button>
            </Form>

            {users.map(usercb => (
                <ul key={usercb.id}>
                    <li>User Name: {usercb.userName}</li>
                    <li>User Email: {usercb.email}</li>
                    <li>User Type of Fitness: {usercb.userFitType}</li>
                    <li>User Fitness Notes: {usercb.userNotes}</li>
                </ul>
            ))}
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ userName, email, userFitType, termsOfService, userNotes }) {
        return {
            userName: userName || "",
            email: email || "",
            userFitType: userFitType || "",
            termsOfService: termsOfService || false,
            userNotes: userNotes || ""
        };
    },
    validationSchema: Yup.object().shape({
        userName: Yup.string().required(),
        email: Yup.string().required()
    }),
    handleSubmit(values, {setStatus, resetForm}) {
        // values is our object with all our data on it
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                setStatus(res.data);
                console.log(res);
            })
            .catch(err => console.log(err.response))
            .finally(resetForm)
    }
})(UserForm);
export default FormikUserForm;
console.log("This is the HOC", FormikUserForm);
  // HOC: A function that takes a component as its first argument and returns a new component that wraps the given component providing extra capabilities ( definition from Bob Ziroll on Scrimba)
  // Example of HOC syntax
  // const superComponent = withSpecialPowers(Component)
  // export default superComponent/
