import axios from 'axios'

const baseURL = 'https://randomuser.me/api'

const axiosInstance = axios.create({ baseURL })

export { axiosInstance }