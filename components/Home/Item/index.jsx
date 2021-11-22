import React, { useState } from "react";
import { Row, Col, Card, Space, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Formik, Field, Form, useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";

import styles from "./Item.module.scss";
import axios from "axios";
function Item(props) {
  const { formValueItem, formValueId, handleDelete, setIsChange } = props;
  const [isShowEdit, setIsShowEdit] = useState(false);

  //  Regex Phone Number
  const phoneRegExp = /((09|03|07|08|05)+([0-9]{8})\b)/g;

  const formValidation = Yup.object().shape({
    userName: Yup.string()
      .min(5, "Too Short!")
      .max(30, "Too Long!")
      .required("User Name is Required"),

    userPhoneNumber: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),

    userEmail: Yup.string()
      .email("Invalid email format")
      .required("User Email is Required"),

    userPassword: Yup.string()
      .min(8, "Password is too short")
      .max(12, "Password is too long")
      .required("User Name is Required"),
  });

  function renderFormView() {
    return (
      <Row>
        <Col span={8}>userName:</Col>
        <Col span={16}>{formValueItem?.userName}</Col>
        <Col span={8}>userEmail:</Col>
        <Col span={16}>{formValueItem?.userEmail}</Col>
        <Col span={8}>userPhoneNumber:</Col>
        <Col span={16}>{formValueItem?.userPhoneNumber}</Col>
      </Row>
    );
  }

  return (
    <Card size="small" style={{ marginBottom: "16px" }}>
      <div className={styles.item}>
        <Space>
          {isShowEdit ? (
            <>
              <Row
                justify="end"
                align="center"
                style={{ borderBottom: "1px solid #e7e7e7", width: "100%" }}
              >
                <Button onClick={() => setIsShowEdit(false)}>Cancel</Button>
              </Row>
            </>
          ) : (
            <>
              <Button type="primary" ghost onClick={() => setIsShowEdit(true)}>
                Edit
              </Button>
              <Popconfirm
                title={`Are you sure to delete ${formValueItem?.userName}?`}
                onConfirm={() => {
                  handleDelete(formValueItem.id), setIsChange(true);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
              ,
            </>
          )}
        </Space>
      </div>
      {isShowEdit ? (
        <Formik
          initialValues={{
            userName: formValueItem?.userName,
            userEmail: formValueItem?.userEmail,
            userPassword: formValueItem?.userPassword,
            userPhoneNumber: formValueItem?.userPhoneNumber,
          }}
          validationSchema={formValidation}
          onSubmit={(values) => {
            console.log("values: ", values);
            const id = parseInt(formValueId);
            const result = axios({
              method: "PATCH",
              url: `http://localhost:3001/form/${id}`,
              data: {
                userName: values.userName,
                userPhoneNumber: values.userPhoneNumber,
                userEmail: values.userEmail,
                userPassword: values.userPassword,
              },
            });
            setIsChange(true);
            setIsShowEdit(false);
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.form__item}>
              <label htmlFor="userName">User Name</label>
              <Field id="userName" name="userName" placeholder="" />
              {errors.userName && touched.userName ? (
                <div className={styles.form__item_error}>{errors.userName}</div>
              ) : null}

              <label htmlFor="userPhoneNumber">Phone Number</label>
              <Field id="userPhoneNumber" name="userPhoneNumber" />
              {errors.userPhoneNumber && touched.userPhoneNumber ? (
                <div className={styles.form__item_error}>
                  {errors.userPhoneNumber}
                </div>
              ) : null}

              <label htmlFor="userEmail">User Email</label>
              <Field id="userEmail" name="userEmail"  />
              {errors.userEmail && touched.userEmail ? (
                <div className={styles.form__item_error}>
                  {errors.userEmail}
                </div>
              ) : null}

              <label htmlFor="userPassword">Password</label>
              <Field id="userPassword" name="userPassword" type="password" />
              {errors.userPassword && touched.userPassword ? (
                <div className={styles.form__item_error}>
                  {errors.userPassword}
                </div>
              ) : null}

              <button type="submit">Confirm</button>
            </Form>
          )}
        </Formik>
      ) : (
        renderFormView()
      )}
    </Card>
  );
}
export default Item;
