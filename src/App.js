import './assets/App.css';
import {Switch, Route, useHistory} from 'react-router-dom';
import {useStore} from './store';
import {useEffect} from "react";
import Main from "./views/Main";
import Login from "./views/Login";
import Signup from "./views/Signup";
import SOS from "./views/sos";

function App({theme}) {
  const history = useHistory();
  const {currentUser} = useStore();
  useEffect(() => {
    document.body.className = theme;
    if (!currentUser) history.push('/login');
  });
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route>
          <SOS />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
