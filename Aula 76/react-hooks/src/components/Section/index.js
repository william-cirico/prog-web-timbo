import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./styles.css";

export function Section({title, children}) {
    const { theme } = useContext(ThemeContext);

    return (
        <section className="section" style={{ backgroundColor: theme.backgroundColor }}>
            <h2 className="sectionTitle">{title}</h2>
            {children}
        </section>
    );
}