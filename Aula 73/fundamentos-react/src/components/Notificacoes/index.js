export function Notificacoes(props) {
	const mensagensNaoLidas = props.mensagensNaoLidas || [];
	return (
		<>
			<h2>Olá</h2>
			{ mensagensNaoLidas.length > 0 && 
				<p>Você tem {mensagensNaoLidas.length} mensagens não lidas</p>
			}
		</>
	);
}