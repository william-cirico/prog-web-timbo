export function StudentsList({ students }) {    
    return (
        <>
            <h2>Alunos</h2>
            { 
                students.length
                ? <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>                    
                            <th>Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map(student => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>                                    
                                </tr>
                            ))                
                        }
                    </tbody>
            </table>
            : <p>Não existe nenhum aluno cadastrado</p>
            }
            
        </>
    );
}

StudentsList.defaultProps = {
    students: []
}