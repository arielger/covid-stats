import * as React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Login } from "./screens/Login";
import { Countries } from "./screens/Countries";
import { CountryCovidCases } from "./screens/CountryCovidCases";

import { NavBar } from "./components/NavBar";

export const Router = () => (
    <BrowserRouter>
        <NavBar />
        { /* @TODO: Add auth redirection logic */ }
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/countries">
                <Countries />
            </Route>
            <Route path="/countries/:country">
                <CountryCovidCases />
            </Route>
        </Switch>
    </BrowserRouter>
);