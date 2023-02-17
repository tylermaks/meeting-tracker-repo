import MainNav from "./MainNav"
import Authentication from "./Authentication"
import Home from "./Home"
import RequireAuth from "./RequireAuth";
import { Routes, Route } from "react-router-dom"
import '../Styles/App.scss';
import Unauthorized from "./Unauthorized";


function App() {
  return (
    <>
      <main className="App">
        <MainNav />
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* PROTECTED ROUTE */}
          <Route element={<RequireAuth allowedRoles={[2001]} />}>
            <Route path="home" element={<Home />} />
          </Route>

        </Routes>
      </main>
    </>
  );
}

export default App;
