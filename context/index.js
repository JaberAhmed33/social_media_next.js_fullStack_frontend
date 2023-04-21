import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const UserContext = createContext();

function UserProvider({children}) {

    const [state, setState] = useState({
        user:{},
        token: ""
    });

    useEffect(() => {
        setState(JSON.parse(window.localStorage.getItem("auth")));
    },[]);

    const router = useRouter();

    const token = state && state.token ? state.token : "";
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios.interceptors.response.use(
        function (response){
            return response;
        },
        function (err) {
            let res = err.response;
            if(res.status === 401 && res.config && !res.config._isRequest){
                setState(null);
                window.localStorage.removeItem("auth");
                toast.error(`${res.statusText} !, login again.`);
                router.push("/login");
            }
            return Promise.reject(err);
        }
    );

    return ( 
        <UserContext.Provider value={[state, setState]}>
            {children}
        </UserContext.Provider>
     );
}

export  {UserContext, UserProvider};