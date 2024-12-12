import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AdminLogin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Context from "../../Component/Context/Context";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { adminLoggedin, setAdminLoggedin } = useContext(Context);
  const { adminData, setAdminData } = useContext(Context);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div className="login">
      <div className="form">
        <h1 className="text-center mb-5">Admin Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            await fetch("http://localhost:3000/admin/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: values.email,
                password: values.password,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                actions.setSubmitting(false);
                setAdminLoggedin(true);
                setAdminData(data.data);
                localStorage.setItem("adminlogin", true);
                localStorage.setItem("admindata", JSON.stringify(data.data));
                navigate("/admin");
                setTimeout(() => {
                  alert(`Welcome ${data.data.name}`);
                }, 3000);
              })
              .catch((err) => {
                console.error(err);
                actions.setSubmitting(false);
                actions.setErrors({ general: "An error occurred while logging in." });
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
                  className={`form-control ${errors.email && touched.email ? "is-invalid" : ""
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
                  className={`form-control ${errors.password && touched.password ? "is-invalid" : ""
                    }`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Sign In
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdminLogin;
