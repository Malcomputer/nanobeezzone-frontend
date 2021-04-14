import profilePlaceholder from '../images/profile-placeholder.png';
import {GiHamburgerMenu} from 'react-icons/all';
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {Drawer} from "@material-ui/core";
import '../assets/header.css';

function Header(props) {
	const location = useLocation();
	const [state, setState] = useState({showDrawer: false});
	useEffect(() => {
		// if (props.username) getUser(props.username); // not working yet
		setState({showDrawer: false});
	}, [location]);
	const toggleDrawer = (drawerState) => {
		setState(state => ({showDrawer: drawerState}))
	}
	return (
		<div id="header">
			{props.drawer && <button onClick={() => toggleDrawer(!state.showDrawer)}><GiHamburgerMenu style={{height: '32px', width: '32px'}} /></button>}
			{props.drawer &&
			<Drawer anchor="left" open={state.showDrawer} onClose={() => toggleDrawer(false)}>
				<props.drawer />
			</Drawer>}
			{props.user && <img style={{height: '70px', width: '70px'}} src={props.user.image || profilePlaceholder} alt="" />}
			{props.user && <div id="user-info">
				<div id="name">{props.user.name}</div>
				<div id="username">{`@${props.user.username}`}</div>
			</div>}
		</div>
	)
}

export default Header;