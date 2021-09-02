import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Menu } from "./components/Menu";
import { Content } from "./components/Content";
import { UseState } from "./pages/UseState";
import { UseEffect } from "./pages/UseEffect";
import { UseRef } from "./pages/UseRef";
import { UseContext } from "./pages/UseContext";
import { UseReducer } from "./pages/UseReducer";
import { ThemeProvider } from "./contexts/ThemeContext";


function App() {  
  return (    
    <Router>
      <div className="App">
        <Menu />
        <ThemeProvider>
          <Content>
              <Switch>
                <Route exact path="/">
                  <UseState />
                </Route>
                <Route path="/useEffect">
                  <UseEffect />
                </Route>
                <Route path="/useRef">
                  <UseRef />
                </Route>
                <Route path="/useContext">
                  <UseContext />
                </Route>
                <Route path="/useReducer">
                  <UseReducer />
                </Route>
            </Switch>
          </Content>
        </ThemeProvider>
      </div>      
    </Router>    
  );
}

export default App;
