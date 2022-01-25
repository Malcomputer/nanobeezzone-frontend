import './assets/App.css';
import {Switch, Route, useHistory} from 'react-router-dom';
import {ACTIONS, useStore} from './store';
import {useEffect} from "react";
import Main from "./views/Main";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Logout from "./components/Logout";
import socketIOClient from "socket.io-client";

function App({theme}) {
  const history = useHistory();
  const {auth, currentUser, dispatch} = useStore();
  useEffect(() => {
    document.body.className = theme;
    if (!auth) history.push('/login');
  });
  useEffect(() => {
    if (auth) {
      const socket = socketIOClient("/");
      socket.emit('active-user', currentUser.username);
      dispatch({type: ACTIONS.SOCKET, payload: socket});
    }
  }, [currentUser])
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={Main} />
      </Switch>
    </div>
  );
}

export default App;
