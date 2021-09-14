import { useEffect, useState } from "react";
import { api, cancelTokenSource } from "../../services/api";

export function StudentsList({ classId }) {
    const [students, setStudents] = useState([
        { id: 1, name: "william", email: "contato.williamc@gmail.com", phone: "(47) 9 8408-8520" }
    ]);

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get("/students", { cancelToken: cancelTokenSource.token }); 
            
                setStudents(res.data);
            } catch (err) {
                console.log(err);
            }            
        })();

        return () => cancelTokenSource.cancel();
    });

    return (
        <>
            <h2>Alunos</h2>
            { 
                students 
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
            : <p>Não existe nenhum aluno cadastrado nessa matéria</p>
            }
            
        </>
    );
}