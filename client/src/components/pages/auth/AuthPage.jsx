import React, { useState } from "react";
// import logo from "./logo.svg";
import "./Auth.css";
import Login from "./Login";
import Register from "./Register";

function AuthPage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // };

  return (
    <div className="Auth">
      {showLogin ? (
        <>
          <Login onLogin={onLogin} />
          <p>
            Don't have an account? Register here.
            <button
              className=""
              color="secondary"
              onClick={() => setShowLogin(false)}
            >
              Signup
            </button>
          </p>
        </>
      ) : (
        <>
          <Register onLogin={onLogin} />
          <p>
            Already have an account? Login here.
            <button color="secondary" onClick={() => setShowLogin(true)}>
              Login
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default AuthPage;
