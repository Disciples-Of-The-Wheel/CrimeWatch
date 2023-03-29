import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({user}) {
  return (
    <div className="navbar">
      <span className="logo">
         <Link className="link" to="/">CrimeWatch</Link>
      </span> {
        user ? (
      <ul className="list">
        <li className="listItem">Michael G</li>
        <li className="listItem">Logout</li>
      </ul>
      ) : (<Link className="link" to="/login">Login</Link>)
    }
    </div>
  );
}

export default Navbar;
