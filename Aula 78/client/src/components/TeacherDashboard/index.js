import { DashboardContainer } from "../DashboardContainer";
import "./styles.css";

export function TeacherDashboard() {
    return (
        <DashboardContainer title="Dashboard Teacher">
            <div>
                <p>Ver os alunos cadastrados na turma</p>            
                <button>Cadastrar nota de prova</button>
            </div>
        </DashboardContainer>
    );
}