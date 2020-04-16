/* eslint-disable */
import axios from 'axios'
import { showAlert } from './alerts'
const host = '127.0.0.1'
const port = 3000
export const login = async (email, password) => {
  // console.log(email, password)
  try {
    const res = await axios({
      method: 'POST',
      url: `http://${host}:${port}/api/v1/users/login`,
      data: {
        email,
        password
      }
    })

    if (res.data.status === 'success') {
      showAlert('success', `Logged in successfully `)
      window.setTimeout(() => {
        location.assign('/')
      }, 1500)
    }
    // console.log(res)
  } catch (err) {
    const error = { entireError: err, err: err.response.data }
    showAlert('error', error.err.message)
  }
}

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://${host}:${port}/api/v1/users/logout`
    })

    if ((res.data.status === 'success')) location.reload(true)
  } catch (err) {
    console.log(err)
    showAlert('error', 'Error logging out! Try again.')
  }
}
