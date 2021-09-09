import { useState } from "react";
import { DashboardContainer } from "../DashboardContainer";
import { Prova } from "../Prova";
import "./styles.css";

export function StudentDashboard() {
    const [provas, setProvas] = useState([
        {
            nome: "Prova 01",
            nota: 8
        },
        {
            nome: "Prova 02",
            nota: 10
        }
    ]);

    return (
        <DashboardContainer title="Dashboard Aluno">
            { provas.map(prova => (
                <Prova {...prova} />
            )) }
        </DashboardContainer>
    );
}