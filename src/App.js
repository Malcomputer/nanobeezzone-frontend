import "./assets/App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import { useStore } from "./store";
import { useEffect } from "react";
import Main from "./views/Main";
import Login from "./views/Login";
import Signup from "./views/Signup";
import "semantic-ui-css/semantic.min.css";

function App({ theme }) {
  const history = useHistory();
  const { auth } = useStore();
  useEffect(() => {
    document.body.className = theme;
    if (!auth) history.push("/login");
  });
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
          <SOS />
      </Switch>
    </div>
  );
}

export default App;
