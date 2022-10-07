import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import NavBar from './app/features/layouts/navbar/NavBar';
// import Dashboard from './components/layout/dashboard/Dashboard';
// import Login from './components/pages/Login';
// import Logout from './app/features/sessions/Logout';
// import Signup from './app/features/sessions/Signup';
// import UpdateProfile from './app/features/sessions/UpdateProfile';

// import Profile from './app/features/layouts/profile/Profile';
// import EditProjectForm from './app/features/forms/EditProjectForm';
import Explore from '../../client/src/components/pages/explore/Explore';


import Navbar from './components/layout/navbar/Navbar';
import Login from './components/pages/login/Login';
// import MainFeed from './components/feed/MainFeed';
import Feed from './components/feed/Feed';
import NewPost from './components/post/NewPost';
import Profile from './components/user/UserProfile';
import Post from './components/post/Post';
import User from './components/user/User';
import EditProfile from './components/user/EditProfile';
import Dashboard from './components/layout/dashboard/Dashboard';

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, [])

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="App">
      {/* <Router>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/posts" element={<MainFeed user={user} />}></Route>
          <Route path="/new" element={<NewPost user={user} />}></Route> 
          <Route path="/me" element={<Profile user={user} />}></Route>
          <Route path="/users/:id" element={<User />}></Route>
          <Route path="/posts/:id" element={<Post user={user} />}></Route>
          <Route path="/me/edit" element={<EditProfile user={user} />}></Route>
        </Routes>
      </Router> */}

      <div className="App">
        <Router>
          <header className="App-header">
            <Navbar user={user} setUser={setUser} />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />

              {/* <Route path="/logout" element={
                <Logout />
              } />  */}
              <Route path="/new" element={<NewPost user={user} />} />
              <Route path="/me" element={<Profile user={user} />}></Route>
              <Route path="/me/edit" element={<EditProfile user={user} />}></Route>
              <Route path="/users/:id" element={<User />}></Route>
              <Route path="/posts" element={<Feed user={user} />}></Route>
              <Route path="/posts/:id" element={<Post user={user} />}></Route>
              <Route path="/explore" element={<Explore />} />

              {/* <Route path="/edit-project" element={<EditProjectForm />} />
              <Route path="/profile" element={ <Profile />} />
              <Route path="/update-profile" element={<UpdateProfile /> } />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} /> */}
            </Routes>
          </main>
        </Router>
      </div>
    </div >
  );
}

export default App;
