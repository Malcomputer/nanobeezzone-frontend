import "./assets/App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import { useStore } from "./store";
import { useEffect } from "react";
import Main from "./views/Main";
import Login from "./views/Login";
import Signup from "./views/Signup";
import "semantic-ui-css/semantic.min.css";
// import SOS from "./views/SOS";

function App({ theme }) {
  const history = useHistory();
  const { auth, currentUser } = useStore();
  useEffect(() => {
    document.body.className = theme;
    if (!auth) history.push("/login");
    console.log(currentUser);
  });
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/" component={Main} />
      </Switch>
    </div>
  );
}

export default App;
