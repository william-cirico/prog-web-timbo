import { useEffect, useState } from "react";
import { PageTitle } from "../../components/PageTitle";
import { Section } from "../../components/Section";

export function UseEffect() {
    const [ contador, setContador ] = useState(0);
    const [ horario, setHorario ] = useState(new Date());    

    // useEffect acontece após cada renderização
    useEffect(() => {
        document.title = `${contador} vezes`;        
    });

    useEffect(() => {
        console.log("useEffect do timer executou");
        const timer = setInterval(() => {
            console.log("Timer executando...")
            setHorario(new Date())
        }, 1000);
        // Limpando o timer quando o componente desmontar
        return () => clearInterval(timer);
    }, [horario]);

    return (
        <>
            <PageTitle title="useEffect" />
            <Section title="# Exemplo 01">
                <p>Contador: {contador}</p>
                <div className="button-container">
                    <button 
                        className="button button__icon" 
                        onClick={() => setContador(prevContador => prevContador + 1)}
                    >+</button>
                    <button 
                        className="button button__icon"
                        onClick={() => setContador(prevContador => prevContador - 1)}
                    >−</button>
                </div>
            </Section>
            <Section title="# Exemplo 02">
                <p>Horário: {horario.toLocaleTimeString()}</p>              
            </Section>
        </>    
    );
}