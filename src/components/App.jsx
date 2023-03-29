import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Login from './Login';
import '../app.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = () => {
      fetch("/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar user={user}/>
        <Routes>
           <Route path="/" element={ user ?  <Dashboard /> : <Navigate to="/login" />} /> 
           <Route path="/login" element={ user ? <Navigate to="/" /> : <Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
