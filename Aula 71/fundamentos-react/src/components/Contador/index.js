import React from "react";

export class Contador extends React.Component {
    constructor(props) {
        super(props);
        this.state = { contador: this.props.inicial };
    }

    incrementar = () => {
        this.setState((state) => ({ contador: state.contador + 1 }));
    }

    decrementar = () => {
        this.setState((state) => ({ contador: state.contador - 1 }));
    }


    render() {
        return (
            <>
                <h2>{this.state.contador}</h2>
                <button onClick={this.incrementar}>Incrementar</button>
                <button onClick={this.decrementar}>Diminuir</button>
            </>
        );
    }
}

Contador.defaultProps = {
    inicial: 0
};