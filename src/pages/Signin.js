import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { signIn } from '../actions';

import Input from '../components/Shared/Input';

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const Signin = () => {
  const dispatch = useDispatch();

  const initialValues = { username: '', password: '' };

  const onSubmit = async (credentails, action) => {
    action.setSubmitting(true);
    await dispatch(signIn(credentails));
    // TODO: ERROR HANDLING VIA MIDDLEWARE
    // ERROR: CHANGE STATE AFTER COMPONENT UNMOUNTED
    // action.setSubmitting(false);
  };

  return (
    <div>
      <h3>Sign In</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({ isValid, isSubmitting, values, errors }) => (
          <Form className="ui form">
            <Input label="Username" type="text" id="username" name="username" />
            <Input
              label="Password"
              type="password"
              id="password"
              name="password"
            />

            <button
              className="ui submit button primary"
              type="submit"
              disabled={!isValid || isSubmitting}>
              Submit
            </button>

            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signin;
