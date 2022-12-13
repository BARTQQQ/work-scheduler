import {createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import groupService from './groupService'


const initialState = {
    groups: [],
    group: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getGroups = createAsyncThunk('groups/get', async (_, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth.user.token
        return await groupService.getGroups(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        console.log(error.message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const getGroup = createAsyncThunk('group/get', async (id, thunkAPI) => {
  try {
      const token = await thunkAPI.getState().auth.user.token
      return await groupService.getGroup(id, token)
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
      console.log(error.message)
      return thunkAPI.rejectWithValue(message)
  }
})

export const createGroup = createAsyncThunk('group/create', async (groupData, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token
      return await groupService.createGroup(groupData, token)
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
        console.log(message)
        return thunkAPI.rejectWithValue(message)
  }
})

export const deleteGroup = createAsyncThunk('group/delete', async (id, thunkAPI) => {
  try {
      const token = await thunkAPI.getState().auth.user.token
      return await groupService.deleteGroup(id, token)
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
      console.log(error.message)
      return thunkAPI.rejectWithValue(message)
  }
})

export const addMember = createAsyncThunk('group/add', async (userData, thunkAPI) => {
  try {
      const [id, memberData] = userData 
      const token = await thunkAPI.getState().auth.user.token
      return await groupService.addMember(id, memberData, token)
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
      console.log(error.message)
      return thunkAPI.rejectWithValue(message)
  }
})

export const deleteMember = createAsyncThunk('group/delete/member', async (userData, thunkAPI) => {
  try {
      const [id, memberID] = userData 
      const token = await thunkAPI.getState().auth.user.token
      return await groupService.deleteMember(id, memberID, token)
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
      console.log(error.message)
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
        .addCase(getGroup.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getGroup.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.group = action.payload
        })
        .addCase(getGroup.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(createGroup.pending, (state) => {
          state.isLoading = true
        })
        .addCase(createGroup.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.groups['owner'].push(action.payload)
        })
        .addCase(createGroup.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(deleteGroup.pending, (state) => {
          state.isLoading = true
        })
        .addCase(deleteGroup.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.groups = action.payload.id
        })
        .addCase(deleteGroup.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(addMember.pending, (state) => {
          state.isLoading = true
        })
        .addCase(addMember.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.group['members'].push(action.payload)
          console.log(state.group['members'])
        })
        .addCase(addMember.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(deleteMember.pending, (state) => {
          state.isLoading = true
        })
        .addCase(deleteMember.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.group['members'] = state.group.members.filter(
            (member) => member.memberId !== action.payload.id
          )
        })
        .addCase(deleteMember.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
    },
})

export const { reset } = groupSlice.actions
export default groupSlice.reducer