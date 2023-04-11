import { useContext } from "react";
import UserContext from "../context/UserProvider";

const useAppData = () => { 
    return useContext(UserContext)
}

export default useAppData