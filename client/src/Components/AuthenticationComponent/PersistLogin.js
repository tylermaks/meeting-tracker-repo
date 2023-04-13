import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefresh from '../../hooks/useRefresh';
import useAuth from '../../hooks/useAuth';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { auth } = useAuth();
    const refresh = useRefresh();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                console.log("made it to perisit login try block")
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                setIsLoading(false);
            }
        }

        // persist added here AFTER tutorial video
        // Avoids unwanted call to verifyRefreshToken
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, [auth?.accessToken, refresh])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading, auth?.accessToken])

    return (
        <>
            {
                isLoading
                    ? <p>Loading</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin