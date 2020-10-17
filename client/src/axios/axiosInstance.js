import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://e-commerce-projects.herokuapp.com/'
})

export default instance
