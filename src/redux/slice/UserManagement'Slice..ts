import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import agent from "../../utils/agents";

export interface UserList {
  id: string;
  username: string;
  email: string;
  avatar: string;
  phoneNumber: number;
  gender: true;
}
export interface MetaData {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

export interface OrchidState {
  userLoaded: boolean;
  isFetching: boolean;
  status: string;
  metaData: MetaData | null;
  totalCount: number;
  pageCount: number;
  currentPage: number;
  searchValue: string;
  userAdaptersByPage: Record<number, UserList[]>;
}
export interface PagingParam {
  page: number;
  limit: number;
  search: string;
}
const initialState: OrchidState = {
  userLoaded: false,
  isFetching: false,
  status: "fetchS",
  metaData: null,
  totalCount: 0,
  pageCount: 0,
  currentPage: 1,
  searchValue: "",
  userAdaptersByPage: {},
};

export const fetchAllUserAsync = createAsyncThunk<
  UserList[],
  PagingParam,
  { state: RootState }
>("user/fetchAllUserAsync", async (input, thunkAPI) => {
  try {
    const response = await agent.User.getAllCustomer(input);
    console.log("response", response);
    thunkAPI.dispatch(setPageCount(response.pageCount));
    thunkAPI.dispatch(setTotalCount(response.totalCount));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

const CustomerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
    setCurrentpage: (state, action) => {
      state.currentPage = action.payload;
    },
    setUserLoaded: (state, action) => {
      state.userLoaded = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUserAsync.pending, (state) => {
      state.status = "pending fetch all orchids";
    });
    builder.addCase(fetchAllUserAsync.fulfilled, (state, action) => {
      state.status = "fetchS";
      state.userAdaptersByPage[action.meta.arg.page] = action.payload;
      state.userLoaded = true;
    });
    builder.addCase(fetchAllUserAsync.rejected, (state) => {
      state.status = "fetchF";
    });
  },
});

export const {
  setPageCount,
  setTotalCount,
  setCurrentpage,

  setSearchValue,
  setUserLoaded,
} = CustomerSlice.actions;

export default CustomerSlice.reducer;
