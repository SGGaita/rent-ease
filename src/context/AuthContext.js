import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import TenantReducer from "./TenantReducer";
import { PropertyProvider } from "./PropertyContext";

const initialState = {
    isAuthenticated: localStorage.getItem("user") ? true : false,
    user: JSON.parse(localStorage.getItem("user")),
    loginError: null,
};

export const AuthContext = createContext({
    state: initialState,
    dispatch: () => { },
});

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            <PropertyProvider>
            <TenantProvider>
                {children}
            </TenantProvider>
            </PropertyProvider>
        </AuthContext.Provider>
    );
};


const initialTenantState = {
    tenant: localStorage.getItem("tenant") ? JSON.parse(localStorage.getItem("tenant")) : null
}

export const TenantContext = createContext({
    state: initialTenantState,
    dispatch: () => { },
});

export const TenantProvider = ({ children }) => {
    const [state, dispatch] = useReducer(TenantReducer, initialTenantState);

    return (
        <TenantContext.Provider value={{ state, dispatch }}>
            {children}
        </TenantContext.Provider>
    );
};



