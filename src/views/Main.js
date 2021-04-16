import "../assets/main.css";
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import { Route, Switch } from "react-router-dom";
import SOS from "./sos";
import UserInfoCard from "../components/UserInfoCard";
import { useStore } from "../store";
import UpdateUserForm from "../components/UpdateUserForm";

function Main() {
  const { currentUser } = useStore();
  return (
    <div id="main">
      <div id="side-bar">
        <Header
          drawer={Drawer}
          user={{
            username: currentUser.username,
            name: currentUser.name,
            image: "",
          }}
        />
      </div>
      <div id="content">
        <Header />
        <Switch>
          {/*these renders on the next two routes will be replaced with components.*/}
          <Route path="/chats" render={() => <h1>Chats page</h1>} />
          <Route path="/settings" render={() => <h1>Settings page</h1>} />
          <Route path="/user/:profile" component={UserInfoCard} />
          <Route component={SOS} />
        </Switch>
      </div>
    </div>
  );
}

export default Main;
