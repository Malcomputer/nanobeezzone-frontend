import '../assets/friendcomponent.css';
import profilePlaceHolder from '../images/profile-placeholder.png';
import {Link} from "react-router-dom";
function FriendComponent(props) {
	return (
		<Link to={`/chat/${props.username}`} id='user'>
			<img id='user-image' src={props.img ? props.img : profilePlaceHolder} alt={props.username} />
			<span id='user-name'>{props.name}</span>
		</Link>
	)
}

export default FriendComponent;