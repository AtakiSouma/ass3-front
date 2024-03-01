import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import agent from "../../utils/agents";

export interface Orchid {
  id: string;
  name: string;
  slug: string;
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
export interface MetaData {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

export interface OrchidState {
  orchidLoaded: boolean;
  isFetching:boolean;
  status: string;
  metaData: MetaData | null;
  totalCount: number;
  pageCount: number;
  currentPage: number;
  searchValue: string;
  orchidAdaptersByPage: Record<number, Orchid[]>;
}
export interface PagingParam {
  page: number;
  limit: number;
  search: string;
}
const initialState: OrchidState = {
  orchidLoaded: false,
  isFetching:false,
  status: "fetchS",
  metaData: null,
  totalCount: 0,
  pageCount: 0,
  currentPage: 1,
  searchValue: "",
  orchidAdaptersByPage: {},
};

export const fetchAllOrchidAsync = createAsyncThunk<
  Orchid[],
  PagingParam,
  { state: RootState }
>("orchid/fetchAllOrchidAsync", async (input, thunkAPI) => {
  try {
    const response = await agent.Orchid.getAllOrchid(input);
    console.log("response", response);
    thunkAPI.dispatch(setPageCount(response.pageCount));
    thunkAPI.dispatch(setTotalCount(response.totalCount));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

const OrchidSlice = createSlice({
  name: "orchid",
  initialState,
  reducers: {
    addCommentStart: (state) => {
      state.orchidLoaded = true;
      state.isFetching = true;
    },
    addCommentSuccess: (state) => {
      state.orchidLoaded = false;
      state.isFetching = false;

    },
    addCommentFailed: (state) => {
      state.orchidLoaded = false;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
    setCurrentpage: (state, action) => {
      state.currentPage = action.payload;
    },
    setOrchidLoaded: (state, action) => {
      state.orchidLoaded = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllOrchidAsync.pending, (state) => {
      state.status = "pending fetch all orchids";
    });
    builder.addCase(fetchAllOrchidAsync.fulfilled, (state, action) => {
      state.status = "fetchS";
      state.orchidAdaptersByPage[action.meta.arg.page] = action.payload;
      state.orchidLoaded = true;
    });
    builder.addCase(fetchAllOrchidAsync.rejected, (state) => {
      state.status = "fetchF";
    });
  },
});

export const {
  setPageCount,
  setTotalCount,
  setCurrentpage,
  setOrchidLoaded,
  setSearchValue,
  addCommentFailed,
  addCommentSuccess,
  addCommentStart
} = OrchidSlice.actions;

export default OrchidSlice.reducer;
