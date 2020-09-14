import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'https://randomuser.me/api'

const axiosInstance = axios.create({ baseURL })

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})

export { axiosInstance, Toast }