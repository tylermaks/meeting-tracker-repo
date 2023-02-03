import Nav from "./Nav"
import Login from "./Login";
import Home from "./Home"
import { BrowserRouter as Router, Route } from "react-router-dom"
import '../Styles/App.scss';

function App() {
  return (
    <Router>
      <main className="App">
        <Nav />
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
      </main>
    </Router>
  );
}

export default App;
