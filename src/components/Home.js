// src/components/Home.js
import './Styles.css';
import React from "react";
import Navbar from './Navbar.js';
import { useAuth } from "../context/AuthContext";
import CreatePost from './CreatePost.js';
import Feed from './Feed/Feed.js';

function Home() {
  const { user, signOut } = useAuth();

  return (
    <div>
      <h2>Welcome : {user?.displayName || 'Guest'}</h2>
      
      <Feed />
      {/*<button onClick={signOut}>Log Out</button>*/}
    </div>
  );
}

export default Home;
