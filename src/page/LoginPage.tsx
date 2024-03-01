import { Button, Image, Input, Space, Typography } from "antd";
import React, { useEffect } from "react";
import { FaFacebook, FaGithub, FaUser } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import styles from "./css/LoginPage.module.css";
import { SiHandlebarsdotjs } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Field, Formik ,Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "../hook/useAuth";
import { ILoginParams } from "../constants/data";
import { MyInput, MyInputPassword } from "../components/ui/Input";
export const ErrorMessage = {
  email: {
    invalid: "Invalid email address",
    required: "Email is required",
  },
  password: {
    length: "Password must be at least 6 characters",
    required: "Password is required",
  },
};
const LoginPage: React.FC = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const validate = ErrorMessage;
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(validate.email.invalid)
      .required(validate.email.required),
    password: Yup.string()
      .min(6, validate.password.length)
      .required(validate.password.required),
  });
  const navigate = useNavigate();
  const { state, handleLogin } = useAuth();

  const handleSubmit = async (values: ILoginParams) => {
    handleLogin(values, navigate);
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
      overflow-hidden w-[768px] max-w-[100%] min-h-[480px] h-[65%] mx-5 "
  
      >
        <div
          className=" w-full h-full flex flex-col flex-1  hidden md:block">
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
              Login
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="flex flex-col gap-3 mb-[10px] justify-center items-center">
                <Space direction="vertical">
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
                  <Button
                    className="bg-purple border-none text-white hover:text-pretty "
                    htmlType="submit"
                    size="large"
                    loading={state.isFetching}
                  >
                    Login
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
              You don't have account?
              <Link to="/register">Register Now</Link>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
