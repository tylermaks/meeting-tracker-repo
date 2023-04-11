import { Routes, Route, HashRouter } from "react-router-dom"
import Authentication from "./AuthenticationComponent/Authentication"
import RequireAuth from "./AuthenticationComponent/RequireAuth";
import Unauthorized from "./AuthenticationComponent/Unauthorized";

import Home from "./HomeComponent/Home";
import '../Styles/App.scss';


function App() {
  return (
    <>
      <main className="App">
        <HashRouter>
          <Switch>
            <Route path="/" element={<Authentication />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Unauthorized />} />

            {/* PROTECTED ROUTE */}
            <Route element={<RequireAuth allowedRoles={[2001]} />}>
              <Route path="home" element={<Home />} />
            </Route>
          </Switch>
        </HashRouter>
      </main>
    </>
  );
}

export default App;
