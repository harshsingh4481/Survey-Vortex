import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChandeUserPassword = ({useremail, show, handleClose }) => {
  const validationSchema = Yup.object({
    old_password: Yup.string().required('Old password is required'),
    new_password: Yup.string().required('New password is required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post('http://localhost:3000/users/changepassword', {
        email: useremail, 
        old_password: values.old_password,
        new_password: values.new_password,
        confirm_password: values.confirm_password,
      });

      alert(response.data.message);
      actions.setSubmitting(false);

      if (response.data.status === 200) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
      actions.setSubmitting(false);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ old_password: '', new_password: '', confirm_password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="old_password">Old Password</label>
                <Field name="old_password" type="password" className="form-control" />
                <ErrorMessage name="old_password" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="new_password">New Password</label>
                <Field name="new_password" type="password" className="form-control" />
                <ErrorMessage name="new_password" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="confirm_password">Confirm Password</label>
                <Field name="confirm_password" type="password" className="form-control" />
                <ErrorMessage name="confirm_password" component="div" className="text-danger" />
              </div>

              <Button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>
                Change Password
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ChandeUserPassword;
