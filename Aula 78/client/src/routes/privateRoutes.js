
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PrivateRoute({ component: Component, permissions, ...rest }) {
    const { accessToken, role } = useAuth();
    
    return (
      <Route
        {...rest}
        render={() => {
          if (!permissions?.includes(role)) {
            return <Redirect to="/unauthorized" />
          }

          if (!accessToken) {
            return <Redirect to="/login" />
          }
          
          return <Component {...rest} />          
        }}
      />
    );
}