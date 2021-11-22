import React, { useState } from "react";
import axios from "axios";
import { Formik, Field, Form, useFormik, ErrorMessage } from "formik";
import { Button, notification, Space } from "antd";
import formValidation from "../../validations/validate";

import * as Yup from "yup";

import styles from "./Home.module.scss";
import Item from "./Item/index";

function HomePage({ formValue, setData }) {
  const [isChange, setIsChange] = useState({});
  console.log("isChange: ", isChange);

  function openNotificationError(type) {
    notification[type]({
      message: "Thất Bại",
      description: "Thao tác thực hiện thất bại",
    });
  }

  async function handleDelete(id) {
    try {
      // const newFormValue = formValue;
      // const formValueIndex = newFormValue.findIndex((item) => {
      //   return item.id === id;
      // });
      // newFormValue.splice(formValueIndex, 1);
      // const result = await axios({
      //   method: "PATCH",
      //   url: `http://localhost:3001/form/${id}`,
      //   data: {
      //     newFormValue: newFormValue,
      //   },
      // });
      // setData([...newFormValue]);
      // let newData = newFormValue.filter((v) => v.id === id);

      const result = await axios({
        method: "DELETE",
        url: `http://localhost:3001/form/${id}`,
      });
    } catch (e) {
      openNotificationError("error");
    }
  }

  function renderFormValue() {
    return formValue.map((formValueItem, formValueIndex) => {
      return (
        <Item
          key={formValueIndex}
          formValueItem={formValueItem}
          formValueId={formValueItem.id}
          handleDelete={handleDelete}
        />
      );
    });
  }

  async function onSubmit(values, { resetForm }) {
    console.log("values: ", values);
    const result = await axios({
      method: "POST",
      url: "http://localhost:3001/form",
      data: {
        userName: values.userName,
        userEmail: values.userEmail,
        userPassword: values.userPassword,
        userPhoneNumber: values.userPhoneNumber,
      },
    });

    resetForm({ values: "" });

    // await setIsChange({...values});
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
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className={styles.form__left_background_content}>
                  <label htmlFor="userName">User Name</label>
                  <Field name="userName" placeholder="Fill your name" />
                  {errors.userName && touched.userName ? (
                    <div className={styles.item__error}>{errors.userName}</div>
                  ) : // <ErrorMessage
                  //   className={styles.item__error}
                  //   name="userName"
                  // />
                  null}
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
                  ) : // <ErrorMessage
                  //   className={styles.item__error}
                  //   name="userPhoneNumber"
                  // />
                  null}
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
                  ) : // <ErrorMessage
                  //   className={styles.item__error}
                  //   name="userEmail"
                  // />
                  null}
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
                  ) : // <ErrorMessage
                  //   className={styles.item__error}
                  //   name="userPassword"
                  // />
                  null}
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
