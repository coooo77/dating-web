import { axiosInstance } from '../utils/helper'

export default {
  get200Users() {
    return axiosInstance.get('&results=200')
  },
  get10Users({ page }) {
    return axiosInstance.get(`&results=10&page=${page}`)
  }
}