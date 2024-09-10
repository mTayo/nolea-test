import React from "react";
import { Outlet } from "react-router-dom";

const HomePageLayout = () => {
    return(
        <div>
            Homepage layout
            <Outlet />
        </div>
    )
};

export default HomePageLayout;