import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Login } from "./screens/Login";
import { Countries } from "./screens/Countries";
import { CountryCovidCases } from "./screens/CountryCovidCases";

import { NavBar } from "./components/NavBar";

export const Router = () => {
  return (
    <BrowserRouter>
      {/* @TODO: Add auth redirection logic */}
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/countries">
          <NavBar />
          <Countries />
        </Route>
        <Route path="/countries/:country">
          <NavBar />
          <CountryCovidCases />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
