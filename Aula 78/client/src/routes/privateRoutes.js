
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PrivateRoute({ component: Component, permissions, ...rest }) {
    const { accessToken, role } = useAuth();
    
    return (
      <Route
        {...rest}
        render={() => {
          const routeRoles = permissions || ["teacher", "admin", "student"];

          if (accessToken && routeRoles.includes(role)) {
            return <Component {...rest} />
          }
          
          return <Redirect to="/login" />
        }}
      />
    );
}