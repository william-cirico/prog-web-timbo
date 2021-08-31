import React from "react";

const nomesEscala = {
    c: "Celsius",
    f: "Fahrenheit"
};

export class InputTemperatura extends React.Component {
    handleChange = e => {
        this.props.onMudancaTemperatura(e.target.value);
    }
    
    render() {
        const temperatura = this.props.temperatura;

        return (
            <fieldset>
                <legend>Digite uma temperatura em {nomesEscala[this.props.escala]}:</legend>
                <input type="number" value={temperatura} onChange={this.handleChange} />                
            </fieldset>
        );
    }
}