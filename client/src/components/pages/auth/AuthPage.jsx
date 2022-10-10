import React from "react";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { useState } from "react";
import { Box, Button, Container } from "@mui/material";

function AuthPage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Container sx={{ width: "100%" }}>
      <Box
        sx={{
          margin: "10%",
          borderRadius: 3,
          padding: 2,
          width: "20%",
          backgroundColor: "primary.light",
        }}
      >
        <div>
          <h2>ViralNft.art</h2>
          {showLogin ? (
            <>
              <Login onLogin={onLogin} />
              <divider />
              <p>
                Don't have an account?
                <Button
                  className=""
                  color="secondary"
                  onClick={() => setShowLogin(false)}
                >
                  Sign up here
                </Button>
              </p>
            </>
          ) : (
            <>
              <Register onLogin={onLogin} />
              <divider />
              <p>
                Already have an account?
                <Button color="secondary" onClick={() => setShowLogin(true)}>
                  Log in here
                </Button>
              </p>
            </>
          )}
        </div>
      </Box>
    </Container>
  );
}

export default AuthPage;
