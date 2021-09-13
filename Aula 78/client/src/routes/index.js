import { 
    BrowserRouter as Router, 
    Route, 
    Switch    
} from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { PrivateRoute } from "./privateRoutes";

export function Routes() {
    return (
        <>            
            <Router>                 
                <Switch>  
                    <Route exact path="/" component={Home} />                                                                                                                                                 
                    <PrivateRoute path="/dashboard" permissions={["admin", "teacher", "student"]}>
                        <Dashboard />
                    </PrivateRoute>
                    <Route path="*" component={NotFound} />                                            
                </Switch>          
            </Router>
        </>
    );
}