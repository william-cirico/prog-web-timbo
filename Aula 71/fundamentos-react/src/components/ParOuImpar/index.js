export function ParOuImpar(props) {
	const isPar = props.numero % 2 === 0;

	return (
		<>
			{isPar ? <p>Par</p> : <p>Ímpar</p>}
		</>
	);
}