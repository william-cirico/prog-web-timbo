import { ContainerDashboard } from "../ContainerDashboard";

export function AdminDashboard() {
    return (
        <ContainerDashboard title="Dashboard Admin">
            <button>Cadastrar turma</button>
            <button>Cadastrar professor</button>
            <button>Cadastrar aluno</button>
        </ContainerDashboard>
    );
}