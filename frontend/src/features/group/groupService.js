import axios from 'axios'

const API_URL = '/api/group/'

const getGroups = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)
    return response.data
}

const getGroup = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + id, config)
    return response.data
}


const createGroup = async (groupData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, groupData, config)
    return response.data
}

const deleteGroup = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + id, config)
    return response.data
}

const addMember = async (id, userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(API_URL + id, userData, config)
    return response.data
}

const deleteMember = async (id, userID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + id + '/' + userID, config)
    return response.data
}

const useGroup = () => {
    localStorage.removeItem('user')
}

const groupService = {getGroups, getGroup, createGroup, deleteGroup, useGroup, addMember, deleteMember}

export default groupService