import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import agent from "../../utils/agents";
import { SiReacttable } from "react-icons/si";

export interface Orchid {
  id: string;
  name: string;
  slug: string;
  isNatural: boolean;
  origin: string;
  image: string;
  rating:number;
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
  error:string;
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
  error:"",
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
    updateOrchidStart: (state) => {
      state.isFetching  = true;
      state.error = ""
      state.orchidLoaded = true;

    },
    updateOrchidSuccess: (state) => {
     state.isFetching = false;
     state.error = ""
     state.orchidLoaded = false;
    },
    updateOrchidFail: (state, action :PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload
    },
    deleteOrchidStart: (state) => {
      state.isFetching  = true;
      state.error = ""
      state.orchidLoaded = true;

    },
    deleteOrchidSuccess: (state) => {
     state.isFetching = false;
     state.error = ""
     state.orchidLoaded = false;

    },
    deleteOrchidFail: (state, action :PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload
    },
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
      state.isFetching = false;

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
  addCommentStart,
  deleteOrchidFail, 
  deleteOrchidStart,
  deleteOrchidSuccess,
  updateOrchidFail,
  updateOrchidStart,
  updateOrchidSuccess
} = OrchidSlice.actions;

export default OrchidSlice.reducer;
