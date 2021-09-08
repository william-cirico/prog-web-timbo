
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PrivateRoute({ component: Component, ...rest }) {
    const { accessToken } = useAuth();
    
    return (
      <Route
        {...rest}
        render={() => accessToken
          ? <Component {...rest} />
          : <Redirect to="/login" />
        }
      />
    );
}