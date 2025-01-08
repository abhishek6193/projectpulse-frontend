import { createContext } from "react";

export const UserContext = createContext({
    isLoggedIn: false,
    token: null,
    login: () => {},
    logout: () => {},
    userId: null
})
