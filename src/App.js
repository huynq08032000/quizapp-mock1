import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { userWithTokenApi } from './config/API';
import { ACCESS_TOKEN_KEY } from './config/token';
import { setUser } from './redux/userSlice';
import Routing from './Routes/Routing';
function App() {
  return (
    <>
      <Routing />
      <ToastContainer />
    </>
  );
}

export default App;
