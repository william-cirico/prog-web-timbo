import { useState } from "react";
import { DashboardContainer } from "../DashboardContainer";
import { Modal } from "../Modal";

export function StudentsDashboard() {
    const [tests, setTests] = useState([]);

    const [showtests, setShowTests] = useState(false);

    const [classes, setClasses] = useState([
        { nome: "Geografia", ano: 2021, professor: "William" },
        { nome: "Matemática", ano: 2021, professor: "Pedro" },
        { nome: "Física", ano: 2021, professor: "Maria" },
    ]);

    function getMedia() {
        const grades = tests.map(prova => prova.nota);    
        const gradesSum = grades.reduce((previousValue, currentValue) => previousValue + currentValue);    
        const media = gradesSum / tests.length;

        return media;
    }

    function handleClick() {
        setTests([
            {
                nome: "Prova 01",
                data: "10/08/2021",
                nota: 8
            },
            {
                nome: "Prova 02",
                data: "10/08/2021",
                nota: 10
            }
        ]);

        setShowTests(true);
    }

    return (
        <DashboardContainer title="Dashboard Aluno">
            <div>
                { showtests && 
                    <Modal                         
                        onClose={() => setShowTests(false)}
                    >                    
                            <h2>Notas</h2>
                            <table className="table">
                                <tr>
                                    <th>Nome</th>
                                    <th>Data</th>
                                    <th>Nota</th>
                                </tr>
                                { tests.map(prova => (
                                    <tr>
                                        <td>{prova.nome}</td>
                                        <td>{prova.data}</td>
                                        <td>{prova.nota.toFixed(2)}</td>
                                    </tr>                        
                                )) }                                        
                            </table>
                            <h2>Média</h2>
                            <p>A média do aluno é {getMedia().toFixed(2)}</p>                                    
                    </Modal>
                }
                
                <h2>Matérias</h2>
                <table className="table pointer-td">
                    <tr>
                        <th>Nome</th>
                        <th>Ano</th>
                        <th>Professor</th>
                    </tr>
                    {
                        classes.map(materia => (
                            <tr onClick={handleClick}>
                                <td>{materia.nome}</td>
                                <td>{materia.ano}</td>
                                <td>{materia.professor}</td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </DashboardContainer>
    );
}