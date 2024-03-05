import React from "react";
import { Alert, Spin } from "antd";

// Define the styled container for your custom spin

// Define the prop types for MySpin
interface MySpinProps {
  message: string;
  description: string;
  type: "success" | "info" | "warning" | "error";
  tip?: string;
}

const MySpin: React.FC<MySpinProps> = ({
  message,
  description,
  type,
  tip = "Loading...",
}) => (
  <div className="flex justify-center items-center h-[70vh] z-50">
    <Spin tip={tip} className="w-[1000px]">
      <Alert message={message} description={description} type={type} />
    </Spin>
  </div>
);

export default MySpin;
