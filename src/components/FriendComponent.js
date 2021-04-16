import '../assets/friendcomponent.css';
import profilePlaceHolder from '../images/profile-placeholder.png';
function FriendComponent(props) {
	return (
		<div id='user'>
			<img id='user-image' src={props.img ? props.img : profilePlaceHolder} alt={props.username} />
			<span id='user-name'>{props.name}</span>
		</div>
	)
}

export default FriendComponent;