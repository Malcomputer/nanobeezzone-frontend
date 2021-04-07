const baseURL = 'https://nanobeezzone-backend.herokuapp.com';

export const signUpRequest = (username, name, password) => {
	return fetch(`${baseURL}/signup`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({username, name, password})
	}).then((res) => res.json());
};

export const loginRequest = (username, password) => {
	return fetch(`${baseURL}/login`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({username, password})
	}).then((res) => res.json());
};