import { 
    BrowserRouter as Router, 
    Route, 
    Switch    
} from "react-router-dom";
import { Menu } from "../components/Menu";
import { Dashboard } from "../pages/Dashboard";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { Products } from "../pages/Products";
import { PrivateRoute } from "./privateRoutes";

export function Routes() {
    return (
        <div>            
            <Router> 
                <Menu />
                <Switch>  
                    <Route exact path="/">
                        <Home text="Um texto qualquer" />
                    </Route>                 
                    <Route path="/login" component={Login} /> 
                    <PrivateRoute path="/products/:id" component={Products} />            
                    <PrivateRoute path="/dashboard" component={Dashboard} permissions={["student", "admin", "teacher"]} />                                            
                    <Route path="*" component={NotFound} />                                            
                </Switch>          
            </Router>
        </div>
    );
}