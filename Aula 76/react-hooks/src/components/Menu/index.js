import "./styles.css";
import { NavLink } from "react-router-dom";

export function Menu() {
    return (
        <nav className="menu">
            <ul>
                <li><NavLink exact to="/" activeClassName="selected">useState</NavLink></li>
                <li><NavLink to="/useEffect" activeClassName="selected">useEffect</NavLink></li>
                <li><NavLink to="/useRef" activeClassName="selected">useRef</NavLink></li>
                <li><NavLink to="/useContext" activeClassName="selected">useContext</NavLink></li>
                <li><NavLink to="/useReducer" activeClassName="selected">useReducer</NavLink></li>
            </ul>
        </nav>
    );
}