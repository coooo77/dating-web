import { axiosInstance } from '../utils/helper'

export default {
  get240Users() {
    return axiosInstance.get('/?seed=dating&inc=gender,name,location,email,picture,dob&results=240')
  },
  get24Users({ page }) {
    return axiosInstance.get(`/?seed=dating&inc=gender,name,location,email,picture,dob&results=24&page=${page}`)
  }
}