import "../assets/login.css";
import logo from "../images/logo.png";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { useEffect, useState } from "react";
import { loginRequest } from "../Api";
import { ACTIONS, useStore } from "../store/";

function Login() {
  const history = useHistory();
  const { dispatch } = useStore();
  const [state, setState] = useState({
    username: "",
    password: "",
    errors: [],
    loading: false,
  });
  const { username, password, errors, loading } = state;

  useEffect(() => {
    if (localStorage.getItem(ACTIONS.TOKEN)) history.push("/");
  });

  const displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  const handleChange = (event) => {
    setState((state) => ({
      ...state,
      ...{ [event.target.name]: event.target.value },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid(state)) {
      setState({ errors: [], loading: true });
      loginRequest(state.username, state.password).then((data) => {
        if (data.error)
          return setState({ errors: [{ message: data.error.message }] });
        dispatch({ type: ACTIONS.SETUSER, data });
      });
    }
  };

  const isFormValid = ({ username, password }) => username && password;

  const handleInputError = (errors, inputName) => {
    return errors?.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" className="login-form">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon textAlign="center">
          <img src={logo} alt="NanoBeezZone" id="logo" />
          Login to NanoBeezZone
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={handleChange}
              value={username}
              className={handleInputError(errors, "username")}
              type="text"
            />

            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              onChange={handleChange}
              value={password}
              className={handleInputError(errors, "password")}
              type="password"
            />

            <Button
              disabled={loading}
              className={loading ? "loading" : ""}
              fluid
              size="large"
            >
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
          Don't have an account? <Link to="/Signup">Signup</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Login;
