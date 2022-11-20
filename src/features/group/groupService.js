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

const groupService = {getGroups}

export default groupService