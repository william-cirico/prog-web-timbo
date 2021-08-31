import React from "react";
import { AguaFerve } from "../AguaFerve";
import { InputTemperatura } from "../InputTemperatura";

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperatura, conversao) {    
    if (isNaN(parseFloat(temperatura))) {
        return "";
    }

    return conversao(temperatura);
}

export class Calculadora extends React.Component {
    constructor(props) {
        super(props);
        this.state = { escala: "c", temperatura: "" }
    }

    handleCelsiusChange = temperatura => {
        this.setState({ escala: "c", temperatura });
    }

    handleFahrenheitChange = temperatura => {
        this.setState({ escala: "f", temperatura });
    }

    render() {
        const escala = this.state.escala;
        const temperatura = this.state.temperatura;
        const celsius = escala === "f" ? tryConvert(temperatura, toCelsius) : temperatura;
        const fahrenheit = escala === "c" ? tryConvert(temperatura, toFahrenheit) : temperatura;

        return (
            <div>
                <InputTemperatura 
                    escala="c" 
                    temperatura={celsius} 
                    onMudancaTemperatura={this.handleCelsiusChange}    
                />
                <InputTemperatura 
                    escala="f" 
                    temperatura={fahrenheit} 
                    onMudancaTemperatura={this.handleFahrenheitChange}    
                />
                <AguaFerve celsius={temperatura} />
            </div>
        );
    }
}