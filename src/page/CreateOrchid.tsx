import { Formik, Form, Field, useField, FormikConsumer } from "formik";
import React, { useEffect, useState } from "react";
import { ErrorMessageCreateOrchid } from "../constants/ErrorMessage";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useCreateOrchid } from "../hook/useCreateORchid";
import { ICreateOrchidParams } from "../constants/data";
import {
  CheckBoxMyInput,
  MyFileInput,
  MyInput,
  MyInputCreateOrchid,
  MySelectCreateOrchid,
  myInputHidden,
} from "../components/ui/Input";
import { GiFlowers } from "react-icons/gi";
import {
  Button,
  GetProp,
  Space,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
import Title from "antd/es/typography/Title";
import { IoImage } from "react-icons/io5";
import { FaImage } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { MdEmojiNature, MdOutlinePriceChange } from "react-icons/md";
import { SiUblockorigin } from "react-icons/si";
import { FcRating } from "react-icons/fc";
import agent, { OrchidParamCreation } from "../utils/agents";
import ImgCrop from "antd-img-crop";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import baseApi from "../utils/baseApi";
import apiJWT from "../utils/api";
import Dragger from "antd/es/upload/Dragger";
import { Orchid } from "./Orchid";

const CreateOrchid = () => {
  const validate = ErrorMessageCreateOrchid;
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(validate.name.required)
      .min(5, validate.name.invalid),
    category: Yup.string().required(validate.category.required),
    origin: Yup.string().required(validate.origin.required),
    price: Yup.number()
      .min(1, validate.price.required)
      .required(validate.price.required),
    rating: Yup.number()
      .required(validate.rating.required)
      .min(1, validate.rating.invalid),
  });
  const navigate = useNavigate();
  const { state, handleCreateOrchid } = useCreateOrchid();

  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await agent.Category.getAllCategoryWithPaging();
        const categoryOptions = response.map((category: any) => ({
          value: category._id,
          label: category.name,
        }));
        setCategory(categoryOptions);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchData();
  }, []);
  console.log("category: ", category);

  // handle upload  file
  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileUrlV2, setFileUrlV2] = useState<string>("");

  // end handle upload file
  const props: UploadProps = {
    name: "file",
    multiple: false,
    beforeUpload: (file) => {
      const acceptedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
      const isAccepted = acceptedFileTypes.includes(file.type);

      if (!isAccepted) {
        message.error(
          "File không được chấp nhận. Vui lòng tải lên một tệp JPG, JPEG hoặc PNG."
        );
      }

      return isAccepted ? true : Upload.LIST_IGNORE;
    },
    customRequest: ({ file, onSuccess, onError }) => {
      if (file instanceof File) {
        if (file.type.startsWith("image/")) {
          // Handle image file upload
          const formData = new FormData();
          formData.append("file", file);

          apiJWT
            .post("/api/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              // Assuming the response has a 'fileUrl' property
              const fileUrla = response.data.fileUrl;

              setFileUrl(fileUrla);

              if (onSuccess) {
                onSuccess("ok");
              }
            })
            .catch((error) => {
              console.error("Image upload failed:", error);
              if (onError) {
                onError(new Error("Image upload failed."));
              }
            });
        } else {
          if (onError) {
            onError(new Error("Invalid file format. Please upload an image."));
          }
        }
      } else {
        console.error("File is not an instance of File");
        if (onError) {
          onError(new Error("Invalid file."));
        }
      }
    },
  };
  const propsV2: UploadProps = {
    name: "file",
    multiple: false,
    beforeUpload: (file) => {
      const acceptedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
      const isAccepted = acceptedFileTypes.includes(file.type);

      if (!isAccepted) {
        message.error(
          "File không được chấp nhận. Vui lòng tải lên một tệp JPG, JPEG hoặc PNG."
        );
      }

      return isAccepted ? true : Upload.LIST_IGNORE;
    },
    customRequest: ({ file, onSuccess, onError }) => {
      if (file instanceof File) {
        if (file.type.startsWith("image/")) {
          // Handle image file upload
          const formData = new FormData();
          formData.append("file", file);

          apiJWT
            .post("/api/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              // Assuming the response has a 'fileUrl' property
              const fileUrla = response.data.fileUrl;

              setFileUrlV2(fileUrla);

              if (onSuccess) {
                onSuccess("ok");
              }
            })
            .catch((error) => {
              console.error("Image upload failed:", error);
              if (onError) {
                onError(new Error("Image upload failed."));
              }
            });
        } else {
          if (onError) {
            onError(new Error("Invalid file format. Please upload an image."));
          }
        }
      } else {
        console.error("File is not an instance of File");
        if (onError) {
          onError(new Error("Invalid file."));
        }
      }
    },
  };
  const initialValues = {
    name: "",
    category: "",
    background:fileUrlV2,
    image: fileUrl,
    isNatural: true,
    origin: "",
    price: 0,
    rating: 0,
  };
  const handleSubmit = async (values: OrchidParamCreation) => {
    console.log("Form Values:", values);
    const updatedValues = {
      ...values,
      image: fileUrl,
      background: fileUrlV2,
    };
    handleCreateOrchid(updatedValues, navigate);
  };

  console.log("inintvalue to FOrm", initialValues);

  return (
    <div className="py-5 border-[2px] border-blue-900 flex flex-wrap flex-col items-center shadow-2xl rounded-2xl">
      <Title level={2}>Create Orchid</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Space direction="vertical">
            <div className="flex xl:flex-row lg:flex-row flex-col gap-10">
              <div className="flex flex-col ">
                <div>
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload Images</Button>
                  </Upload>
                  <div className="py-1 px-1 w-[500px] h-[300px] rounded-lg border-[3px] border-blue-900">
                    <img
                      src= { fileUrl || "https://assetsio.reedpopcdn.com/Honkai-Star-Rail-Sparkle-materials%2C-kit%2C-and-Eidolons-cover.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp"}
                      className="w-[100%] h-[100%] object-cover"
                    />
                  </div>
                </div>
                <div>
                  <Upload {...propsV2}>
                    <Button icon={<UploadOutlined />}>Upload BackGround</Button>
                  </Upload>

                  <div className="py-1 px-1 w-[500px] h-[300px] rounded-lg border-[3px] border-blue-900">
                    <img
                      src={fileUrlV2 || "https://assetsio.reedpopcdn.com/Honkai-Star-Rail-Sparkle-materials%2C-kit%2C-and-Eidolons-cover.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp"}
                      className="w-[100%] h-[100%] object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div>
                  <Typography.Title level={5}>
                    {" "}
                    * Name of Orchid
                  </Typography.Title>
                  <Field
                    name="name"
                    component={MyInputCreateOrchid}
                    prefix={<GiFlowers />}
                    placeholder={"Name of Orchids"}
                  />
                </div>
                <div>
                  <Field
                    name="image"
                    value={fileUrl}
                    component={myInputHidden}
                  />
                </div>
                <div>
                  <Field
                    name="background"
                    value={fileUrlV2}
                    component={myInputHidden}
                  />
                </div>
                <div>
                  <Typography.Title level={5}> * Category</Typography.Title>
                  <Field
                    name="category"
                    component={MySelectCreateOrchid}
                    prefix={<BiCategory />}
                    placeholder={" Select Category"}
                    options={category}
                  />
                </div>

                <div>
                  <Typography.Title level={5}> *Origin</Typography.Title>
                  <Field
                    name="origin"
                    component={MyInputCreateOrchid}
                    prefix={<SiUblockorigin />}
                    placeholder={"isNatural"}
                  />
                </div>

                <div>
                  <Typography.Title level={5}> *Price</Typography.Title>
                  <Field
                    name="price"
                    component={MyInputCreateOrchid}
                    prefix={<MdOutlinePriceChange />}
                    placeholder={"price"}
                  />
                </div>

                <div>
                  <Typography.Title level={5}> *Rating</Typography.Title>
                  <Field
                    name="rating"
                    component={MySelectCreateOrchid}
                    prefix={<FcRating />}
                    placeholder={"price"}
                    options={[
                      { value: "1", label: "1 Star" },
                      { value: "2", label: "2 Star" },
                      { value: "3", label: "3 Star" },
                      { value: "4", label: "4 Star" },
                      { value: "5", label: "5 Star" },
                    ]}
                  />
                </div>
                <div>
                  <Field
                    name="isNatural"
                    label="Is Natural"
                    component={CheckBoxMyInput}
                  />
                </div>
              </div>
            </div>

            <Button
              loading={state.isFetching}
              htmlType="submit"
              className="bg-purple border-none text-white
              hover:text-pretty mt-3
              "
              size="large"
            >
              Submit
            </Button>
          </Space>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateOrchid;
