import "../assets/signup.css";
import logo from '../images/logo.png';
import React, {useState} from "react";
import {Button, Form, Grid, Header, Icon, Message, Segment} from "semantic-ui-react";
import {Link, useHistory} from "react-router-dom";
import {signUpRequest} from "../Api";

function Signup() {
	const history = useHistory();
	const [userInput, setUserInput] = useState({});
	const [errors, setErrors] = useState([]);

	const displayErrors = (errors) => errors.map((error, i) => <p key={i}>{error.message}</p>);

	const handleChange = ({target}) => {
		setUserInput(state => ({...state, [target.name]: target.value}));
	};

	const handleInputError = (errors, inputName) => {
		return errors?.some((error) => error.message.toLowerCase().includes(inputName)) ? "error" : "";
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors(() => []);
		if (userInput.password === userInput.passwordConfirmation) {
			signUpRequest(userInput.username, userInput.name, userInput.password).then(data => {
				if (data.error) {
					if (data.error.status === 401) setErrors(errors => [...errors, {message: data.error.message}]);
				} else {
					if (data.success.status === 201) history.push('/login');
				}
			});
		} else {
			setErrors(errors => [...errors, {message: 'password does not match'}])
		}
	}

	return (
		<Grid textAlign="center" verticalAlign="middle" className="signup-form">
			<Grid.Column style={{maxWidth: 450}}>
				<Header as="h2" icon color="#5B0909" textAlign="center">
					{/*<Icon name="puzzle piece" color="orange" />*/}
					<img src={logo} alt='NanoBeezZone' id="logo" />
					Register for NanoBeezZone
				</Header>
				<Form size="large" onSubmit={handleSubmit}>
					<Segment stacked>
						<Form.Input
							fluid
							name="name"
							icon="user"
							iconPosition="left"
							placeholder="Name"
							onChange={handleChange}
							className={handleInputError(errors, "name")}
							type="text"
						/>
						<Form.Input
							fluid
							name="username"
							icon="user"
							iconPosition="left"
							placeholder="Username"
							onChange={handleChange}
							className={handleInputError(errors, "username")}
							type="text"
						/>

						{/*<Form.Input*/}
						{/*	fluid*/}
						{/*	name="email"*/}
						{/*	icon="mail"*/}
						{/*	iconPosition="left"*/}
						{/*	placeholder="Email Address"*/}
						{/*	onChange={handleChange}*/}
						{/*	type="email"*/}
						{/*/>*/}

						<Form.Input
							fluid
							name="password"
							icon="lock"
							iconPosition="left"
							placeholder="Password"
							onChange={handleChange}
							className={handleInputError(errors, "password")}
							type="password"
						/>

						<Form.Input
							fluid
							name="passwordConfirmation"
							icon="repeat"
							iconPosition="left"
							placeholder="Password Confirmation"
							onChange={handleChange}
							className={handleInputError(errors, "password")}
							type="password"
						/>

						<Button fluid size="large">
							Submit
						</Button>
					</Segment>
				</Form>
				{errors?.length > 0 && (
					<Message error>
						<h3>Error</h3>
						{displayErrors(errors)}
					</Message>
				)}
				<Message>
					Already a user? <Link to="/login">Login</Link>
				</Message>
			</Grid.Column>
		</Grid>
	);
}

export default Signup;
