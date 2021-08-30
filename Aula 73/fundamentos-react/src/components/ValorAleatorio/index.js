import React from "react";

export class ValorAleatorio extends React.Component {
    constructor(props) {
        super(props);
        this.state = { valor: 10 };
    }

    gerarValor = () => {
        const valor = parseInt(Math.random() * (this.props.max - this.props.min)) + this.props.min;
        this.setState({ valor });
    }

    render() {
        return (
            <>
                <h2>Valor aleatório: { this.state.valor }</h2>     
                <p>{this.state.teste}</p>                               
                <button onClick={this.gerarValor}>Gerar valor</button>
            </>
        );
    }
}

ValorAleatorio.defaultProps = {
    max: 10,
    min: 30
}