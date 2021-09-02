import { useEffect, useRef, useState } from "react";
import { PageTitle } from "../../components/PageTitle";
import { Section } from "../../components/Section";

export function UseRef() {
    const [ horario, setHorario ] = useState(new Date()); 
    
    const inputRef = useRef();
    const relogioRef = useRef();

    function handleFocusClick() {
        inputRef.current.focus();
    }

    function handleCancelClick() {
        clearInterval(relogioRef.current);
    }

    useEffect(() => {        
        const timer = setInterval(() => {            
            setHorario(new Date())
        }, 1000);
        relogioRef.current = timer;
        // Limpando o timer quando o componente desmontar
        return () => clearInterval(timer);
    }, [horario]);

    return (
        <>
            <PageTitle title="useRef" />
            <Section title="# Exemplo 01">
                <input type="text" placeholder="Digite alguma coisa" ref={inputRef} />
                <button className="button" onClick={handleFocusClick}>Focar o Input</button>
            </Section>
            <Section title="# Exemplo 02">
                <p>Horário: {horario.toLocaleTimeString()}</p>    
                <button className="button" onClick={handleCancelClick}>Parar o relógio 🕰</button>          
            </Section>
        </>    
    );
}