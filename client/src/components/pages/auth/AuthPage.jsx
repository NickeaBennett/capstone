import React from "react";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { useState } from "react";

function AuthPage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="div-login">
      <wrapper>
        <h2>ViralNft.art</h2>
        <div
          style={{ height: "10px", width: "10px", alignSelf: "center" }}
        ></div>
        {showLogin ? (
          <>
            <Login onLogin={onLogin} />
            <divider />
            <p>
              New?
              <button
                className=""
                color="secondary"
                onClick={() => setShowLogin(false)}
              >
                Sign up here
              </button>
            </p>
          </>
        ) : (
          <>
            <Register onLogin={onLogin} />
            <divider />
            <p>
              Not new?
              <button color="secondary" onClick={() => setShowLogin(true)}>
                Log in here
              </button>
            </p>
          </>
        )}
      </wrapper>
    </div>
  );
}

export default AuthPage;
