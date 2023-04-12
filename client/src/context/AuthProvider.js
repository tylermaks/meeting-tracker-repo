import { createContext, useState } from "react";


const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    //Takes data from login to use throughout components
    const [auth, setAuth] = useState({})
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    return (
        <AuthContext.Provider value ={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext