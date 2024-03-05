import { useAppDispatch, useAppSelector } from "../redux/hook";
import { PagingParam } from "../utils/agents";
import { useEffect } from "react";
import { fetchAllOrchidAsync } from "../redux/slice/orchidSlice";
import { fetchAllUserAsync } from "../redux/slice/UserManagement'Slice.";

export default function useCustomerList() {
  const {
    userLoaded,
    pageCount,
    currentPage,
    searchValue,
    userAdaptersByPage,
  } = useAppSelector((state) => state.customer);
  const dispatch = useAppDispatch();
  const input: PagingParam = {
    limit: 10,
    page: currentPage,
    search: searchValue,
  };

  useEffect(() => {
    if (!userLoaded) {
      dispatch(fetchAllUserAsync(input));
    }
  }, [userLoaded, dispatch]);
  return {
    userLoaded,
    pageCount,
    currentPage,
    searchValue,
    userAdaptersByPage,
  };
}
