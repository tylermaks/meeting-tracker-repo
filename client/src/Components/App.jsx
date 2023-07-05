import { Routes, Route } from "react-router-dom"
import Authentication from "./AuthenticationComponent/Authentication"
import RequireAuth from "./AuthenticationComponent/RequireAuth";
import Unauthorized from "./AuthenticationComponent/Unauthorized";
import PersistLogin from "./AuthenticationComponent/PersistLogin";

import Home from "./HomeComponent/Home";
import '../Styles/App.scss';
import axios from "axios";


function App() {

  return (
    <>
      <main className="App">
          <Routes>
            <Route path="/" element={<Authentication />} />
           <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Unauthorized />} />
            <Route path="home" element={<Home />} />

            {/* PROTECTED ROUTE */}
            <Route element={<PersistLogin />}> 
              <Route element={<RequireAuth allowedRoles={[2001]} />}>
                  <Route path="home" element={<Home />} />
              </Route>
            </Route>
          </Routes>
      </main>
    </>
  );
}

export default App;