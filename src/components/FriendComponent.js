import '../assets/friendcomponent.css';
import profilePlaceHolder from '../images/profile-placeholder.png';
import {useEffect, useState} from "react";
function FriendComponent(props) {
	const [user, setUser] = useState({});
	useEffect(() => {
		if (props.user.username) setUser(props.user);
		else props.user.then(setUser);
	}, [props.user]);
	return (
		<a href={`/chat/${user.username}`} id='user'>
			{!props.drawer && <img id='user-image' src={user.img ? user.img : profilePlaceHolder} alt={user.username} />}
			<span id='user-name'>{user.name}</span>
		</a>
	)
}

export default FriendComponent;