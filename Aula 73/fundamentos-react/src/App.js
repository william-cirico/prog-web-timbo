import "./App.css";
import { Primeiro } from "./components/Primeiro";
import { ComProps } from "./components/ComProps";
import { Aluno } from "./components/Aluno";
import { Card } from "./components/Card";
import { Familia } from "./components/Familia";
import { MembroFamilia } from "./components/MembroFamilia";
import { ListaAlunos } from "./components/ListaAlunos";
import { ParOuImpar } from "./components/ParOuImpar";
import { Notificacoes } from "./components/Notificacoes";
import { Relogio } from "./components/Relogio"
import { ValorAleatorio } from "./components/ValorAleatorio";
import { ManipulandoEventos } from "./components/ManipulandoEventos";
import { ComponenteControlado } from "./components/ComponentesControlados";

export function App() {
	return (
		<>
			<h1>Fundamentos React</h1>
			<div className="cards">
				<Card titulo="Olá mundo" cor="#F24464">
					Olá Mundo
					<h2>Olá mundo JSX</h2>
				</Card>									
				<Card titulo="Primeiro componente" cor="#424255">
					<Primeiro />
				</Card>						
				<Card titulo="Segundo componente" cor="#37A6A6">
					<ComProps titulo="Componente com Props" subtitulo=":D" />  
				</Card>
				<Card titulo="Terceiro componente" cor="#D39E4C">
					<Aluno aluno="Pedro" media={9.5} /> 
					<Aluno aluno="Mateus" media={8} />
				</Card>	
				<Card cor="#1C7FA6">
					<Familia sobrenome="da Silva">
						<MembroFamilia nome="João" />
						<MembroFamilia nome="Pedro" />
						<MembroFamilia nome="José" />
					</Familia>
				</Card>		
				<Card cor="#2f52e0">
					<ListaAlunos />
				</Card>	
				<Card titulo="Renderização condicional" cor="#ff715b">
					<ParOuImpar numero={8} />
					<ParOuImpar numero={5} />
					<hr />
					<Notificacoes mensagensNaoLidas={["mensagem 01", "mensagem 02"]}/>
				</Card>	
				<Card cor="#A12568" titulo="Manipulando Eventos">
					<ManipulandoEventos />
				</Card>
				<Card titulo="Estado" cor="#f9cb40">
					<Relogio />
					<hr />
					<ValorAleatorio />
				</Card>	
				<Card titulo="Componentes controlados" cor="#3B185F">
					<ComponenteControlado />
				</Card>
			</div>
		</>
	);
}