import { axiosInstance } from '../utils/helper'

export default {
  get120Users() {
    return axiosInstance.get('/?seed=dating&inc=gender,name,location,email,picture,dob&results=120')
  },
  get12Users({ page }) {
    return axiosInstance.get(`/?seed=dating&inc=gender,name,location,email,picture,dob&results=12&page=${page}`)
  }
}