const baseURL = "https://nanobeezzone-backend.herokuapp.com";

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
