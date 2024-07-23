import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './component/Navbar/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UserSelection from './component/Admin/User Selection/UserSelection';
import './App.css';

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
        {isRegister === 0 ? (
          <Route path="/" element={<Dashboard />} />
        ) : isRegister === 1 ? (
          <>
            {usertype === 1 && (
              <>
                {/* Student routes */}
                <Route path="/" element={<Dashboard />} />
              </>
            )}
            {usertype === 2 && (
              <>
                {/* Coordinator routes */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/userselection" element={<UserSelection />} />
              </>
            )}
            {usertype === 3 && (
              <>
                {/* Other user types */}
                <Route path="/" element={<Dashboard />} />
              </>
            )}
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
