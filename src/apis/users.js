import { axiosInstance } from '../utils/helper'

export default {
  get200Users() {
    return axiosInstance.get('/?seed=dating&inc=gender,name,location,email,picture,dob&results=200')
  },
  get10Users({ page }) {
    return axiosInstance.get(`/?seed=dating&inc=gender,name,location,email,picture,dob&results=10&page=${page}`)
  }
}