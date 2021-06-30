// import { svg } from 'd3';
// import {circle} from 'd3';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavBar from "./navbar"

// const d3 = require("d3");

const FaceCircle = (props) => (
  <circle r={props.r} fill={props.color}/>
);

function Home() {
  return(
    <div className="App">
      <header className="App-header">
        <svg width="960" height="500">
          <FaceCircle r = "245" color = "yellow"/>
          <FaceCircle r = "100" color = "blue"/>
        </svg>
        <p>
          Hello World!
        </p>
      </header>
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}

function ShowRecord() {
  return <h2>Show Record</h2>;
}

function App() {
  return (
    <Router>
        <div>
          <NavBar></NavBar>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/show_record">
              <ShowRecord />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
