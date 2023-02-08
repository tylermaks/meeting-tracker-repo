import MainNav from "./MainNav"
import { Outlet } from "react-router-dom"
import '../Styles/App.scss';

function App() {
  return (
    <>
      <main className="App">
        <MainNav />
        <Outlet />
      </main>
    </>
  );
}

export default App;
