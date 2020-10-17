import axios from 'axios'

export default axios.create({
  baseURL: 'https://cms-unshop.herokuapp.com',
  headers: {
    'Content-type': 'application/json'
  }
})
