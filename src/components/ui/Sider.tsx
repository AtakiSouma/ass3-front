import {
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  PieChartFilled,
} from "@ant-design/icons";
import { Button, ConfigProvider, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useLocale } from "antd/es/locale";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Logo";
import { GiTwirlyFlower } from "react-icons/gi";
import { IoFlower } from "react-icons/io5";
import { cn } from "../../utils/cn";
import { BsFlower1 } from "react-icons/bs";
import { FaComment, FaSquare, FaUserFriends } from "react-icons/fa";
import { FaSquarePlus } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdCategory } from "react-icons/md";

type MenuItem = Required<MenuProps>["items"][number];
interface UserData {
  user: {
    id: string;
    email: string;
    isAdmin: boolean;
  };
}
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  type?: "group",
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    type,
    label: <Link to={`/${key}`}>{label}</Link>,
  } as MenuItem;
}
interface MyComponentProps {
  // Add any props if needed
}

const MySider = () => {
  // get username with cookie
  const [ISADMIN, setISADMIN] = useState(false);

  useEffect(() => {
    // Retrieve user data from localStorage when the component mounts or user data changes
    const userDataObject: UserData = JSON.parse(localStorage.getItem("user")!);
    const isAdmin = userDataObject?.user?.isAdmin || false;
    setISADMIN(isAdmin);
  }, []);

  const selectLocation = useLocation();
  const selected = selectLocation.pathname.split("/")[1];

  const [collapsed, setCollapsed] = useState(window.innerWidth < 1280);

  // toggle collapse
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  // handle resize
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1280);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getConditionalItems = (): MenuItem[] => {
    if (ISADMIN) {
      return [
        getItem("Dashboard", "dashboard", <LuLayoutDashboard />),
        getItem("Orchid", "orchid", <BsFlower1 />),
        getItem("CreateOrchid", "create", <FaSquarePlus />),
        getItem("Comment", "comment", <FaComment />),
        getItem("User", "user", <FaUserFriends />),
        getItem("Category", "category", <MdCategory />),
      ];
    } else if (!ISADMIN) {
      return [
        getItem("Dashboard", "dashboard", <LuLayoutDashboard />),
        getItem("Orchid", "orchid", <BsFlower1 />),
      ];
    } else {
      return [];
    }
  };

  return (
    <>
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="overflow-hidden"
        trigger={
          <div className="border-t-[1px] w-full ">
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        }
        width={256}
      >
        <div>
          <div
            className="
          p-5
          
          text-white flex flex-row gap-2 items-center justify-center"
          >
            <IoFlower size={30} color="#d32edb" />
            <span
              className={cn("font-bold  text-lg  ", {
                hidden: collapsed,
              })}
            >
              Orchid Album
            </span>
          </div>
        </div>
        <Menu
          theme="dark"
          defaultOpenKeys={[selected]}
          defaultSelectedKeys={[selected]}
          mode="inline"
          items={getConditionalItems()}
          inlineCollapsed={collapsed}
        ></Menu>
      </Sider>
    </>
  );
};

export default MySider;
