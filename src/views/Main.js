import UserInfoCard from "../components/UserInfoCard";
import {Route, Switch} from "react-router-dom";
import Header from "../components/Header";
import Drawer from "../components/Drawer";
import ChatView from "../views/ChatView";
import Friends from "../views/Friends";
import {getMessages, getUser} from "../Api";
import {useStore} from '../store';
import {useEffect, useState} from "react";
import '../assets/main.css';
import SOS from "./sos";
import FriendComponent from "../components/FriendComponent";

function Main() {
	const {username, name, img} = useStore(state => state.currentUser || {username: '', name: '', img: ''});
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		if (messages.length < 1) getMessages(username).then(data => setMessages(Array.from(new Set(data.map(item => item.message_id.split(':').filter(user => user !== username)).flat()))));
	}, [messages.length, username]);
	return (
		<div id="main">
			<div id="side-bar">
				<Header drawer={Drawer} user={{username, name, img}} />
				{messages.map((user, i) => <FriendComponent drawer key={i} user={getUser(user)}/>)}
			</div>
			<div id="content">
				<Switch>
					{/*these renders on the next two routes will be replaced with components.*/}
					<Route exact path="/" render={() => (
						<>
							<Header />
							<h1>Open chat from left column</h1>
						</>
					)} />
					<Route path="/settings" render={() => (<h1>Settings page</h1>)} />
					<Route path="/friends" component={Friends} />
					<Route path="/user/:profile" component={UserInfoCard} />
					<Route path="/chat/:profile" component={ChatView} />
					<Route component={SOS} />
				</Switch>
			</div>
		</div>
	)
}

export default Main;