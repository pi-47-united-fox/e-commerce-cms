import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://e-comm-cms.herokuapp.com'
})

export default instance
