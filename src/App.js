import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { userWithTokenApi } from './config/API';
import { ACCESS_TOKEN_KEY } from './config/token';
import { setUser } from './redux/userSlice';
import Routing from './Routes/Routing';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get(userWithTokenApi, { headers: { 'Authorization': `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } })
      .then(res => dispatch(setUser(res.data.data)))
      .catch(err => {
        console.log(err)
        localStorage.clear()
      })
  },[dispatch])
  return (
    <>
      <Routing />
      <ToastContainer />
    </>
  );
}

export default App;
