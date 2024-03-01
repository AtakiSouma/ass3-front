import { useAppDispatch, useAppSelector } from "../redux/hook";
import { PagingParam } from "../utils/agents";
import { useEffect } from "react";
import { fetchAllOrchidAsync } from "../redux/slice/orchidSlice";

export default function useOrchid() {
    const {
       orchidLoaded,
       pageCount,
       currentPage,
       searchValue,
        orchidAdaptersByPage
    } = useAppSelector((state) => state.orchid)
    const dispatch = useAppDispatch();
    const input : PagingParam = {
        limit: 10, 
        page: currentPage,
        search:searchValue
    }

    useEffect(() => {
        if(!orchidLoaded){
            dispatch(fetchAllOrchidAsync(input));
        }
    },[orchidLoaded , dispatch]);
    return {
        orchidLoaded , 
        pageCount,
        currentPage,
        searchValue,
        orchidAdaptersByPage
    }
}