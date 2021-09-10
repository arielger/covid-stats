import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "../modules/auth";

export interface ProtectedRouteProps extends RouteProps {
  enableForAuth: boolean;
}

function AuthRoute({ enableForAuth, ...routeProps }: ProtectedRouteProps) {
  const { children, ...otherRouteProps } = routeProps;
  const { auth } = useAuth();

  return (
    <Route
      render={({ location }) =>
        auth.isAuthenticated === enableForAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: enableForAuth ? "/login" : "/countries",
              state: { from: location },
            }}
          />
        )
      }
      {...otherRouteProps}
    />
  );
}

export default AuthRoute;
