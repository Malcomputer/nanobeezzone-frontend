import {useEffect} from "react";
import "../assets/chatview.css";
import {IoSend} from "react-icons/all";

function ChatView(props) {
	useEffect(() => {
		console.log(props.match.params.profile);
	});
	const expandTextArea = ({target}) => {
		if (!target.nodeName === 'TEXTAREA') return
		target.style.height = '1px';
		target.style.height = `${target.scrollHeight+2}px`;
		// console.log(target.scrollHeight);
	}
	return (
		<div id="chat-view">
			<div id="text-box">
				<textarea id="chat-textbox" onKeyUp={expandTextArea} />
				<div className="icon send"><IoSend /></div>
			</div>
		</div>
	)
}

export default ChatView;