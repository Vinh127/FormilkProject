import React, { useState } from "react";
import axios from "axios";
import { Formik, Field, Form, useFormik, ErrorMessage } from "formik";
import { Button, Card, Space } from "antd";
import * as Yup from "yup";

import styles from "./Home.module.scss";
import Item from "./Item/index";

function HomePage({ formValue }) {
  const [isChange, setIsChange] = useState(false);

  //  Regex Phone Number
  const phoneRegExp =  /((09|03|07|08|05)+([0-9]{8})\b)/g;

  const formValidation = Yup.object().shape({
    userName: Yup.string()
      .min(5, "Too Short!")
      .max(30, "Too Long!")
      .required("User Name is Required"),

    userPhoneNumber: Yup.string()
      .matches(phoneRegExp,"Phone number is not valid")
      .required("Phone number is required"),

    userEmail: Yup.string()
      .email("Invalid email format")
      .required("User Email is Required"),

    userPassword: Yup.string()
      .min(8, "Password is too short")
      .max(12, "Password is too long")
      .required("User Name is Required"),
  });

  function handleDelete(id) {
    const result = axios({
      method: "DELETE",
      url: `http://localhost:3001/form/${id}`,
    });
    setIsChange(!isChange);
  }

  function renderFormValue() {
    return formValue.map((formValueItem, formValueIndex) => {
      return (
        <Item
          key={formValueIndex}
          formValueItem={formValueItem}
          formValueId={formValueItem.id}
          handleDelete={handleDelete}
          setIsChange={setIsChange}
        />
      );
    });
  }

  return (
    <div className={styles.form}>
      <div className={styles.form__content}>
        <div className={styles.form__left}>
          <Formik
            initialValues={{
              userName: "",
              userEmail: "",
              userPassword: "",
              userPhoneNumber: "",
            }}
            validationSchema={formValidation}
            onSubmit={async (values) => {
              const result = axios({
                method: "POST",
                url: "http://localhost:3001/form",
                data: {
                  userName: values.userName,
                  userEmail: values.userEmail,
                  userPassword: values.userPassword,
                  userPhoneNumber: values.userPhoneNumber,
                },
              });
              setIsChange(true);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className={styles.form__left_background_content}>
                  <label htmlFor="userName">User Name</label>
                  <Field name="userName" placeholder="Fill your name" />
                  {errors.userName && touched.userName ? (
                    <div className={styles.item__error}>{errors.userName}</div>
                  ) : null}
                  {/* <ErrorMessage name="userName" /> */}
                </div>

                <div className={styles.form__left_background_content}>
                  <label htmlFor="userPhoneNumber">Phone Number</label>
                  <Field
                    name="userPhoneNumber"
                    type="text"
                    placeholder="Fill your phone number"
                  />
                  {errors.userPhoneNumber && touched.userPhoneNumber ? (
                    <div className={styles.item__error}>
                      {errors.userPhoneNumber}
                    </div>
                  ) : null}
                  {/* <ErrorMessage name="userPhoneNumber" /> */}
                </div>

                <div className={styles.form__left_background_content}>
                  <label htmlFor="userEmail">User Email</label>
                  <Field
                    id="userEmail"
                    name="userEmail"
                    type="email"
                    placeholder="Fill your email"
                  />

                  {errors.userEmail && touched.userEmail ? (
                    <div className={styles.item__error}>{errors.userEmail}</div>
                  ) : null}
                  {/* <ErrorMessage name="userEmail" /> */}
                </div>

                <div className={styles.form__left_background_content}>
                  <label htmlFor="userPassword">Password</label>
                  <Field
                    id="userPassword"
                    name="userPassword"
                    type="password"
                    placeholder="Fill your password"
                  />
                  {errors.userPassword && touched.userPassword ? (
                    <div className={styles.item__error}>
                      {errors.userPassword}
                    </div>
                  ) : null}

                  {/* <ErrorMessage name="userPassword" /> */}
                </div>

                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </div>

        <div className={styles.form__right}>
          <div className={styles.form_right_list}></div>
          {renderFormValue()}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
