import * as React from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";

import { Login } from "./screens/Login";
import { Countries } from "./screens/Countries";
import { CountryCovidCases } from "./screens/CountryCovidCases";

import AuthRoute from "./components/AuthRoute";
import NavBar from "./components/NavBar";

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute enableForAuth={false} path="/login">
          <Login />
        </AuthRoute>
        <AuthRoute enableForAuth={true} path="/countries">
          <NavBar />
          <Countries />
        </AuthRoute>
        <AuthRoute enableForAuth={true} path="/countries/:country">
          <NavBar />
          <CountryCovidCases />
        </AuthRoute>
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  );
};
