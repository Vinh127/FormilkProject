import React, { useState } from "react";
import axios from "axios";
import { Formik, Field, Form, useFormik } from "formik";
import { Button } from "antd";

import styles from "./Home.module.scss";

function HomePage({ formValue }) {
  const formik = useFormik({
    initialValues: {
      userName: "",
      userEmail: "",
      userPassword: "",
      userPhoneNumber: "",
    },

    onSubmit: (values) => {
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
      console.log("result: ", result);
    },
  });

  function handleEdit(id) {
    const newFormValue = formValue;
    
  }

  function handleDelete(id) {
    const newFormValue = formValue;

    console.log("id in Delete: ",id);

    const formValueIndex = newFormValue.findIndex((item) => {
      return item.id === id;
    });

    newFormValue.splice(formValueIndex, 1);
    
    const result = axios({
      method: "DELETE",
      url: `http://localhost:3001/form/${id}`,
    });
  }

  function renderFormValue() {
    return formValue.map((formValueItem, formValueIndex) => {
      return (
        <div className={styles.form__right_list_item}>
          <div className={styles.form__right_list_item_top}>
            <Button onClick={() => handleEdit(formValueItem.id)}>Edit</Button>
            <Button danger onClick={() => handleDelete(formValueItem.id)}>
              Delete
            </Button>
          </div>
          <div className={styles.form__right_list_item_under}>
            <div className={styles.form__right_list_item_under_value}>
              {formValueItem?.userName}
            </div>
            <div className={styles.form__right_list_item_under_value}>
              {formValueItem?.userEmail}
            </div>
            <div className={styles.form__right_list_item_under_value}>
              {formValueItem?.userPhoneNumber}
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className={styles.form}>
      <div className={styles.form__left}>
        <Formik
          onSubmit={formik.handleSubmit}
          initialValues={{
            userName: "",
            userEmail: "",
            userPassword: "",
            userPhoneNumber: "",
          }}
        >
          <Form className={styles.form__left_background}>
            <h2 className={styles.form__left_background_title}>Your Info</h2>
            <div className={styles.form__left_background_content}>
              <label htmlFor="userName">User Name</label>
              <Field
                id="userName"
                name="userName"
                placeholder="Fill your username"
                onChange={formik.handleChange}
                value={formik.values.userName}
              />
            </div>

            <div className={styles.form__left_background_content}>
              <label htmlFor="userPhoneNumber">User Phone Number</label>
              <Field
                id="userPhoneNumber"
                name="userPhoneNumber"
                placeholder="Fill your phonenumber"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.userPhoneNumber}
              />
            </div>

            <div className={styles.form__left_background_content}>
              <label htmlFor="userEmail">Email</label>
              <Field
                id="userEmail"
                name="userEmail"
                placeholder="Fill your email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.userEmail}
              />
            </div>

            <div className={styles.form__left_background_content}>
              <label htmlFor="userPassword">Password</label>
              <Field
                id="userPassword"
                name="userPassword"
                placeholder="Fill your password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.userPassword}
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
