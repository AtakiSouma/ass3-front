import { LoadingOutlined } from "@ant-design/icons";
import { Layout, Spin } from "antd";
import { useState } from "react";
import Navbar from "../ui/Navbar";
import MyContent from "../ui/Content";
import Footer from "../Footer";
import MySider from "../ui/Sider";
import PrivateRoute from "../../routes/privateRoute";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  //   const [loading, setLoading] = useState(true);

  //   if (loading)
  //     return (
  //       <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
  //     );
  return (
    <Layout className="min-h-screen">
      <MySider></MySider>
      <Layout className=" bg-white">
        <Navbar />
          <MyContent children={children} />
        <Footer />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
