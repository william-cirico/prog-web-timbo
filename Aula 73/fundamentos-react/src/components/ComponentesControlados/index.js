import React from "react";

export class ComponenteControlado extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nome: "",
			email: "",
			cpf: "",
			sexo: ""
		};
	}

	handleSubmit = e => {
		e.preventDefault();
		alert(`Nome: ${this.state.nome}\nE-mail: ${this.state.email}\nCpf: ${this.state.cpf}\nSexo: ${this.state.sexo}`);
	}

	handleChange = e => {
		const value = e.target.value;
		const name = e.target.name;
		this.setState({ [name]: value });
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Nome:
					<input type="text" value={this.state.nome} name="nome" onChange={this.handleChange} />
				</label>
				<label>
					E-mail:
					<input type="email" value={this.state.email} name="email" onChange={this.handleChange} />
				</label>
				<label>
					Cpf:
					<input type="number" value={this.state.cpf} name="cpf" onChange={this.handleChange} />
				</label> <br/>
				<label>					
					<input type="radio" value="Feminino" name="sexo" onChange={this.handleChange} />
					Feminino
				</label>
				<label>					
					<input type="radio" value="Masculino" name="sexo" onChange={this.handleChange} />
					Masculino
				</label>
				<button type="submit">Enviar formulário</button>
      </form>
		);
  }
}