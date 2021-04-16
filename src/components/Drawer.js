import '../assets/drawer.css';
import Header from "./Header";
import {Link} from "react-router-dom";
import { useStore } from '../store';

function Drawer() {
	const {username, name, image} = useStore(state => state.currentUser);
	return (
		<div id="drawer">
			<Header user={{username, name, image}} inDrawer />
			<hr />
			<ul id="drawer-list">
				<li><Link to="/friends"><span>Add Friends</span></Link></li>
				<li><Link to="/logout"><span>Logout</span></Link></li>
			</ul>
		</div>
	)
}

export default Drawer;