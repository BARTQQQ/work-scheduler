import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import groupService from './groupService'


const initialState = {
    groups: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getGroups = createAsyncThunk('group/get', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        console.log(token)
        return await groupService.getGroups(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        
        .addCase(getGroups.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getGroups.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.groups = action.payload
        })
        .addCase(getGroups.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
    },
})

export const { reset } = groupSlice.actions
export default groupSlice.reducer