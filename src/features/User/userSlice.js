import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState:{
        nombre:"",
        apellido:"",
        email:"",
        isFetching:false,
        isSuccess:false,
        isError:false,
        errorMessage:""
    },
    reducers:{

    }
})

export const useSelector = state =>state.user