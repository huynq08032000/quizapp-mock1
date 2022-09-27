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
    const access_token = Cookies.get(ACCESS_TOKEN_KEY)
    if (access_token) {
      const user = Cookies.get(USER)
      dispatch(setUser(JSON.parse(user)))
    }
  }, [])
  return (
    <>
      <Routing />
    </>
  );
}

export default App;
