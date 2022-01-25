import {useEffect, useState} from "react";
import "../assets/chatview.css";
import {getUser, getMessage, sendMessage} from "../Api";
import Header from "../components/Header";
import ChatBox from "react-chat-plugin";
import {useStore} from "../store";

function ChatView(props) {
	const {currentUser: {username, image}, socket} = useStore();
	const [user, setUser] = useState({});
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		if (Object.entries(user).length < 1) getUser(props.match.params.profile).then(setUser);
		if (messages.length < 1) getMessage(props.match.params.profile, username).then(data => {
			if (data.length < 1) {
				setMessages([{
					text: 'No Messages',
					timestamp: +new Date(),
					type: 'notification'
				}]);
			} else {
				setMessages(data);
			}
		});
		if (Object.entries(user).length < 1) getUser(props.match.params.profile).then(setUser);
		const textBoxElement = document.getElementsByClassName('react-chat-textarea')[0];
		textBoxElement.addEventListener('keydown', expandTextArea);
		return () => {
			textBoxElement.removeEventListener('keydown', expandTextArea);
		}
	}, [user, props.match.params.profile, messages.length, username]);
	useEffect(() => {
		if (socket) socket.on('send-message', instantMessage => setMessages(state => [...state, instantMessage]));
	}, [socket]);
	const expandTextArea = ({target}) => {
		if (target.nodeName !== 'TEXTAREA') return
		target.style.height = '1px';
		target.style.height = `${target.scrollHeight+2}px`;
	}
	const handleOnSendMessage = text => {
		const newMessage = {message_id: `${username}:${props.match.params.profile}`, author: {username, id: username, avatarUrl: image}, text, receiver: props.match.params.profile, type: 'text', timestamp: +new Date()};
		setMessages(state => [...state, newMessage]);
		sendMessage(newMessage).then(console.log);
	}
	return (
		<>
			<Header user={user} />
			<div id="chat-view">
				<ChatBox style={{height: '100%', maxWidth: 'unset'}} userId={username} onSendMessage={handleOnSendMessage}
				         messages={messages.sort(({timestamp: a}, {timestamp: b}) => a - b)} />
			</div>
		</>
	)
}

export default ChatView;