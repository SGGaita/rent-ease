import React from 'react';
import { Sidebar, Navbar } from '../components/index'
import { useLocation } from "react-router-dom";

export const Layout = ({ children }) => {
    const location = useLocation();
    const shouldShowLayout = location.pathname !== "/" && location.pathname !== "/signup";

    return (
        <div className="main">
            {shouldShowLayout && <Sidebar />}
            <div className="container">
                {shouldShowLayout && <Navbar />}
                <div className="content">{children}</div>
            </div>
        </div>
    );
};


