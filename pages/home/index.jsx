import React, { useState } from "react";
import { Formik } from "formik";
import axios from "axios";

import HomePage from "../../components/Home";

function HomeIndex({ formValue }) {
  const [data, setData] = useState(formValue);
  return <HomePage formValue={data} setData={setData} />;
}

export const getStaticProps = async () => {
  try {
    const res = await axios.get("http://localhost:3001/form");
    const data = res.data;
    return {
      props: {
        formValue: data,
      },
    };
  } catch (error) {
    return { error };
  }
};

export default HomeIndex;
