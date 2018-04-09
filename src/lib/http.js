import axios from 'axios'
import Settings from '@/config/cifar-config'

axios.defaults.baseURL = Settings.HTTP_SERVER_IP

export default axios
