import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { refreshTokenApi, userWithTokenApi } from './config/API';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './config/token';
import { setUser } from './redux/userSlice';
import Routing from './Routes/Routing';
function App() {
  const dispatch = useDispatch()
  const id = useRef()
  useEffect(() => {
    const refresh_token = Cookies.get(REFRESH_TOKEN_KEY)
    if (refresh_token) {
      id.current = setInterval(() => {
        axios.post(refreshTokenApi, {
          "refresh_token": Cookies.get(REFRESH_TOKEN_KEY)
        }).then((res) => {
          const { access_token, refresh_token } = res.data.data.newTokens
          console.log(access_token)
          Cookies.set(ACCESS_TOKEN_KEY, access_token, { expires: 1 / 24 })
          Cookies.set(REFRESH_TOKEN_KEY, refresh_token, { expires: 7 })
        }).catch((err) => {
          console.log(err)
          clearInterval(id.current)
        })
      }, 3600000)
    }
    axios.get(userWithTokenApi, { headers: { "Authorization": `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } })
      .then((res) => {
        dispatch(setUser(res.data.data))
      }).catch(err => {
        console.log(err)
        clearInterval(id.current)
      })
    return () => clearInterval(id.current)
  }, [Cookies])
  return (
    <>
      <Routing />
      <ToastContainer/>
    </>
  );
}

export default App;
