import React, { useEffect, useState } from "react";
import { useUserDetail } from "../hook/useUserDetail";
import { UIDParams } from "../utils/agents";
import ErrorPage from "./404";
import { Avatar, Button, Divider, Input, Space, Typography } from "antd";
import { Field, Formik, Form, FormikValues } from "formik";
import * as Yup from "yup";
import {
  MyInputCreateOrchid,
  MyInputPassword,
  MyInputUser,
  MyInputUserName,
} from "../components/ui/Input";
import { RxAvatar } from "react-icons/rx";
import { MdEmail, MdOutlineTransgender } from "react-icons/md";
import { FaPhoneSquareAlt } from "react-icons/fa";
import MySpin from "../components/ui/MySpin";
import { PASSWORD_FORM_ERRORS, PASSWORD_MESSAGES } from "../constants/password";
import { BsPass } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
interface UserData {
  user: {
    id: string;
    email: string;
  };
}
export interface MyFormValues {
  uid: string;
  new_password: string;
  current_password: string;
  confirm_password: string;
}
const validationSchema = Yup.object().shape({
  current_password: Yup.string()
    .min(6, PASSWORD_MESSAGES.MIN_LENGTH)
    .required(PASSWORD_FORM_ERRORS.REQUIRED),
  new_password: Yup.string()
    .min(6, PASSWORD_MESSAGES.MIN_LENGTH)
    .required(PASSWORD_FORM_ERRORS.REQUIRED),
  confirm_password: Yup.string()
    .min(6, PASSWORD_MESSAGES.MIN_LENGTH)
    .required(PASSWORD_FORM_ERRORS.REQUIRED),
});
const ChangePassword = () => {
  const userDataObject: UserData = JSON.parse(localStorage.getItem("user")!);
  const { state, getUserDetails, ChangePassword } = useUserDetail();
  const idSubject: UIDParams = { uid: userDataObject.user.id };
  useEffect(() => {
    const fetchData = () => {
      getUserDetails(idSubject);
    };
    fetchData();
  }, []);
  if (!state.currentUser) {
    return <ErrorPage />;
  }
  const initialValues: MyFormValues = {
    uid: userDataObject.user.id,
    new_password: "",
    current_password: "",
    confirm_password: "",
  };
 const navigate = useNavigate();
  const handleSubmit = async (values: MyFormValues) => {
    await ChangePassword(values, navigate);
  };
  return (
    <div className=" py-5  flex flex-wrap flex-col items-center shadow-2xl rounded-2xl">
      {state.isFetching ? (
        <MySpin
          description="Update user information..."
          message="Update"
          type="info"
          tip="Loading......."
        ></MySpin>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col items-center gap-6">
            <Avatar
              alt={state.currentUser.avatar}
              src={state.currentUser.avatar}
              size={150}
            />
            <Typography>{state.currentUser.email}</Typography>

            <div className="flex flex-row items-center gap-10">
              <Typography.Title level={5}>
                <span className="text-red-600">*</span>Current Password:{" "}
              </Typography.Title>
              <Field
                name="current_password"
                component={MyInputPassword}
                placeholder={"Current Password"}
                prefix={<BsPass />}
              />
            </div>
            <div className="flex flex-row items-center gap-10">
              <Typography.Title level={5}>
                <span className="text-red-600">*</span>New xyz Password{" "}
              </Typography.Title>
              <Field
                name="new_password"
                component={MyInputPassword}
                placeholder={"New Password "}
                prefix={<BsPass />}
              />
            </div>
            <div className="flex flex-row items-center gap-10">
              <Typography.Title level={5}>
                <span className="text-red-600">*</span>Confirm Password{" "}
              </Typography.Title>
              <Field
                style={{ width: "60%" }}
                name="confirm_password"
                component={MyInputPassword}
                placeholder={"Confirm Password"}
                prefix={<FaPhoneSquareAlt />}
              />
            </div>

            <div className="flex flex-row items-center gap-5">
              <Button
                htmlType="submit"
                className="bg-purple border-none text-white
   hover:text-pretty
   "
                size="large"
              >
                Change password
              </Button>
              {/* {state.error && (
                    <article className="text-red-500">
                      {state.displayError}
                    </article>
                  )} */}
            </div>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default ChangePassword;
