import React, { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    const value = { isLoggedIn, setIsLoggedIn };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
