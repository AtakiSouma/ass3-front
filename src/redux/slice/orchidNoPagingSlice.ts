import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import agent from "../../utils/agents";

export interface Orchid {
  id: string;
  name: string;
  slug: string;
  isNatural: boolean;
  origin: string;
  price:number;
  image: string;
  background: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
}

export interface OrchidState {
  orchidLoaded: boolean;
  isFetching: boolean;
  status: string;
  OrchidData?: Orchid[];
}

const initialState: OrchidState = {
  orchidLoaded: false,
  isFetching:false,
  status: "fetchS",
  OrchidData: [],
};

export const fetchAllOrchidWithoutPagingAsync = createAsyncThunk(
  "orchid/fetchALlOrchidWithoutPagingAsync",
  async () => {
    try {
      const response = await agent.Orchid.getAllOrchidWithoutPaging();
      return response;
    } catch (error) {
      return error;
    }
  }
);

const OrchidSlice = createSlice({
  name: "orchid",
  initialState,
  reducers: {
    setOrchidLoaded: (state, action) => {
      state.orchidLoaded = action.payload;
    },
  },
  extraReducers: (builder) => {
    // without paging
    builder.addCase(fetchAllOrchidWithoutPagingAsync.pending, (state) => {
      state.status = "pending fetch all orchids without paging";
     
    });
    builder.addCase(
      fetchAllOrchidWithoutPagingAsync.fulfilled,
      (state, action: PayloadAction<Orchid[]>) => {
        state.status = "fulfilled fetch all";
        state.OrchidData = action.payload;
         state.orchidLoaded= true;
       
      }
    );
    builder.addCase(fetchAllOrchidWithoutPagingAsync.rejected, (state) => {
      state.status = "rejected fetch all";
    });
  },
});

export const { setOrchidLoaded } = OrchidSlice.actions;

export default OrchidSlice.reducer;
