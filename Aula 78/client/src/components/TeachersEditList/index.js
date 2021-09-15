import { useEffect, useState } from "react";
import { api, cancelTokenSource } from "../../services/api";

export function TeachersEditList() {
    const [teachers, setTeachers] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get("/teachers", { cancelToken: cancelTokenSource.token }); 
                console.log(res);
                setTeachers(res.data);
            } catch (err) {
                console.log(err);
            }            
        })();

        return () => cancelTokenSource.cancel();
    });

    return (
        <>
            <h2>Professores</h2>
            { 
                teachers.length
                ? <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>                    
                            <th>Telefone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            teachers.map(teacher => (
                                <tr key={teacher.id}>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.email}</td>
                                    <td>{teacher.phone}</td>                                    
                                    <td><button className="button">Editar</button></td>
                                </tr>
                            ))                
                        }
                    </tbody>
                </table>
                : <p>Não existe nenhum professor cadastrado</p>
            }            
        </>
    );
}