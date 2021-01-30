import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import Api from '../lib/services/api';
import { CONTACT, HOME } from '../lib/config/URLs';
import { AuthUserContext } from '../contexts/AuthUserContext';
import { Badge, Button, Input, Textarea } from '@windmill/react-ui';
import { Loading } from '../components/UI/';

const Contact = () => {
  const { state } = useContext(AuthUserContext);
  const [response, setResponse] = useState({
    success: false,
    message: null,
  });

  const initialValues = {
    name: state.user.name,
    email: state.user.email,
    subject: null,
    message: null,
  };

  const Formik = useFormik({
    initialValues,
    onSubmit: async (values, submitProps) => {
      const api = new Api({
        url: CONTACT,
        method: 'post',
        data: values,
        submitProps,
        setResponse,
      });
      try {
        await api.fetch();
      } catch (e) {
        api.abort();
        console.log(e);
      }
    },
  });

  return (
    <div>
      {state.user.email !== null ? (
        <>
          <h2>Contact</h2>
          <p>
            Message the admins for any concern, information revision, and/or
            suggestions.
          </p>
          <p>User details will be sent along with the request.</p>
          {!Formik.isSubmitting ? (
            <>
              {response.message === null ? (
                <form onSubmit={Formik.handleSubmit}>
                  <Input
                    placeholder="Subject"
                    onChange={Formik.handleChange}
                    name="subject"
                    className="my-2"
                  />
                  <Textarea
                    className="mt-2"
                    rows="3"
                    placeholder={'You message here'}
                    onChange={Formik.handleChange}
                    name="message"
                  />
                  <Button type="submit" className="mt-4">
                    Submit
                  </Button>
                </form>
              ) : (
                <Badge
                  type={response.success ? 'success' : 'danger'}
                  className="mt-4"
                >
                  {`${response.message}`}
                </Badge>
              )}
              <div className="my-10">
                <div className="block">
                  {' '}
                  <a
                    className="text-sm text-blue-500 hover:underline"
                    href={`${HOME}/terms`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Terms and Conditions
                  </a>
                </div>
                <div className="block">
                  <a
                    className="text-sm text-blue-500 hover:underline"
                    href={`${HOME}/privacy`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Data Privacy Policy
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="pt-10">
              <Loading inline={true} />
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Contact;
