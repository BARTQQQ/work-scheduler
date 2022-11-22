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

const createGroup = async (groupData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      }

    const response = await axios.post(API_URL, groupData, config)
    console.log(response.data)
    return response.data
}

const groupService = {getGroups, createGroup}

export default groupService