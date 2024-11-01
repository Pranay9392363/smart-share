import './Navbar.css'
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await signOut();
    navigate("/signin"); // Redirect to Sign In page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Smart Share</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {user && (
          <>
            <li>
              <Link to="/create-post">Create Post</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogOut} className="logout-button">Log Out</button>
            </li>
          </>
        )}
        {!user && (
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
