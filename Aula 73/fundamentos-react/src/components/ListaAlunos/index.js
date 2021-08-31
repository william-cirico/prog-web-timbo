const alunos = [
	{ id: 1, nome: "Arthur", nota: 9 },
	{ id: 2, nome: "Beatriz", nota: 8 },
	{ id: 3, nome: "Carlos", nota: 10 },
	{ id: 4, nome: "Douglas", nota: 5 },
	{ id: 5, nome: "Eduarda", nota: 10 },
	{ id: 6, nome: "Fabrício", nota: 4 }
];

export function ListaAlunos() {
	return (
		<div>
			<h2>Alunos</h2>
			<ul>
				{
					alunos.map(aluno => {
						return (
							<li key={aluno.id}>
								{aluno.nome} - {aluno.nota}
							</li>
						);
					})
				}
			</ul>
		</div>
	);
}