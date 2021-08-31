import React from "react";

export class Relogio extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: new Date() };
	}

	componentDidMount() {
		this.timer = setInterval(() => {
			this.setState({
				data: new Date()
			});
		}, 1000);		
	}

	componentDidUpdate() {
		console.log("Estado mudou!");
	}

	shouldComponentUpdate() {
		if (this.state.data.getSeconds() % 2 === 0) {
			return false;
		}

		return true;
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {
		return (
			<>
				<h2>Relógio</h2>
				<h3>{ this.state.data.toLocaleTimeString() }</h3>
			</>
		);
	}
}