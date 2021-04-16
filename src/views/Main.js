import UserInfoCard from "../components/UserInfoCard";
import { Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import ChatView from "../views/ChatView";
import Friends from "../views/Friends";
import { useStore } from "../store";
import "../assets/main.css";
import SOS from "./sos";

function Main() {
  const { username, name, img } = useStore(
    (state) => state.currentUser || { username: "", name: "", img: "" }
  );
  return (
    <div id="main">
      <div id="side-bar">
        <Header drawer={Drawer} user={{ username, name, img }} />
      </div>
      <div id="content">
        <Header />
        <Switch>
          {/*these renders on the next two routes will be replaced with components.*/}
          <Route exact path="/" render={() => <h1>Chats page</h1>} />
          <Route path="/settings" render={() => <h1>Settings page</h1>} />
          <Route path="/friends" component={Friends} />
          <Route path="/user/:profile" component={UserInfoCard} />
          <Route path="/chat/:profile" component={ChatView} />
          <Route component={SOS} />
        </Switch>
      </div>
    </div>
  );
}

export default Main;
