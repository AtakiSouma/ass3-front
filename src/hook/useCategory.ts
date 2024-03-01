import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { PagingParam } from "../utils/agents";
import { fetchAllCategoryAsync } from "../redux/slice/categorySlice";

export default function useCategory() {
  const {
    categoryLoaded,
    pageCount,
    currentPage,
    searchValue,
    categoryAdaptersByPage,
  } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();
  const input: PagingParam = {
    limit: 3,
    page: currentPage,
    search: searchValue,
  };
  useEffect(() => {
    if (!categoryLoaded) {
      dispatch(fetchAllCategoryAsync(input));
    }
  }, [categoryLoaded, dispatch]);
  return {
    categoryLoaded,
    pageCount,
    currentPage,
    searchValue,
    categoryAdaptersByPage,
  };
}
