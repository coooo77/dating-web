import axios from 'axios'

const baseURL = 'https://randomuser.me/api/?seed=dating&inc=gender,name,location,email,picture,dob/?seed=dating&inc=gender,name,location,email,picture,dob'

const axiosInstance = axios.create({ baseURL })

export { axiosInstance }