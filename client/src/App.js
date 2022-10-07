
import Sidebar from "./components/layout/sidebar/Sidebar";
import Rightbar from "./components/layout/rightbar/Rightbar";
import Add from "./components/post/Add";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Feed from "./components/feed/Feed";
import Navbar from "./components/layout/navbar/Navbar";
import { useState, useEffect } from 'react';
import Login from "./components/pages/login/Login";
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


  if (!user) return <Login onLogin={setUser} />;

  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar user={user} setUser={setUser} />
      {/* <Box bgcolor={"background.default"} color={"text.primary"}>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode} />
          <Feed />
          <Rightbar />
        </Stack>
        <Add />
      </Box> */}
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


// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import Navbar from './components/layout/navbar/NavBar';
// import Login from './components/pages/login/Login';
// // import MainFeed from './components/feed/MainFeed';
// import NewProject from './components/post/NewPost';
// import UserProfile from './components/user/UserProfile';
// import Project from './components/post/Post';
// import User from './components/user/User';
// import EditProfile from './components/user/UserProfile';
// // import Dashboard from './components/layout/dashboard/Dashboard';
// import RightBar from './components/layout/rightbar/RightBar';

// import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
// import Sidebar from './components/layout/sidebar/SideBar';
// import Feed from './components/feed/Feed';

// function App() {
//   const [user, setUser] = useState(null);
//   const [mode, setMode] = useState("light");

//   const darkTheme = createTheme({
//     palette: {
//       mode: mode,
//     },
//   });

//   useEffect(() => {
//     fetch("/me").then((r) => {
//       if (r.ok) {
//         r.json().then((user) => setUser(user))
//       }
//     })
//   }, [])

//   if (!user) return <Login onLogin={setUser} />;

//   return (
//     <div className="App">

//       <Router>
//         <Box bgcolor={"background.default"} color={"text.primary"}>
//           {/* <Navbar /> */}
//           <Navbar user={user} setUser={setUser} />
//           <Stack direction="row" spacing={2} justifyContent="space-between"></Stack>
//           <Sidebar setMode={setMode} mode={mode} />
//           <Feed />
//           <RightBar />
//           <Stack />
//         </Box>
//         <Routes>
//           {/* <Route path="/" element={<Dashboard user={user} />}></Route> */}
//           {/* <Route path="/posts" element={<MainFeed user={user} />}></Route> */}
//           <Route path="/new" element={<NewProject user={user} />}></Route>
//           <Route path="/me" element={<UserProfile user={user} />}></Route>
//           <Route path="/users/:id" element={<User />}></Route>
//           <Route path="/posts/:id" element={<Project user={user} />}></Route>
//           <Route path="/me/edit" element={<EditProfile user={user} />}></Route>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;