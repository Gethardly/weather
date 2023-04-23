import axios from 'axios'
import { weather_api } from '@/constants'

const axiosApi = axios.create({
  baseURL: weather_api
})

export default axiosApi
