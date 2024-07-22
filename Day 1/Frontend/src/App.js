import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './component/Navbar/Navbar';
import DashBoard from './pages/Dashboard';
import { useEffect, useState } from 'react';

function App() {
  const [token, setToken] = useState("");
  const [user_id, setUID] = useState(0);
  const [usertype, setUserType] = useState(0);
  const [isRegister, setIsRegister] = useState(-1);
  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);

      const uid = window.localStorage.getItem("uid");
      const user_type = window.localStorage.getItem("user_type");
      const isRegister = window.localStorage.getItem("isregister");
      if (storedToken && uid && user_type && isRegister) {
        setUID(parseInt(uid));
        setUserType(parseInt(user_type));
        setIsRegister(parseInt(isRegister));
      }
    }
  }, []);
  return (
    <>
    <Navbar />
    <Routes>
    {isRegister == 0 ? (
            <>
               <Route path="/" element={<DashBoard />} />
            </>
          ) : isRegister == 1 ? (
            <>
              {/* Check usertype for coordinator */}
              {
                usertype === 1 ? (
                  <>
                   {/* Check usertype for stuednt */}
                  <Route path="/"   element={<DashBoard /> } />
             
                    {/* Check usertype for student */}
                   </>
                ) : usertype === 2 ? (
                  <>
                    {/* co-ordinator routes */}
                    <Route path="/" element={<DashBoard />} />
                    {/* co-ordinator routes */}
                  </>
                ) : usertype === 3(
                  <>
                   <Route path="/" element={<DashBoard />} />
                  </>
                ) /* Handle other user types as needed */
              }
            </>
          ) : (
            // Otherwise, redirect to home page if isRegister is 1
            <>
                <Route path='/' element={<Login/>} ></Route>
                <Route path='/register' element={<Register />}></Route>
            </>
          )}
  
     
    </Routes>
    </>
  );
}

export default App;
