import './assets/App.css';
import {useEffect} from "react";

function App({theme}) {
  useEffect(() => {
    document.body.className = theme;
  });
  return (
    <div className="App">

    </div>
  );
}

export default App;
