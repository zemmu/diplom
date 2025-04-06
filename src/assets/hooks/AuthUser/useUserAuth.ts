import { useEffect, useState } from "react";
import { userAuthAPI } from "../../../store/APIs/UserAuth";
import useUserLocalStorage from "./useUserLocalStorage";

const useUserAuth = () => {
    const {getToken, setCreds} = useUserLocalStorage();  
    const [getMe, {data: meData, isLoading: meIsLoading}] = userAuthAPI.useLazyMeQuery();
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {getMe(getToken())}, []);

    useEffect(() => {
        if (!meIsLoading && meData) {             
            setCreds(meData);
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
        
    }, [meData, meIsLoading])
    

    return {isLogged}
};

export default useUserAuth;