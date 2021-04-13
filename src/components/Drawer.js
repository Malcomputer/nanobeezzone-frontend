import '../assets/drawer.css';
import Header from "./Header";
import {Link} from "react-router-dom";

function Drawer() {
	return (
		<div id="drawer">
			<Header user={{username: 'Malcomputer', name: 'malcolm', image: ''}} />
			<hr />
			<ul id="drawer-list">
				<li><Link to="chats">Chats</Link></li>
				<li><Link to="settings">Settings</Link></li>
			</ul>
		</div>
	)
}

export default Drawer;