import '../assets/main.css';
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import {Route, Switch} from "react-router-dom";
import SOS from "./sos";


function Main() {
	return (
		<div id="main">
			<div id="side-bar">
				<Header drawer={Drawer} user={{username: 'Malcomputer', name: 'malcolm', image: ''}} />
			</div>
			<div id="content">
				<Header />
				<Switch>
					{/*these renders on the next two routes will be replaced with components.*/}
					<Route path="/chats" render={() => (<h1>Chats page</h1>)} />
					<Route path="/settings" render={() => (<h1>Settings page</h1>)} />
					<Route>
						<SOS />
					</Route>
				</Switch>
			</div>
		</div>
	)
}

export default Main;