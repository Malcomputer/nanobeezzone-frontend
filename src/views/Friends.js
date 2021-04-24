import {useEffect, useState} from "react";
import {getUsers} from "../Api";
import FriendComponent from "../components/FriendComponent";
import Header from "../components/Header";

function Friends() {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		if (users.length < 1) getUsers().then(setUsers);
	}, [users.length]);
	return (
		<>
			<Header title="Find Friends" />
			<div id="user-list">
				{users.map(user => <FriendComponent key={user._id} user={user} />)}
			</div>
		</>
	)
}

export default Friends;