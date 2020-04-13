/* eslint-disable */
import axios from 'axios'
import { showAlert } from './alerts'
export const login = async (email, password) => {
  console.log(email, password)
  const host = '127.0.0.1'
  const port = 3000
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
    console.log(res)
  } catch (err) {
    const error = { entireError: err, err: err.response.data }
    showAlert('error', error.err.message)
  }
}
