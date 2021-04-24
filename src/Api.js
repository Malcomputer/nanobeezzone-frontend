import {ACTIONS} from "./store";
const baseURL = 'https://nanobeezzone.herokuapp.com';

export const signUpRequest = (username, name, password) => {
	return fetch(`${baseURL}/signup`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, name, password }),
	}).then((res) => res.json());
};

export const loginRequest = (username, password) => {
	return fetch(`${baseURL}/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, password }),
	}).then((res) => res.json());
};

export const deleteUser = (token, username) => {
	return fetch(baseURL + "users/" + username, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	}).then((res) => res.json());
};

export const getUserInfo = (username) => {
	console.log(username);
	return fetch(baseURL/`users/${username}`)
		.then((res) => res.json())

		.catch((error) => console.log(error));
};

export const getUserPicture = (username, timestamp) => {
	return fetch(baseURL + `"/users/" + username + "/picture" + "?t=" + timestamp`, {
		method: "GET",
		headers: {
			"Content-Type": "image/png",
		},
	}).then((res) => res);
};

export const putUserPicture = (token, username, image) => {
	let imageFormData = new FormData();
	imageFormData.append("picture", image);

	return fetch(baseURL + `/users/${username} + "/picture"`, {
		method: "PUT",
		headers: {
			Authorization: "Bearer " + token,
		},
		body: imageFormData,
	}).then((res) => res.json());
};

export const updateRequest = (token, username, newUserInfo) => {
	return fetch(baseURL + `/users/${username}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify(newUserInfo),
	});
};

export const getMessages = currentUser => {
	return fetch(`${baseURL}/messages/${currentUser}`, {
		headers: {Authorization: `bearer ${localStorage.getItem(ACTIONS.TOKEN)}`}
	}).then(res => res.json());
}

export const getUsers = () => {
	return fetch(`${baseURL}/users`, {headers: {Authorization: `bearer ${localStorage.getItem(ACTIONS.TOKEN)}`}}).then(res => res.json());
}

export const getUser = (username) => {
	return fetch(`${baseURL}/user/${username}`, {headers: {Authorization: `bearer ${localStorage.getItem(ACTIONS.TOKEN)}`}}).then(res => res.json());
}

export const getMessage = (receiver, sender) => {
	return fetch(`${baseURL}/message/${receiver}/${sender}`, {headers: {Authorization: `bearer ${localStorage.getItem(ACTIONS.TOKEN)}`}}).then(res => res.json());
}

export const sendMessage = newMessage => {
	return fetch(`${baseURL}/message`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			Authorization: `bearer ${localStorage.getItem(ACTIONS.TOKEN)}`},
		body: JSON.stringify({newMessage}),
	}).then(res => res.json());
}