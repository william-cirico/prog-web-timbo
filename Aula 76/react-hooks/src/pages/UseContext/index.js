import { useContext } from "react";
import { PageTitle } from "../../components/PageTitle";
import { Section } from "../../components/Section";
import { ThemeContext } from "../../contexts/ThemeContext";

export function UseContext() {
    const { toggleTheme } = useContext(ThemeContext);

    return (
        <>
            <PageTitle title="useContext" />
            <Section title="# Exemplo 01">                
                <button className="button" onClick={toggleTheme}>Mudar o tema</button>
            </Section>
        </>    
    );
}