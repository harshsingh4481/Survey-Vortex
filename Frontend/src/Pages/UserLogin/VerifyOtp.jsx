import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import axios from "axios";

import Context from "../../Component/Context/Context";
 
const VerifyOtp = () => {
  
  const navigate = useNavigate();
  

  const { useremail, setuseremail } = useContext(Context);
  const [otpValidated, setOtpValidated] = useState(false);
  const [disableOtpField, setDisableOtpField] = useState(false);

  return (
    <div className="login">
      <div className="form">
        <h1 className="text-center mb-5">Verify OTP</h1>
        <Formik
          initialValues={{ otp: "", newPassword: "", confirmPassword: "" }}
          validationSchema={Yup.object({
            otp: Yup.string()
              .min(4, "OTP must be 4 digits")
              .max(4, "OTP must be 4 digits")
              .required("OTP is required"),
            newPassword: otpValidated
              ? Yup.string().min(8, "Password must be at least 8 characters").required("Required")
              : null,
            confirmPassword: otpValidated
              ? Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required('Required')
              : null,
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            setSubmitting(true);
            if (!otpValidated) {
              // Handle OTP validation
              try {
          
                const response = await axios.post("http://localhost:3000/users/validateotp", {
                  email:useremail,
                  otp: values.otp,
                });
                console.table(response.data);
                alert(response.data.message);
                if (response.data.status === 200) {
                  setOtpValidated(true);
                  setDisableOtpField(true);
                  alert("OTP verified. Please set your new password.");
                } else {
                  
                  navigate('/forgotpassword');
                  alert("Invalid OTP. Please try again.");
                }
              } catch (error) {
                console.error(error);
                setSubmitting(false);
                setErrors({
                  general: "An error occurred. Please try again.",
                });
              }
            } else {
              // Handle password update
              try {
                const response = await axios.post("http://127.0.0.1:5500/users/newpassword", {
                  email: useremail,
                  new_password: values.newPassword,
                  confirm_password: values.confirmPassword,
                });
                alert(response.data.message);
                if (response.data.status === 200) {
                  alert("Password updated successfully.");
                  navigate('/login');
                } else {
                  alert("Failed to update password. Please try again.");
                }
              } catch (error) {
                console.error(error);
                setSubmitting(false);
                setErrors({
                  general: "An error occurred. Please try again.",
                });
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="otp">OTP</label>
                <br />
                <Field name="otp" type="text" disabled={disableOtpField} />
                <ErrorMessage name="otp" component="div" />
              </div>
              {otpValidated && (
                <>
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <br />
                    <Field name="newPassword" type="password" />
                    <ErrorMessage name="newPassword" component="div" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <br />
                    <Field name="confirmPassword" type="password" />
                    <ErrorMessage name="confirmPassword" component="div" />
                  </div>
                </>
              )}
              <br />
              <br />
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {otpValidated ? "Update Password" : "Verify OTP"}
              </button>
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

export default VerifyOtp;



