import axios from 'axios'

const API_URL = '/api/event/'

const getEvents = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + id, config)
    return response.data
}

const createEvent = async (id, eventData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL + id, eventData, config)
    return response.data
}

const deleteEvent = async (id, eventId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + id + '/' + eventId, config)
    return response.data
}

const eventService = {getEvents, createEvent, deleteEvent}

export default eventService