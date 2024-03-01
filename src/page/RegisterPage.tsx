import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Image, Input, Space, Typography } from "antd";
import React from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessageRegister } from "../constants/ErrorMessage";
import * as Yup from "yup";
import { useRegister } from "../hook/useRegister";
import { Formik, Form, Field } from "formik";
import { IRegisterParams } from "../constants/data";
import {
  MyInput,
  MyInputPassword,
  MyInputUserName,
} from "../components/ui/Input";

const RegisterPage: React.FC = () => {
  const initialValues = {
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  };
  const validate = ErrorMessageRegister;
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(validate.email.invalid)
      .required(validate.email.required),
    username: Yup.string()
      .min(6, validate.username.invalid)
      .required(validate.username.required),
    password: Yup.string()
      .min(6, validate.password.length)
      .required(validate.password.required),
    confirmPassword: Yup.string()
      .min(6, validate.confirmPassword.length)
      .required(validate.confirmPassword.required),
  });
  const navigate = useNavigate();
  const { state, handleRegister } = useRegister();
  const handleSubmit = async (values: IRegisterParams) => {
    handleRegister(values, navigate);
  };

  return (
    <div
      className="bg-purple 
   bg-gradient-to-r
   flex
   from-[#e2e2e2] to-[#6785e8]
   items-center
   justify-center
    h-[100vh]
    w-full
   "
    >
      <div
        className="flex relative shadow-md rounded-3xl  drop-shadow-2xl
        overflow-hidden w-[768px] max-w-[100%] min-h-[480px] h-[65%] "
      >
        <div
          className=" w-full h-full flex flex-col flex-1 

hidden md:block mx-5 
        "
        >
          <Image
            width={384}
            className="object-contain h-screen "
            src="https://mfiles.alphacoders.com/100/1009215.png"
          />
        </div>
        <div
          className="
          drop-shadow-lg z-10 mt-10
          flex flex-col items-center justify-center
          flex-1
        "
        >
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-[800] text-5xl text-[#ffffff] mb-[20px]">
              Register
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="flex flex-col gap-3 mb-[10px] justify-center items-center">
                <Space direction="vertical">
                  <Field
                    name="username"
                    component={MyInputUserName}
                    placeholder={"Username"}
                  />
                  <Field
                    name="email"
                    component={MyInput}
                    placeholder={"Email"}
                  />

                  <Field
                    component={MyInputPassword}
                    placeholder={"Password"}
                    name="password"
                  />
                  <Field
                    component={MyInputPassword}
                    placeholder={"Password"}
                    name="confirmPassword"
                  />
                  <Button
                    loading={state.isFetching}
                    htmlType="submit"
                    className="bg-purple border-none text-white
              hover:text-pretty
              "
                    size="large"
                  >
                    Register
                  </Button>
                  {state.error && (
                    <article className="text-red-500">
                      {state.displayError}
                    </article>
                  )}
                </Space>
              </Form>
            </Formik>

            <Typography>
              You already have account?
              <Link to="/login">Login Now</Link>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
