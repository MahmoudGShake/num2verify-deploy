import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context";

export default function ProtectedRoute({checkType, children}) {
    const {loading, userToken} = useAuth();

    if (checkType == "IsLoggedIn" && userToken && !loading) {
        return <Navigate to="/" />;
    }

    if (checkType == "IsNotLoggedIn" && !userToken && !loading) {
        console.log(userToken)
        return <Navigate to="/signin" />;
    }
    return children;
};