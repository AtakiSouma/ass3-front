import {
  Avatar,
  Button,
  Dropdown,
  Input,
  MenuProps,
  Modal,
  Spin,
  Typography,
  notification,
} from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import {
  FaArrowCircleDown,
  FaRegArrowAltCircleDown,
  FaSearch,
} from "react-icons/fa";
import {
  IoIosNotifications,
  IoIosNotificationsOutline,
  IoMdMenu,
} from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import SearchInput from "../Search";
import { CgMenu } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import apiJWT from "../../utils/api";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { MdFavorite, MdFavoriteBorder, MdOutlineEmail } from "react-icons/md";
import { useAppSelector } from "../../redux/hook";
import agent from "../../utils/agents";

const Navbar = () => {
  interface UserData {
    user: {
      id: string;
      username: string;
      isAdmin: boolean;
      email: string;
    };
  }
  const userDataObject: UserData = JSON.parse(localStorage.getItem("user")!);
  const email = userDataObject?.user?.email || "";
  const isAdmin = userDataObject?.user?.isAdmin || "";
  const username = userDataObject?.user?.username || "";

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const Logout = async () => {
    setLoading(true);
    try {
      const response = await apiJWT.get(`api/auth/logout`);
      if (response) {
        localStorage.clear();
        setLoading(false);
        navigate("/login");
      }
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra",
        placement: "bottomLeft",
      });
    }
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <UserOutlined></UserOutlined>,
      label: <Link to={`/update-profile`}>Account Management</Link>,
    },
    {
      key: "2",
      icon: <LogoutOutlined></LogoutOutlined>,
      label: <div onClick={Logout}>Logout</div>,
    },
  ];

  return (
    <div className="bg-dark-blue overflow-auto z-50 w-full px-6 py-4 flex flex-row items-center justify-between">
      <div className="flex flex-row items-center justify-center gap-3">
        <SearchInput/>
      </div>
      <div className="flex flex-row items-center  gap-5">
        <div>
          <MdFavoriteBorder color="#ffffff" size={25} />
        </div>
        <div className="flex flex-row gap-3 items-center">
          <MdOutlineEmail color="#ffffff" size={25} />
          <Typography className="text-white">{email}</Typography>
        </div>
        <div>
          <IoIosNotificationsOutline color="#ffffff" size={25} />
        </div>
        <div className="flex flex-row items-center gap-5">
          <Avatar
            size={40}
            src="https://steamuserimages-a.akamaihd.net/ugc/790875768635897882/B21380C75A8C2F48F09B55F74A6AA7BEBF3910CD/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
          />
          <div className="flex flex-col text-white">
            <span>{username}</span>
            <span>{isAdmin ? "Admin" : "Customer"}</span>
          </div>
          <div className=" p-1 border-neutral-100 border-[1px] rounded-full">
            <Dropdown
              menu={{ items }}
              placement="bottomRight"
              trigger={["click"]}
              arrow
            >
              <CgMenu
                size={17}
                color="#ffffff"
                className="cursor-pointer relative"
              />
            </Dropdown>
            <Modal footer={null} closable={false} open={loading}>
              <div className="flex flex-col items-center justify-center">
                <Spin size="large"></Spin>
                <span>Đang đăng xuất...</span>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
