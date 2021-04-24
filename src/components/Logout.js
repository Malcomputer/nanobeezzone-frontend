import {useEffect} from "react";
import {ACTIONS} from "../store";
import {useHistory} from "react-router-dom";

function Logout() {
	const history = useHistory();
	useEffect(() => {
		localStorage.removeItem(ACTIONS.TOKEN);
		localStorage.removeItem(ACTIONS.CURRENTUSER);
		history.push('/login');
	});
	return (<></>)
}

export default Logout;