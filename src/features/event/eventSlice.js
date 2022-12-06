import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import eventService from './eventService'

const initialState = {
    events: [],
    eventError: false,
    eventSuccess: false,
    eventLoading: false,
    eventmessage: ''
}

export const getEvents = createAsyncThunk('event/get', async (id, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth.user.token
        return await eventService.getEvents(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const createEvent = createAsyncThunk('event/create', async (eventData, thunkAPI) => {
    try {
        const [id, event] = eventData 
        const token = await thunkAPI.getState().auth.user.token
        return await eventService.createEvent(id, event, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteEvent = createAsyncThunk('event/delete', async (eventData, thunkAPI) => {
    try {
        const [id, event] = eventData 
        const token = await thunkAPI.getState().auth.user.token
        return await eventService.deleteEvent(id, event, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
  })

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        resetEvent: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getEvents.pending, (state) => {
            state.eventLoading = true
          })
          .addCase(getEvents.fulfilled, (state, action) => {
            state.eventLoading = false
            state.eventSuccess = true
            state.events = action.payload
          })
          .addCase(getEvents.rejected, (state, action) => {
            state.eventLoading = false
            state.eventError = true
            state.eventmessage = action.payload
          })
          .addCase(createEvent.pending, (state) => {
            state.eventLoading = true
          })
          .addCase(createEvent.fulfilled, (state, action) => {
            state.eventLoading = false
            state.eventSuccess = true
            state.events.push(action.payload)
          })
          .addCase(createEvent.rejected, (state, action) => {
            state.eventLoading = false
            state.eventError = true
            state.eventmessage = action.payload
          })
          .addCase(deleteEvent.pending, (state) => {
            state.eventLoading = true
          })
          .addCase(deleteEvent.fulfilled, (state, action) => {
            state.eventLoading = false
            state.eventSuccess = true
            state.events = state.events.filter(
              (event) => event._id !== action.payload.id
            )
          })
          .addCase(deleteEvent.rejected, (state, action) => {
            state.eventLoading = false
            state.eventError = true
            state.eventmessage = action.payload
          })
    }
})

export const {resetEvent} = eventSlice.actions
export default eventSlice.reducer