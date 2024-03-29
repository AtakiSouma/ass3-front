import React, { useEffect, useState } from "react";
import { useUserDetail } from "../hook/useUserDetail";
import { UIDParams } from "../utils/agents";
import ErrorPage from "./404";
import { Avatar, Button, Divider, Input, Space, Typography } from "antd";
import { Field, Formik, Form, FormikValues } from "formik";
import {
  MyInputCreateOrchid,
  MyInputUser,
  MyInputUserName,
} from "../components/ui/Input";
import { RxAvatar } from "react-icons/rx";
import { MdEmail, MdOutlineTransgender } from "react-icons/md";
import { FaPhoneSquareAlt } from "react-icons/fa";
import MySpin from "../components/ui/MySpin";
import { Link } from "react-router-dom";
interface UserData {
  user: {
    id: string;
    email: string;
  };
}
export interface MyFormValues {
  uid: string;
  username: string;
  avatar: string;
  phoneNumber: string;
  gender: string;
}
const UpdateProfile = () => {

  const userDataObject: UserData = JSON.parse(localStorage.getItem("user")!);
  const { state, getUserDetails, updateUserDetail } = useUserDetail();
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
    username: state.currentUser.username,
    avatar: state.currentUser.avatar,
    phoneNumber: state.currentUser.phoneNumber,
    gender: state.currentUser.gender,
  };

  const handleSubmit = async (values: MyFormValues) => {
    const updatedUserInfo = { ...state.currentUser, ...values };
    await updateUserDetail(updatedUserInfo!);
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
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="flex flex-col items-center gap-6">
            <Avatar
              alt={state.currentUser.avatar}
              src={state.currentUser.avatar}
              size={150}
            />
            <Typography>{state.currentUser.email}</Typography>

            <div className="flex flex-row items-center gap-10">
              <Typography.Title level={5}>
                <span className="text-red-600">*</span>Avatar:{" "}
              </Typography.Title>
              <Field
                defaultValue={state.currentUser.avatar}
                name="avatar"
                component={MyInputUser}
                placeholder={"Avatar"}
                prefix={<RxAvatar />}
              />
            </div>
            <div className="flex flex-row items-center gap-2">
              <Typography.Title level={5}>
                <span className="text-red-600">*</span>User Name:{" "}
              </Typography.Title>
              <Field
                defaultValue={state.currentUser.username}
                name="username"
                component={MyInputUser}
                placeholder={"Username"}
                prefix={<RxAvatar />}
              />
            </div>
            <div className="flex flex-row items-center gap-10">
              <Typography.Title level={5}>
                <span className="text-red-600">*</span>Phone{" "}
              </Typography.Title>
              <Field
                style={{ width: "60%" }}
                defaultValue={state.currentUser.phoneNumber}
                name="phoneNumber"
                component={MyInputUser}
                placeholder={"PhoneNumber"}
                prefix={<FaPhoneSquareAlt />}
              />
            </div>

            <div className="flex flex-row items-center gap-10">
              <Typography.Title level={5}>
                <span className="text-red-600">*</span>Gender{" "}
              </Typography.Title>
              <Field
                defaultValue={state.currentUser.gender}
                name="gender"
                component={MyInputUser}
                placeholder={"PhoneNumber"}
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
                Update Info
              </Button>
              <Divider type="vertical" />
              <Link to="/users/change-password">
              <Button
                className="bg-purple border-none text-white
   hover:text-pretty
   "
                size="large"
              >
                Change password
              </Button>
              </Link>
              
            </div>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default UpdateProfile;
