import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";

import * as Yup from "yup";

const validationSchema =
  Yup.object({
    name: Yup.string()
      .required(
        "Name is required"
      ),

    email: Yup.string()
      .email(
        "Invalid email address"
      )
      .required(
        "Email is required"
      ),

    message: Yup.string()
      .min(
        10,
        "Message must contain at least 10 characters"
      )
      .required(
        "Message is required"
      ),
  });

const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Contact Us
      </h1>

      <Formik
        initialValues={{
          name: "",
          email: "",
          message: "",
        }}
        validationSchema={
          validationSchema
        }
        onSubmit={(
          values,
          {
            resetForm,
          }
        ) => {
          console.log(
            "Contact form:",
            values
          );

          alert(
            "Message submitted successfully!"
          );

          resetForm();
        }}
      >
        <Form className="space-y-5">
          <div>
            <label>
              Name
            </label>

            <Field
              name="name"
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />

            <ErrorMessage
              name="name"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label>
              Email
            </label>

            <Field
              name="email"
              type="email"
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />

            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label>
              Message
            </label>

            <Field
              as="textarea"
              name="message"
              rows="5"
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />

            <ErrorMessage
              name="message"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Send Message
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Contact;