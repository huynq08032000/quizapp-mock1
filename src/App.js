import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import axiosInstance from './config/customAxios';
import { setUser } from './redux/userSlice';
import Routing from './Routes/Routing';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    axiosInstance.get('/v1/user/my-profile')
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
