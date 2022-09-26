import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN_KEY, USER } from './config/token';
import { setUser } from './redux/userSlice';
import Routing from './Routes/Routing';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const user = Cookies.get(USER)
    const access_token = Cookies.get(ACCESS_TOKEN_KEY)
    dispatch(setUser(JSON.parse(user)))
  }, [])
  return (
    <>
      <Routing />
    </>
  );
}

export default App;
