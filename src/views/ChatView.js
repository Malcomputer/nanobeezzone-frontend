import {useEffect, useState} from "react";
import "../assets/chatview.css";
import {IoSend} from "react-icons/all";
import {getUser} from "../Api";
import Header from "../components/Header";

function ChatView(props) {
	const [user, setUser] = useState({});
	useEffect(() => {
		if (Object.entries(user).length < 1) getUser(props.match.params.profile).then(setUser)
	}, [user, props.match.params.profile]);
	const expandTextArea = ({target}) => {
		if (target.nodeName !== 'TEXTAREA') return
		target.style.height = '1px';
		target.style.height = `${target.scrollHeight+2}px`;
	}
	return (
		<>
			<Header user={user} />
			<div id="chat-view">
				<div id="text-box">
					<textarea id="chat-textbox" onKeyUp={expandTextArea} />
					<div className="icon send"><IoSend /></div>
				</div>
			</div>
		</>
	)
}

export default ChatView;