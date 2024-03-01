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
  Image,
  Input,
  List,
  Row,
  Space,
  Typography,
} from "antd";
import { Field, Form, Formik } from "formik";
import { MyInputCreateOrchid } from "../components/ui/Input";
import { GiFlowerEmblem } from "react-icons/gi";
import { useCreateComment } from "../hook/useCreateComments";
import MySpin from "../components/ui/MySpin";
interface UserData {
  user: {
    id: string;
    username: string;
    isAdmin: boolean;
    email: string;
  };
}

const DetaiLOrchid = () => {
  const { state, handleCreateComment } = useCreateComment();
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
    // await agent.Orchid.createNewComment(values);
    handleCreateComment(values);
  };
  const orchidComments = orchid.comments || []; // Default to an empty array if orchid.comments is undefined
  const data = orchidComments.map((comment, index) => ({
    title: comment.comment || "No Comment",
    description: comment.author || "Unknown Author",
  }));

  return (
    <div className="my-2 mx-10 border-[3px] py-5 px-5 rounded-2xl">
      <Row gutter={12}>
        <Col span={12}>
          <div className="w-[100%] h-[300px] lg:w-[100%] lg:h-[500px]">
            <img
              src={orchid.image}
              className="w-[100%] h-[100%] object-cover rounded-2xl"
            />
          </div>
        </Col>
        <Col span={12}>
          <Space direction="vertical">
            <Space.Compact>
              <Input
                className="bg-dark-blue text-white"
                style={{ width: "30%" }}
                defaultValue="Name: "
                size="large"
              />
              <Input style={{ width: "70%" }} defaultValue={orchid.name} />
            </Space.Compact>
            <Space.Compact>
              <Input
                className="bg-dark-blue text-white"
                style={{ width: "30%" }}
                defaultValue="Category: "
                size="large"
              />
              <Input
                style={{ width: "70%" }}
                defaultValue={orchid.category.name}
              />
            </Space.Compact>
            <Space.Compact>
              <Input
                className="bg-dark-blue text-white"
                style={{ width: "30%" }}
                defaultValue="Origination: "
                size="large"
              />
              <Input style={{ width: "70%" }} defaultValue={orchid.origin} />
            </Space.Compact>
            <Space.Compact>
              <Input
                className="bg-dark-blue text-white"
                style={{ width: "30%" }}
                defaultValue="Price: "
                size="large"
              />
              <Input style={{ width: "70%" }} defaultValue={orchid.price} />
            </Space.Compact>
            <Divider />
            <Space direction="vertical">
              {state.isFetching ? (
                <MySpin></MySpin>
              ) : (
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  <Form className="flex flex-row">
                    <Field
                      name="comment"
                      component={MyInputCreateOrchid}
                      prefix={<GiFlowerEmblem />}
                      placeholder={"Comment"}
                    />
                    <Field
                      name="rating"
                      component={MyInputCreateOrchid}
                      prefix={<GiFlowerEmblem />}
                      placeholder={"Rating"}
                    />
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
                </Formik>
              )}
              <Space>
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item, index) => (
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                        />
                      }
                      title={item.title}
                      description={item.description}
                    />
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
