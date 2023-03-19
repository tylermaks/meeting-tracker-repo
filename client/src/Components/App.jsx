import { Routes, Route } from "react-router-dom"
import Authentication from "./Authentication"
import RequireAuth from "./RequireAuth";
import Unauthorized from "./Unauthorized";

import Home from "./Home"
import '../Styles/App.scss';


function App() {
  return (
    <>
      <main className="App">
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
