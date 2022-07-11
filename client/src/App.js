import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const user = true;
  return (
    <Router>
    <Switch>
      <Route exact path="/">
        {user ? <Home /> : <Redirect to="/register" />}
      </Route>
      <Route exact path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
      <Route exact path="/register">
        {user ? <Redirect to="/" /> : <Register />}
      </Route>
      <Route exact path="/profile/:username">
        <Profile />
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
