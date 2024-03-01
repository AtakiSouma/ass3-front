import create from "@ant-design/icons/lib/components/IconFont";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface newOrchid {
    id: string;
    name: string;
    category: string;
    background: string;
    image: string;
    isNatural: boolean;
    origin: string;
    price: number;
    rating: number;
}

export interface OrchidProps {
     Orchid: newOrchid;
     isFetching: boolean;
     error:boolean;
     displayError: string;
}

const initialState: OrchidProps = {
    Orchid : {} as newOrchid,
    isFetching:false,
    error:false, 
    displayError:"",
}

const createOrchidSlice = createSlice({
    name:"createOrchid",
    initialState,
    reducers: {
        createOrchidStart : (state) => {
            state.isFetching = true;
            state.error = false;
        },
        createOrchidSuccess : (state , action : PayloadAction<newOrchid>) => {
            state.isFetching = false;
            state.Orchid = action.payload;
            state.error  = false;
        },
        createOrchidFailed : (state,action: PayloadAction<string>) => {
            state.isFetching = false;
            state.error = true;
            state.displayError = action.payload;
        }
    }
})

export const {
 createOrchidFailed,
 createOrchidStart,
 createOrchidSuccess

} = createOrchidSlice.actions

export default createOrchidSlice.reducer