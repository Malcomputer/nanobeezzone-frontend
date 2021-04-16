import '../assets/drawer.css';
import Header from "./Header";
import {Link} from "react-router-dom";
import { useStore } from '../store';

function Drawer() {
	const {currentUser} = useStore();
	return (
		<div id="drawer">
			<Header user={{username: currentUser.username, name: currentUser.name, image: ''}} />
			<hr />
			<ul id="drawer-list">
				<li><Link to="chats">Chats</Link></li>
				<li><Link to="settings">Settings</Link></li>
			</ul>
		</div>
	)
}

export default Drawer;