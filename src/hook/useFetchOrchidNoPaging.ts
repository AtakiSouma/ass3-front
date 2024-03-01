import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchAllOrchidWithoutPagingAsync } from "../redux/slice/orchidNoPagingSlice";


export function useFetchAllOrchid(){
  const {
    orchidLoaded,
    OrchidData
 } = useAppSelector((state) => state.orchidNoPaging)
 const dispatch = useAppDispatch();

 useEffect(() => {
     if(!orchidLoaded){
         dispatch(fetchAllOrchidWithoutPagingAsync());
     }
 },[orchidLoaded , dispatch]);
 return {
     orchidLoaded , 
     OrchidData
 }
}