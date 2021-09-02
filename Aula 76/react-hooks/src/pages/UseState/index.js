import { useState } from "react";
import { PageTitle } from "../../components/PageTitle";
import { Section } from "../../components/Section";

export function UseState() {
    const [ contador, setContador ] = useState(0);
    const [ nome, setNome ] = useState("");
    const [ fruta, setFruta ] = useState("abacaxi");

    return (
        <>
            <PageTitle title="useState" />
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
                <input 
                    type="text" 
                    onChange={e => setNome(e.target.value)}
                    value={nome}
                    placeholder="Digite um nome"
                />
                <p>Nome digitado: {nome}</p>                
            </Section>
            <Section title="# Exemplo 03">
                <label>
                    Escolha uma fruta: 
                    <select value={fruta} onChange={e => setFruta(e.target.value)}>
                        <option value="abacaxi">Abacaxi</option>
                        <option value="banana">Banana</option>
                        <option value="limao">Limão</option>
                        <option value="uva">Uva</option>
                    </select>
                </label>   
                <p>Fruta selecionada: {fruta}</p>         
            </Section>
        </>    
    );
}