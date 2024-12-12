import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import './Login.css'

import Context from "../../Component/Context/Context";

// import Login from './Login'
const ForgotPasswordForm = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });
  const {useremail,setuseremail}=useContext(Context)
  const navigate = useNavigate();
  return (
    <div className="login">
      <div className="form">
        <h1 className="text-center mb-5">Password Recovery</h1>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            await fetch("http://localhost:3000/users/forgotpassword", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: values.email,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.table(data);
                if (data.status == 200) {
                  actions.setSubmitting(false);
                  setuseremail(values.email)
                  navigate("/verifyotp");
                  

                  setTimeout(() => alert(`${data.message}`), 1000);
                } else {
                  alert("Invalid Credentials");
                }
              })
              .catch((err) => {
                console.error(err);
                // Handle error response here
                actions.setSubmitting(false);
                actions.setErrors({
                  general: "An error occurred while logging in.",
                });
              });
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="abc@gmail.com"
                  className={`form-control ${
                    errors.email && touched.email ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <br />
              <br />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <br />
              <br />
              <br />
              <Link to="/login" className="btn btn-link">
                Sign In
              </Link>
              <br />
              <Link to="/login" className="btn btn-link">
                Return to Login
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
