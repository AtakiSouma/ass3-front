import React, { Suspense, useEffect, useState } from "react";

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
import { useDeleteOrchid } from "../hook/useDleleteOrchid";
import MySpin from "../components/ui/MySpin";
import { DeleteFilled } from "@ant-design/icons";
import UpdateOrchid from "../components/ui/ModalUpdateOrchid";
export interface Orchid {
  id: string;
  name: string;
  slug: string;
  rating:number;
  isNatural: boolean;
  origin: string;
  image: string;
  price: number;
  background: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  comments: [
    {
      _id: string;
      author_img: string;
      author_name: string;
      rating: string;
      comment: string;
      author: string;
    }
  ];
}

type columnProps = {
  currentPage: number;
  displayData: number;
};

const Orchid = () => {
  // update
  const [OrchidId, setOrchidId] = useState("");
  const [isUpdateOrchidModalOpen, setIsUpdateOrchidModalOpen] = useState(false);
  const openUpdateOrchidModal = (slug: string) => {
    setIsUpdateOrchidModalOpen(true);
    setOrchidId(slug);
  };

  // update

  const columns = ({
    currentPage,
    displayData,
  }: columnProps): ColumnsType<Orchid> => [
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
      title: "Thumbnail",
      dataIndex: "image",
      key: "stt",
      width: "10%",
      render: (image) => (
        <div className="w-[80px] h-[50px]">
          <img
            src={image}
            alt={image}
            className="object-fill w-[100%] h-[100%] rounded-xl"
          />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "stt",
      render: (name) => (
        <div className="font-bold text-md font-serif">{name}</div>
      ),
      width: "10%",
    },
    {
      title: "Origination",
      dataIndex: "origin",
      key: "stt",
      width: "10%",
      render: (origin: string) => (
        <div className="flex flex-col  border-[2px] border-gray-100 w-[70px] h-[40px]">
          <img
            src={getRandomImageUrl(origin)}
            alt={origin}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              boxShadow: "revert-layer",
            }}
          />
        </div>
      ),
    },
    {
      title: "Nature",
      dataIndex: "isNatural",
      key: "stt",
      width: "10%",
      render: (isNatural) => (
        <>
          {isNatural ? (
            <>
              <Tag color="green">Natural</Tag>
            </>
          ) : (
            <>
              <Tag color="volcano">Artificial</Tag>
            </>
          )}
        </>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "stt",
      render: (price) => <div className=" text-md ">{price}$</div>,
      width: "10%",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "stt",
      render: (rating: number) => renderRating(rating),
      width: "10%",
    },
    {
      title: "Action",
      dataIndex: "slug",
      width: "10%",
      render: (slug) => (
        <div className="flex flex-row items-center border-[1px] border-transparent px-2 py-1 rounded-md bg-gray-100 justify-between">
          <BiSolidEditAlt
            size={22}
            color="green"
            className="hover:cursor-pointer"
            onClick={() => openUpdateOrchidModal(slug)}
          />

          <Divider type="vertical" />
          <MdDeleteForever
            size={22}
            color="red"
            onClick={() => showModal(slug)}
            className="hover:cursor-pointer"
          />
        </div>
      ),
    },
  ];
  // handle modal;;
  const [currentSlug, setCurrentSlug] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state, DeleteOrchids } = useDeleteOrchid();
  const showModal = (slug: string) => {
    setCurrentSlug(slug);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      DeleteOrchids(currentSlug);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Delete request failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dispatch = useAppDispatch();
  const { Search } = Input;
  const { currentPage, orchidAdaptersByPage, orchidLoaded, pageCount } =
    useOrchid();
  const handlePageChange = (page: number) => {
    dispatch(setCurrentpage(page));
    if (!orchidAdaptersByPage[page]) dispatch(setOrchidLoaded(false));
  };
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(setOrchidLoaded(false));
    }
  };

  const tableColumns = columns({ currentPage, displayData: 10 });

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              bodySortBg: "",
              cellPaddingBlock: 8,
            },
            Modal: {
              footerBg: "text-red-200",
            },
          },
        }}
      >
        {state.isFetching ? (
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
                Orchid Management
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
              dataSource={orchidAdaptersByPage[currentPage]}
              loading={!orchidLoaded}
              pagination={false}
              bordered={true}
              rowKey={(record) => record.id}
            />
            <Pagination
              className="flex justify-end mt-4"
              disabled={!orchidLoaded}
              current={currentPage}
              total={pageCount * 10}
              onChange={handlePageChange}
            />
          </div>
        )}
        <>
          <Modal
            centered
            title="Delete Modal "
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{
              type: "primary",
              style: {
                backgroundColor: "blue",
                borderColor: "green",
                color: "#ffffff",
              },
            }}
            cancelButtonProps={{ type: "default" }}
          >
            {" "}
            <div className="flex flex-col items-center">
              <div className="rounded-3xl border-[1px]  bg-red-300 px-3 py-2">
                <DeleteFilled
                  size={100}
                  className="text-red-500"
                ></DeleteFilled>
              </div>
              <p>Do you want to Delete This Orchid</p>
            </div>
          </Modal>
        </>
      </ConfigProvider>
      {isUpdateOrchidModalOpen ? (
        <Suspense fallback={<></>}>
          <UpdateOrchid
            isUpdateOrchidModalOpen={isUpdateOrchidModalOpen}
            setIsUpdateOrchidModalOpen={setIsUpdateOrchidModalOpen}
            slug={OrchidId}
            setOrchidId={setOrchidId}
          ></UpdateOrchid>
        </Suspense>
      ) : (
        <></>
      )}
    </>
  );
};

export default Orchid;
