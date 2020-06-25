import axios from 'axios'
const baseUrl = '/api/login'

const login = async creditentials => {
  const response = await axios.post(baseUrl, creditentials)
  return response.data
}

export default { login }