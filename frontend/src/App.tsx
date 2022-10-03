import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './app/features/layouts/navbar/NavBar';
import Dashboard from './app/features/layouts/dashboard/Dashboard';
import PrivateRoute from './app/features/routes/PrivateRoute';
import PublicOnlyRoute from './app/features/routes/PublicOnlyRoute';
import Login from './app/features/sessions/Login';
import Logout from './app/features/sessions/Logout';
import PersistLogin from './app/features/sessions/PersistLogin';
import Signup from './app/features/sessions/Signup';
import UpdateProfile from './app/features/sessions/UpdateProfile';

function App() {

  return (

    <div className="App">
      <Router>
        <header className="App-header">
          <NavBar />
        </header>
        <main>
          <Routes>
            <Route element={<PersistLogin />}>
              <Route path="/" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/logout" element={
                <PrivateRoute>
                  <Logout />
                </PrivateRoute>
              } />
              <Route path="/update-profile" element={
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              } />
              <Route path="/login" element={
                <PublicOnlyRoute>
                  <Login />
                </PublicOnlyRoute>
              } />
              <Route path="/signup" element={
                <PublicOnlyRoute>
                  <Signup />
                </PublicOnlyRoute>
              } />
            </Route>
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
