import '../assets/main.css';
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import {Route, Switch} from "react-router-dom";


function Main() {
	return (
		<div id="main">
			<div id="side-bar">
				<Header drawer={Drawer} user={{username: 'Malcomputer', name: 'malcolm', image: ''}} />
			</div>
			<div id="content">
				<Header />
				<Switch>
					<Route path="" />
				</Switch>
			</div>
		</div>
	)
}

export default Main;