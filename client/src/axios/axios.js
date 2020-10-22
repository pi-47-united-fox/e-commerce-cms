import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://ecommerce-cms-idham.herokuapp.com'
})

export default instance
