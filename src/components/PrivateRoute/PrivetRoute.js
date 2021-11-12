import { Redirect, Route } from "react-router";
import React, { useContext } from "react";
import { UserContext } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {

    const [userLoggedIn, setUserLoggedIn] = useContext(UserContext);
    // setUserLoggedIn(userLoggedIn);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                (userLoggedIn.email || sessionStorage.getItem('token')) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;