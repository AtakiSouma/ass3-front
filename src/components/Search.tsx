import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { SearchProps } from "antd/es/input";
import React from "react";

const { Search } = Input;
const SearchInput = () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    
    <Search  
    className="bg-blue-950 text-blue-950 hidden lg:block"
    allowClear
    placeholder="Input search text" onSearch={onSearch} style={{ width: 200 }} 
    />
   
  );
};

export default SearchInput;
