import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { createBrowserHistory } from 'history';
import App from './Components/App'




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Route history={createBrowserHistory()}>
          <Routes>
            <Route path="/*" element={<App />}/>
          </Routes>
        </Route>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
