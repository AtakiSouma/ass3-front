import React, { useEffect, useState } from "react";

import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import {
  Button,
  ConfigProvider,
  Divider,
  Image,
  Input,
  Modal,
  Pagination,
  Switch,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import { useAppDispatch } from "../redux/hook";
import useCategory from "../hook/useCategory";

import useOrchid from "../hook/useOrchid";
import {
  setCurrentpage,
  setOrchidLoaded,
  setSearchValue,
} from "../redux/slice/orchidSlice";
import getRandomImageUrl from "../utils/randomORigin";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDeleteForever, MdPageview } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import renderRating from "../utils/renderStar";
import agent from "../utils/agents";
import useCustomerList from "../hook/useCustomerList";
import { setUserLoaded } from "../redux/slice/UserManagement'Slice.";
import { useToggleuserBlock } from "../hook/useToggleuserBlock";
import MySpin from "../components/ui/MySpin";
export interface UserList {
  id: string;
  username: string;
  email: string;
  avatar: string;
  phoneNumber: number;
  gender: boolean;
  status: boolean;
  isBlocked: boolean;
}

type columnProps = {
  currentPage: number;
  displayData: number;
};

const UserList = () => {
  const columns = ({
    currentPage,
    displayData,
  }: columnProps): ColumnsType<UserList> => [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (_, __, index) => {
        const pageSize = displayData;
        const calculatedIndex = (currentPage - 1) * pageSize + index + 1;
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>{calculatedIndex}</span>
          </div>
        );
      },
      width: "4%",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "stt",
      width: "10%",
      render: (avatar) => (
        <div className="w-[80px] h-[50px]">
          <img
            src={avatar}
            alt={avatar}
            className="object-fill w-[100%] h-[100%] rounded-xl"
          />
        </div>
      ),
    },
    {
      title: "UserName",
      dataIndex: "username",
      key: "stt",
      render: (username) => (
        <div className="font-bold text-md font-serif">{username}</div>
      ),
      width: "10%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "stt",
      render: (email) => <div className=" text-md ">{email}</div>,
      width: "10%",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "stt",
      width: "10%",
      render: (gender) => (
        <>
          {gender ? (
            <>
              <Tag color="green">Male</Tag>
            </>
          ) : (
            <>
              <Tag color="volcano">Female</Tag>
            </>
          )}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "isBlocked",
      width: "10%",
      render: (isBlocked) => {
        return isBlocked ? (
          <Tag color="red">Disable</Tag>
        ) : (
          <Tag color="green">Processing</Tag>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      width: "6%",
      render: (id, record) => (
        <div className="">
          <Switch
            checked={!record.isBlocked}
            onChange={() => handleStatusToggle(id)}
          />
        </div>
      ),
    },
  ];
  // handle modal;;
  const { state, toggleUserBlock } = useToggleuserBlock();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const showModal = (accountId: string) => {
    setSelectedAccountId(accountId);
    setIsOpen(true);
  };
  const handleOk = () => {
    setIsOpen(false);
    toggleUserBlock(selectedAccountId);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleStatusToggle = (accountId: string) => {
    showModal(accountId);
  };

  //  handle moidal

  const dispatch = useAppDispatch();
  const { Search } = Input;
  const { currentPage, userLoaded, pageCount, userAdaptersByPage } =
    useCustomerList();
  const handlePageChange = (page: number) => {
    dispatch(setCurrentpage(page));
    if (!userAdaptersByPage[page]) dispatch(setUserLoaded(false));
  };
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(setUserLoaded(false));
    }
  };

  const tableColumns = columns({ currentPage, displayData: 10 });
  console.log("userDtaa", userAdaptersByPage);

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#c9d6ff",
              bodySortBg: "",
            },
            Modal: {
              colorBgLayout: "red",
              colorBgContainer: "red",
            },
          },
        }}
      >  {state.isFetching ? (
        <MySpin
          description="Delete this orchid"
          message="Delete!"
          type="info"
          tip="Loading..."
        ></MySpin>
      ) : (

        <div className="container mx-auto px-8">
          
          <div>
            <h1 className="mb-5 text-2xl font-semibold text-gray-800">
              User Management
            </h1>
            <div className="flex items-center justify-between mb-2">
              <Search
                placeholder="Search"
                className="w-[30%]"
                size="middle"
                onChange={(e) => dispatch(setSearchValue(e.target.value))}
                onKeyPress={handleSearchKeyPress}
              />
            </div>
          </div>
          <Table
            columns={tableColumns}
            dataSource={userAdaptersByPage[currentPage]}
            loading={!userLoaded}
            pagination={false}
            bordered={true}
            rowKey={(record) => record.id}
          />
          <Pagination
            className="flex justify-end mt-4"
            disabled={!userLoaded}
            current={currentPage}
            total={pageCount * 10}
            onChange={handlePageChange}
          />
        </div>
      )}
      </ConfigProvider>
      <>
        <Modal
          onCancel={() => setIsOpen(false)}
          open={isOpen}
          centered
          footer={[
            <Button
              key="Confirm dialog"
              type="primary"
              className="bg-blue-500"
              onClick={handleOk}
            >
              Confirm
            </Button>,
            <Button key="cancelButton" danger onClick={handleCancel}>
              Cancel
            </Button>,
          ]}
        >
          <p>Do you want to Change this status of this user?</p>
        </Modal>
      </>
    </>
  );
};

export default UserList;
