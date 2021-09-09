import { DashboardContainer } from "../DashboardContainer";
import "./styles.css";

export function AdminDashboard() {
    return (
        <DashboardContainer title="Dashboard Admin">
            <button>Cadastrar turma</button>           
            <button>Cadastrar professor</button>
            <button>Cadastrar aluno</button>
        </DashboardContainer>
    );
}