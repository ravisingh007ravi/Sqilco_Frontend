import React, { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    const value = { authUser, setAuthUser, isLoggedIn, setIsLoggedIn };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
