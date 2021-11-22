import React, { useState } from "react";
import { Row, Col, Card, Space, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Formik, Field, Form, useFormik } from "formik";

import styles from "./Item.module.scss";
import axios from "axios";
function Item(props) {
  const { formValueItem, formValueId, handleDelete, setIsChange } = props;
  const [isShowEdit, setIsShowEdit] = useState(false);

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
    <Card size="small" style={{ marginTop: 16 }}>
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
          <Form className={styles.form__item}>
            <label htmlFor="userName">User Name</label>
            <Field id="userName" name="userName" placeholder="" />

            <label htmlFor="userPhoneNumber">Phone Number</label>
            <Field id="userPhoneNumber" name="userPhoneNumber" />

            <label htmlFor="userEmail">User Email</label>
            <Field id="userEmail" name="userEmail" />

            <label htmlFor="userPassword">Password</label>
            <Field id="userPassword" name="userPassword" type="password" />

            <button type="submit">Confirm</button>
          </Form>
        </Formik>
      ) : (
        renderFormView()
      )}
    </Card>
  );
}
export default Item;
