import { NavLink } from "react-router-dom";

export function Menu() {
    return (
        <ul>
            <li>
                <NavLink exact to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/login">Login</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
                <NavLink to="/products/123">Products</NavLink>
            </li>
        </ul>
    );
}