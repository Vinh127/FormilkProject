import * as Yup from "yup";

const createFormValidate = Yup.object().shape({
    userName: Yup.string()
    .min(5, "Too Short!")
    .max(30, "Too Long!")
    .required("The Field is Required"),

  userEmail: Yup.string()
    .email("Invalid Email")
    .required("The Field is RequiredF"),

  userPassword: Yup.string().required("The Field is Required"),

  userPhoneNumber: Yup.number().required("The field is Required"),
})

export default createFormValidate;