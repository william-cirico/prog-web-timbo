import { useState } from "react";

export function TestsModal({ classId, addTest }) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");    
    const [tests, setTests] = useState(null);
    const [grades, setGrades] = useState(null);


    function handleTestRadio() {

    }

    function handleSubmit() {

    }

    return (
        <>
            <h2>Cadastrar Prova</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label>
                    Nome da prova
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                </label>
                <label>
                    Data da prova
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
                </label>
                <label>
                    Descrição
                    <textarea value={description} onChange={e => setDescription(e.target.value)} />
                </label>
                <button className="button">Cadastrar prova</button>
            </form>
            <h2>Provas</h2>
            {
                tests
                ? <table className="table">
                    <tr>
                        <th></th>
                        <th>Nome</th>
                        <th>Descrição</th>                    
                        <th>Data</th>
                    </tr>
                    {
                        tests.map(test => (
                            <tr>
                                <td><input type="radio" onClick={handleTestRadio} name="test" /></td>
                                <td>{test.name}</td>
                                <td>{test.description}</td>
                                <td>{test.date}</td>                                    
                            </tr>
                        ))
                    }
                </table>
                : <p>Não existe nenhuma prova cadastrada</p>
            }
            
            <h2>Notas</h2>
            {
                grades 
                ? <table className="table">
                    <tr>                                
                        <th>Aluno</th>
                        <th>Observação</th>                    
                        <th>Nota</th>
                    </tr>
                    {
                        grades.map(grade => (
                            <tr>                                        
                                <td>{grade.student}</td>
                                <td>{grade.note}</td>
                                <td>{grade.grade}</td>                                    
                            </tr>
                        ))
                    }
                </table>
                : <p>Selecione a prova</p>                        
            }
        </>        
    );
}