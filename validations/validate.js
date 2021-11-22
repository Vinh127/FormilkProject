import * as Yup from "yup";


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


export default formValidation;