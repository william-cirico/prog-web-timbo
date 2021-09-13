import { useState } from "react";

export function ClassesList({ teacherId, handleShowStudents, handleShowTests }) {
    const [classes, setClasses] = useState([
        { name: "Geografia", year: 2021 },
        { name: "Matemática", year: 2021 },
    ]);

    return (
        <>
            <h2>Matérias</h2>
            {
                classes
                ? <table className="table">
                    <tr>
                        <th>Nome</th>
                        <th>Ano</th>                    
                        <th colSpan="2"></th>
                    </tr>
                    {
                        classes.map(c => (
                            <tr>
                                <td>{c.name}</td>
                                <td>{c.year}</td>
                                <td><button className="button" onClick={() => handleShowStudents(c.id)}>Alunos</button></td>
                                <td><button className="button" onClick={() => handleShowTests(c.id)}>Provas</button></td>
                            </tr>
                        ))
                    }
                </table> 
                : <p>Você não possui turmas</p>
            }
            
        </>
    );    
}