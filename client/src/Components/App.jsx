import MainNav from "./MainNav"
import { Routes, Route } from "react-router-dom"
import '../Styles/App.scss';

import Authentication from "./Authentication"
import Home from "./Home"

function App() {
  return (
    <>
      <main className="App">
        <MainNav />
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
