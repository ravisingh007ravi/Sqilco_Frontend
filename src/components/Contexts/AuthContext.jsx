import React, { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [UserImage, setUserImage] = useState(null);
    const [userData, setUserData] = useState({});

    const value = { isLoggedIn, setIsLoggedIn, UserImage, setUserImage, userData, setUserData };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
