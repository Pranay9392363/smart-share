// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "./App.css";

function AppContent() {
  const { user, signOut } = useAuth();
  const [isSigningUp, setIsSigningUp] = useState(true);

  return (
    <div className="app-container">
      {user ? (
        <>
          <Navbar />
          <Home />
          {/*<button onClick={signOut} className="sign-out-button">
            Sign Out
          </button>*/}
        </>
      ) : (
        <div className="auth-container">
          <h1 className="welcome-message">Smart-Share</h1>
          <p className="platform-description">
            Connect, share notes, and collaborate 
          </p>
          {isSigningUp ? <SignUp /> : <SignIn />}
          <button
            onClick={() => setIsSigningUp(!isSigningUp)}
            className="toggle-auth-button"
          >
            {isSigningUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
