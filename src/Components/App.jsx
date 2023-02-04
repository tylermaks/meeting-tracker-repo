import Nav from "./Nav"
import { Outlet } from "react-router-dom"
import '../Styles/App.scss';

function App() {
  return (
    <>
      <main className="App">
        <Nav />
        <Outlet />
      </main>
    </>
  );
}

export default App;
