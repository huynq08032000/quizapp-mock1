import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { userWithTokenApi } from './config/API';
import axiosInstance from './config/customAxios';
import { ACCESS_TOKEN_KEY } from './config/token';
import { setUser } from './redux/userSlice';
import Routing from './Routes/Routing';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    axiosInstance.get('/v1/user/my-profile', { headers: { 'Authorization': `Bearer ${Cookies.get(ACCESS_TOKEN_KEY)}` } })
      .then(res => dispatch(setUser(res.data.data)))
      .catch(err => {
        console.log(err)
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
