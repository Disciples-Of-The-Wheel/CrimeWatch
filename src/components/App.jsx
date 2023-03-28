import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Login from './Login';
import '../app.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function App() {

  const [user, setUser] = useState(null)

useEffect(() => {
  const getUser = async () => {
    fetch('http://ec2-3-135-195-99.us-east-2.compute.amazonaws.com:8080/auth/login/sucess', {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      }
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error('authentication failed');
    }).then(resObject => {
      setUser(resObject.user)
    }).catch(err => {
      console.error(err);
    })
  };
  getUser();
}, [])

  return (
    <BrowserRouter>
      <div>
        <Navbar user={user}/>
        <Routes>
           <Route path="/" element={ <Login /> } /> 
           <Route path="/dashboard" element={ user ?  <Navigate to="/" />  :  <Dashboard /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
