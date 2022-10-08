import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "./components/layout/navbar/Navbar";
import { useState, useEffect } from 'react';
import Auth from "./components/pages/auth/AuthPage";
import User from "./components/user/User";
import NewPost from "./components/post/Add";
import Post from "./components/post/Post";
import UserProfile from "./components/user/UserProfile";
import EditProfile from "./components/user/EditProfile";
import Explore from "./components/pages/explore/Explore";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/pages/home/Home";


function App() {
  const [mode, setMode] = useState("light");
  const [user, setUser] = useState(null)

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, [])


  if (!user) return <Auth onLogin={setUser} />;

  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar user={user} setUser={setUser} />
      <Router>
        <Routes>
          <Route path="/" element={<Home user={user} />}></Route>
          {/* <Route path="/posts" element={<Feed user={user} />}></Route> */}
          <Route path="/new" element={<NewPost user={user} />}></Route>
          <Route path="/me" element={<UserProfile user={user} />}></Route>
          <Route path="/users/:id" element={<User />}></Route>
          <Route path="/posts/:id" element={<Post user={user} />}></Route>
          <Route path="/me/edit" element={<EditProfile user={user} />}></Route>
          <Route path="/explore" element={<Explore user={user} />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;