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
import { Unauthorized } from "../pages/Unauthorized";
import { PrivateRoute } from "./privateRoutes";

export function Routes() {
    return (
        <div>            
            <Router>                 
                <Switch>  
                    <Route exact path="/">
                        <Home text="Um texto qualquer" />
                    </Route>                 
                    <Route path="/login" component={Login} /> 
                    <PrivateRoute path="/products/:id" component={Products} permissions={["admin"]} />            
                    <PrivateRoute path="/dashboard" component={Dashboard} permissions={["admin", "teacher", "student"]} />                                            
                    <Route path="/unauthorized" component={Unauthorized} />
                    <Route path="*" component={NotFound} />                                            
                </Switch>          
            </Router>
        </div>
    );
}