import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Context from "../../Component/Context/Context";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserProfile from "../User/Profile";



const LoginSignInForm = () => {
  
  const navigate=useNavigate()
  

const {userLoggedin,setUserLoggedin}=useContext(Context)
console.log(userLoggedin);



  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div className="login">
      <div className="form">
        <h1 className="text-center mb-5">Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            // Handle form submission here
            fetch("http://localhost:3000/users/login", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: values.email,
                password: values.password,
              }),
            })
              .then((res) => res.json())
              .then((result) => {
                if (result.login) {
                console.log(result.login)
                  setUserLoggedin(result.login)
                  actions.setSubmitting(false);
                  localStorage.setItem('token', result.token);
                  localStorage.setItem('email', result.payload.email);
                  localStorage.setItem('login', result.login);
                  

                  //.....................................navigate to user
                  navigate("/userprofile");
                  setTimeout(() => {
                    alert(`welcome ${result.payload.name}`);
                  }, 3000);
                  
                } else {alert(result.message);
                
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
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className={`form-control ${
                    errors.password && touched.password ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                signin
              </button>
              <br />
              <br />
              <Link to="/signup" className="btn btn-link">
                Sign Up
              </Link>
              <br />
              <Link to="/forgotpassword" className="btn btn-link">
                Forgot Password
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginSignInForm;
