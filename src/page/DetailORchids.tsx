import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useEffect, useState } from "react";
import { Orchid } from "./Orchid";
import { useDispatch } from "react-redux";
import agent, { CommentParam, CommentToOrchidParam } from "../utils/agents";
import ErrorPage from "./404";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Flex,
  Image,
  Input,
  List,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import { Field, Form, Formik } from "formik";
import { MyInputCreateOrchid } from "../components/ui/Input";
import { GiFlowerEmblem } from "react-icons/gi";
import { useCreateComment } from "../hook/useCreateComments";
import MySpin from "../components/ui/MySpin";
import UserHasCommented from "../components/UserCommented";
import renderRating from "../utils/renderStar";
import StarRating from "../components/ui/StarRating";
interface UserData {
  user: {
    id: string;
    username: string;
    isAdmin: boolean;
    email: string;
    avatar: string;
  };
}

const DetaiLOrchid = () => {
  const { state, handleCreateComment, userHasCommented } = useCreateComment();
  const userDataObject: UserData = JSON.parse(localStorage.getItem("user")!);
  const { slug } = useParams<{ slug: string }>();
  const { orchidAdaptersByPage, currentPage, orchidLoaded } = useAppSelector(
    (state) => state.orchid
  );
  const [orchid, setOrchid] = useState<Orchid>();
  const [error, setError] = useState<Boolean>(false);
  useEffect(() => {
    if (orchidAdaptersByPage[currentPage])
      setOrchid(
        orchidAdaptersByPage[currentPage].find((item) => item.slug === slug)
      );
    if (!orchidLoaded) {
      agent.Orchid.getOneOrchid(slug!)
        .then((response) => setOrchid(response))
        .catch((error) => {
          setError(error);
        });
    }
  }, [orchidLoaded]);

  if (error) return <ErrorPage />;
  if (!orchid) return <div></div>;
  // handle submit
  const initialValues = {
    slug: orchid.slug,
    author: userDataObject.user.id,
    comment: "",
    rating: 0,
  };

  const handleSubmit = async (values: CommentToOrchidParam) => {
    handleCreateComment(values);
  };
  const orchidComments = orchid.comments || []; // Default to an empty array if orchid.comments is undefined
  const data = orchidComments.map((comment, index) => ({
    title: comment.comment || "No Comment",
    children: comment.author,
    description: comment.rating || "Unknown Author",
    avatar:
      comment.author_img ||
      "https://i.pinimg.com/736x/f1/87/dc/f187dc8dfb3b57344b0e94efc4c967b5.jpg",
  }));

  return (
    <div className="my-2 py-3 rounded-2xl flex flex-col items-center">
      <Row
        gutter={24}
        className="flex flex-col  item-center  md:flex-row lg:flex-row xl:flex-row 2xl:flex-row "
      >
        <Col
          span={12}
          className="flex flex-col h-[500px] w-[300px]  lg:w-[600px]  lg:h-[500px]  xl:w-[600px]  xl:h-[500px] border-[1px]  gap-2 shadow-2xl rounded-2xl overflow-hidden"
        >
          <Space.Compact className="mt-2 ml-2">
            <Typography.Title style={{ width: "40%" }} level={3}>
              <span className="text-red-500">{orchid.name}</span>
            </Typography.Title>
          </Space.Compact>
          <div className="w-[100%] h-[100%] lg:w-[100%] lg:h-[300px]">
            <img
              src={orchid.image}
              className="w-[100%] h-[100%] object-cover rounded-2xl"
            />
          </div>
          <Space direction="vertical">
            <Space.Compact>
              <Typography.Title style={{ width: "40%" }} level={5}>
                <span className="text-red-500">*</span>Category :
              </Typography.Title>

              <Input
                style={{ width: "70%" }}
                defaultValue={orchid.category.name}
                disabled
              />
            </Space.Compact>
            <Space.Compact>
              <Typography.Title style={{ width: "40%" }} level={5}>
                <span className="text-red-500">*</span>Origin :
              </Typography.Title>

              <Input
                style={{ width: "60%" }}
                defaultValue={orchid.origin}
                disabled
              />
            </Space.Compact>
            <Space.Compact>
              <Typography.Title style={{ width: "40%" }} level={5}>
                <span className="text-red-500">*</span>Price :
              </Typography.Title>

              <Input
                style={{ width: "60%" }}
                defaultValue={`${orchid.price} $`}
                disabled
              />
            </Space.Compact>
          </Space>
        </Col>

        <Col span={12}>
          <Space direction="vertical">
            <Space
              direction="vertical"
              className="shadow-2xl border-[1px] border-gray-200  rounded-2xl py-2 px-2  scroll-m-0 w-[500px] h-[100%]"
            >
              <Typography.Title level={3}>
                Give Comment to Orchid
              </Typography.Title>
              {state.isFetching ? (
                <Flex align="center" gap="middle">
                  <Spin size="large" />
                </Flex>
              ) : (
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  {userHasCommented(orchidComments) ? (
                    <UserHasCommented />
                  ) : (
                    <Form className="flex flex-col items-center border-[1px] border-gray-200 rounded-lg w-[100%] px-2 h-[100%]">
                      <div className="flex flex-col items-center w-[100%] my-1 gap-2">
                        <Field
                          name="comment"
                          component={MyInputCreateOrchid}
                          prefix={<GiFlowerEmblem />}
                          placeholder={"Comment here if you want ......."}
                        />
                        {/* <Field
                          name="rating"
                          component={MyInputCreateOrchid}
                          prefix={<GiFlowerEmblem />}
                          placeholder={"Rating"}
                        /> */}
                        <Field
                        name="rating"
                        component={StarRating}
                        
                        />

                       
                      </div>

                      <Button
                        htmlType="submit"
                        className="bg-dark-blue border-none text-white
                          mt-3
                           "
                        size="large"
                      >
                        Commnent
                      </Button>
                    </Form>
                  )}
                </Formik>
              )}
              <Space className="border-[1px] border-gray-200 rounded-lg w-[100%] px-2 h-[100%]">
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item, index) => (
                    <div className="flex flex-row">
                      <List.Item.Meta
                        className="flex flex-row gap-3 items-center border-[1px] border-gray-100 rounded-lg w-[100%] pr-72 my-2 "
                        avatar={<Avatar size={50} src={item.avatar} />}
                        title={renderRating(Number(item.description))}
                        description={item.title}
                        children={item.children}
                        style={{width:"100%", height:"100%"}}
                        
                      />
                    </div>
                  )}
                />
              </Space>
            </Space>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default DetaiLOrchid;
