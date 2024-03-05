import { useEffect, useState } from "react";
import useOrchid from "../../hook/useOrchid";
import { useAppSelector } from "../../redux/hook";
import { useUpdateOrchid } from "../../hook/useUpdateOrchid";
import { Orchid } from "../../page/Orchid";
import agent from "../../utils/agents";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Modal, Space } from "antd";

export interface FormValues {
  slug: string;
  name: string;
  background: string;
  category: string;
  image: string;
  isNatural: boolean;
  origin: string;
  price: number;
  rating: number;
}
interface UpdateOrchidProps {
  slug: string;
  isUpdateOrchidModalOpen: boolean;
  setIsUpdateOrchidModalOpen: (value: boolean) => void;
  setOrchidId: (value: string) => void;
}

const UpdateOrchid: React.FC<UpdateOrchidProps> = ({
  slug,
  isUpdateOrchidModalOpen,
  setIsUpdateOrchidModalOpen,
  setOrchidId,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const { orchidAdaptersByPage, currentPage, orchidLoaded } = useAppSelector(
    (state) => state.orchid
  );
  const { handleUpdateORchid } = useUpdateOrchid();
  const [loadings, setLoadings] = useState(false);
  // get orchid Detail
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
  // get orchid Detail
  useEffect(() => {
    setIsModalOpen(isUpdateOrchidModalOpen);
  }, [isUpdateOrchidModalOpen]);

  // handle confirm
  const handleConfirmOk = async (values: FormValues) => {
    setLoadings(true);
    try {
      await handleUpdateORchid(values, navigate);
      setIsConfirmModalOpen(false);
      setIsUpdateOrchidModalOpen(false);
    } catch (error) {
    } finally {
      setLoadings(false);
    }
  };
  const handleCancel = () => {
    setIsUpdateOrchidModalOpen(false);
    setOrchidId("");
  };
  const handleConfirmCancel = () => {
    setIsConfirmModalOpen(false);
  };
  const [form] = Form.useForm();
  const handleClick = async () => {
    try {
      await form.validateFields();
      setIsFormValid(true);
      setIsConfirmModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("orchid", orchid);
  return (
    <>
      <Modal
        title={<p className="text-2xl font-bold text-center">Update Orchid</p>}
        width="40%"
        open={isModalOpen}
        centered
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          
          className="flex flex-col items-center w-full"
          form={form}
          onFinish={handleConfirmOk}
          layout="vertical"
        >
          <Form.Item
           
            className="w-4/5"
            name="slug"
            label="slug"
            hidden
            initialValue={orchid?.slug}
          >
            <Input className="px-5 py-2 " hidden />
          </Form.Item>
          {/* category */}
          
          <Form.Item
            className="w-4/5"
            name="category"
            label="slug"
            hidden
            initialValue={orchid?.category}
          >
            <Input className="px-5 py-2 " hidden />
          </Form.Item>
{/* rating */}
          <Form.Item
            className="w-4/5"
            name="rating"
            label="Rating"
            hidden
            initialValue={orchid?.rating}
          >
            <Input className="px-5 py-2 " hidden />
          </Form.Item>
          {/* name */}
          <Form.Item
            className="w-4/5"
            name="name"
            label={
              <>
                <span className="red">*</span>Name
              </>
            }
            initialValue={orchid?.name}
          >
            <Input className="px-5 py-2 " placeholder="Name" />
          </Form.Item>

          {/* background */}
          <Form.Item
            className="w-4/5"
            name="background"
            label={
              <>
                <span className="red">*</span>BackGround
              </>
            }
            initialValue={orchid?.background}
          >
            <Input className="px-5 py-2 " placeholder="Background" />
          </Form.Item>

          {/* Images*/}
          <Form.Item
            className="w-4/5"
            name="image"
            label={
              <>
                <span className="red">*</span>Thumbnail
              </>
            }
            initialValue={orchid?.image}
          >
            <Input className="px-5 py-2 " placeholder="Background" />
          </Form.Item>

          {/* Origin*/}
          <Form.Item
            className="w-4/5"
            name="origin"
            label={
              <>
                <span className="red">*</span>Origin
              </>
            }
            initialValue={orchid?.origin}
          >
            <Input className="px-5 py-2 " placeholder="Origin" />
          </Form.Item>

            {/* Price*/}
            <Form.Item
            className="w-4/5"
            name="price"
            label={
              <>
                <span className="red">*</span>Price
              </>
            }
            initialValue={orchid?.price}
          >
            <Input className="px-5 py-2 " placeholder="Rating" />
          </Form.Item>
               {/* isNatural*/}
               <Form.Item
            className="w-4/5"
            name="isNatural"
            label={
              <>
                <span className="red">*</span>IsNatural
              </>
            }
            initialValue=
            {orchid?.isNatural}
            
          >
            <Input className="px-5 py-2 " placeholder="isNatural" />
          </Form.Item>
          <Space>
            <Button
              type="primary"
              className="bg-blue-500 "
              onClick={handleClick}
            >
              Lưu
            </Button>
            <Button danger onClick={handleCancel}>
              Hủy
            </Button>
          </Space>
        </Form>
      </Modal>

      <Modal
        title="Xác nhận"
        open={isConfirmModalOpen}
        okButtonProps={{ disabled: !isFormValid }}
        onCancel={handleConfirmCancel}
        footer={[
          <Button
            type="primary"
            style={{ backgroundColor: "#1890ff" }}
            htmlType="submit"
            loading={loadings}
            onClick={() => form.submit()}
          >
            <span className="font-semibold">Xác nhận</span>
          </Button>,
          <Button danger onClick={handleConfirmCancel}>
            <span className="font-semibold">Hủy</span>
          </Button>,
        ]}
      >
        Please Sure That you want to update ORchid
      </Modal>
    </>
  );
};

export default UpdateOrchid;
