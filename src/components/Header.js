import "../assets/header.css";
import profilePlaceholder from "../images/profile-placeholder.png";
import { GiHamburgerMenu, RiSettingsFill } from "react-icons/all";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Drawer } from "@material-ui/core";

function Header(props) {
  const [state, setState] = useState({ showDrawer: false });
  useEffect(() => {
    // if (props.username) getUser(props.username); // not working yet
    setState((state) => ({ ...state, showDrawer: false }));
  }, []);
  const toggleDrawer = (drawerState) =>
    setState((state) => ({ ...state, showDrawer: drawerState }));
  return (
    <div id="header">
      <div id="header-info">
        {props.drawer && (
          <button onClick={() => toggleDrawer(!state.showDrawer)}>
            <GiHamburgerMenu style={{ height: "32px", width: "32px" }} />
          </button>
        )}
        {props.drawer && (
          <Drawer
            anchor="left"
            open={state.showDrawer}
            onClose={() => toggleDrawer(false)}
          >
            <props.drawer />
          </Drawer>
        )}
        {props.user && (
          <img
            style={{
              height: "50px",
              width: "50px",
              margin: "0 5px",
              borderRadius: "50%",
            }}
            src={props.user.image || profilePlaceholder}
            alt={props.user.username}
          />
        )}
        {props.user && (
          <div id="user-info">
            <div id="name">{props.user.name}</div>
            <div id="username">{`@${props.user.username}`}</div>
          </div>
        )}
      </div>
      <div id="header-options">
        {props.inDrawer && (
          <Link to={`/user/${props.user.username}`}>
            <RiSettingsFill />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
