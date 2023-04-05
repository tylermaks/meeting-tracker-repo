import { createContext, useState } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    //Takes data from login to use throughout components
    const [auth, setAuth] = useState({})

    return (
        <AuthContext.Provider value ={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext