import React, { useState } from "react";
import axios from "axios";
import { Formik, Field, Form, useFormik } from "formik";
import { Button, Card, Space } from "antd";

import styles from "./Home.module.scss";
import Item from "./Item/index";

function HomePage({ formValue }) {
  const [isChange, setIsChange] = useState(false);

  function handleDelete(id) {
    setIsChange(!isChange);
    const result = axios({
      method: "DELETE",
      url: `http://localhost:3001/form/${id}`,
    });
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
      <div className={styles.form__left}>
        <Formik
          initialValues={{
            userName: "",
            userEmail: "",
            userPassword: "",
            userPhoneNumber: "",
          }}
          onSubmit={async (values) => {
            console.log("values: ", values);
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
          <Form className={styles.form__left_background}>
            <h2 className={styles.form__left_background_title}>Your Info</h2>
            <div className={styles.form__left_background_content}>
              <label htmlFor="userName">User Name</label>
              <Field
                id="userName"
                name="userName"
                placeholder="Fill your name"
              />
            </div>

            <div className={styles.form__left_background_content}>
              <label htmlFor="userPhoneNumber">Phone Number</label>
              <Field
                id="userPhoneNumber"
                name="userPhoneNumber"
                placeholder="Fill your phonenumber"
              />
            </div>

            <div className={styles.form__left_background_content}>
              <label htmlFor="userEmail">User Email</label>
              <Field
                id="userEmail"
                name="userEmail"
                placeholder="Fill your email"
              />
            </div>

            <div className={styles.form__left_background_content}>
              <label htmlFor="userPassword">Password</label>
              <Field
                id="userPassword"
                name="userPassword"
                type="password"
                placeholder="Fill your password"
              />
            </div>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>

      <div className={styles.form__right}>
        <div className={styles.form_right_list}></div>
        {renderFormValue()}
      </div>
    </div>
  );
}

export default HomePage;
