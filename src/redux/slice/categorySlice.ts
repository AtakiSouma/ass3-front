import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import agent from "../../utils/agents";

export interface Category {
  id: string;
  name: string;
  status: boolean;
  slug: string;
  description: string;
}
export interface MetaData {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

export interface CategoryState {
  categoryLoaded: boolean;
  status: string;
  metaData: MetaData | null;
  totalCount: number;
  pageCount: number;
  currentPage: number;
  searchValue: string;
  categoryAdaptersByPage: Record<number, Category[]>;
}
export interface PagingParam {
  page: number;
  limit: number;
  search: string;
}
const initialState: CategoryState = {
  categoryLoaded: false,
  status: "fetchS",
  metaData: null,
  totalCount: 0,
  pageCount: 0,
  currentPage: 1,
  searchValue: "",
  categoryAdaptersByPage: {},
};
export const fetchAllCategoryAsync = createAsyncThunk<
  Category[],
  PagingParam,
  { state: RootState }
>("category/fetchAllCategoryAsync", async (input, thunkAPI) => {
  try {
    const response = await agent.Category.getAllCategory(input);
    console.log("response" , response)
    thunkAPI.dispatch(setPageCount(response.pageCount));
    thunkAPI.dispatch(setTotalCount(response.totalCount));
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

const CategorySlice = createSlice({
  name: "category",
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
    setCategoryLoaded: (state, action) => {
     state.categoryLoaded = action.payload;
    },
    setSearchValue :(state ,action) => {
        state.searchValue =action.payload;
    }
  },
  extraReducers: (builder) => { 
    builder.addCase(fetchAllCategoryAsync.pending, (state) => {
        state.status = "pending fetch all categories";
    });
    builder.addCase(fetchAllCategoryAsync.fulfilled, (state , action) => {
        state.status = "fetchS";
        state.categoryAdaptersByPage[action.meta.arg.page] = action.payload;
        state.categoryLoaded = true; 
    });
    builder.addCase(fetchAllCategoryAsync.rejected, (state) => {
       state.status = "fetchF"
    })




  }
});


export const {
    setPageCount,
    setTotalCount,
    setCurrentpage,
    setCategoryLoaded,
    setSearchValue } = CategorySlice.actions;


    export default CategorySlice.reducer;
