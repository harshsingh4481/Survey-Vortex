import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Contact.css';

const Contact = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    query: Yup.string().max(100, 'Query must be 100 characters or less').required('Query is required')
  });

  return (
    <div className="contact">
      <div className="form">
        <h1 className="text-center mb-5">Contact Form</h1>
        <Formik
          initialValues={{ name: '', email: '', phone: '', query: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            axios.post('http://localhost:3000/contact', values)
              .then(response => {
                alert(`THANK YOU ${values.name} Form submitted successfully`);
                
                actions.resetForm();
              })
              .catch(error => {
                console.error('There was an error submitting the form!', error);
              });
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field
                  name="name"
                  type="text"
                  className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="name" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  type="email"
                  className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <Field
                  name="phone"
                  type="tel"
                  className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="phone" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label htmlFor="query">Query</label>
                <Field
                  name="query"
                  as="textarea"
                  className={`form-control ${errors.query && touched.query ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="query" component="div" className="invalid-feedback" />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Contact;
