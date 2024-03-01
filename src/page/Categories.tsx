import React, { useEffect } from "react";

import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { Button, ConfigProvider, Input, Pagination, Table } from "antd";
import { useAppDispatch } from "../redux/hook";
import useCategory from "../hook/useCategory";
import {
  setCategoryLoaded,
  setCurrentpage,
  setSearchValue,
} from "../redux/slice/categorySlice";
export interface Category {
  id: string;
  name: string;
  status: boolean;
  slug: string;
  description: string;
}

type columnProps = {
  currentPage: number;
  displayData: number;
};
const columns = ({
  currentPage,
  displayData,
}: columnProps): ColumnsType<Category> => [
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
    title: "Name Category",
    dataIndex: "name",
    key: "stt",
    render: (name) => name,
    width: "20%",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "stt",
    width: "50%",
    render: (description) => description,
  },
  {
    title: "Action",
    dataIndex: "id",
    width: "10%",
    render: (id) => (
      <Link to={`category/detail/${id}`}>
        <Button type="link">View</Button>
      </Link>
    ),
  },
];
const Categories = () => {
  const dispatch = useAppDispatch();
  const { Search } = Input;
  const { categoryAdaptersByPage, categoryLoaded, currentPage, pageCount } =
    useCategory();
  const handlePageChange = (page: number) => {
    dispatch(setCurrentpage(page));
    if (!categoryAdaptersByPage[page]) dispatch(setCategoryLoaded(false));
  };
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(setCategoryLoaded(false));
    }
  };

  const tableColumns = columns({ currentPage, displayData: 3 });

  return (
    <ConfigProvider
    theme = {{
        components:{
            Table:{
                headerBg:"#c9d6ff",
                bodySortBg:""
            }
        }
    }}
    >
      <div className="container mx-auto px-8">
        <div>
          <h1 className="mb-5 text-2xl font-semibold text-gray-800">
            Category Management
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
          dataSource={categoryAdaptersByPage[currentPage]}
          loading={!categoryLoaded}
          pagination={false}
          bordered={true}
          rowKey={(record) => record.id}
        />
        <Pagination
          className="flex justify-end mt-4"
          disabled={!categoryLoaded}
          current={currentPage}
          total={pageCount * 10}
          onChange={handlePageChange}
        />
      </div>
    </ConfigProvider>
  );
};

export default Categories;
