import React from "react";

export function Familia(props) {
	return (
		<div>
			<h2>Família de componentes</h2>
			{ 
				React.Children.map(props.children, child => {
					return React.cloneElement(child, { sobrenome: props.sobrenome });
				})
			}
		</div>
	);
}