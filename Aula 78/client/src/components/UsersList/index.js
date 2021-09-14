import { useState } from "react";

export function UsersList() {
    const [users, setUsers] = useState([
        { id: 1, name: "william", email: "contato.williamc@gmail.com", phone: "(47) 9 8408-8520" }
    ]);

    return (
        <>
            <h2>Usuários</h2>
            { 
                users 
                ? <table className="table">
                <tr>
                    <th>Nome</th>
                    <th>Email</th>                    
                    <th>Telefone</th>
                </tr>
                {
                    students.map(student => (
                        <tr>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>                                    
                        </tr>
                    ))
                }
            </table>
            : <p>Não existe nenhum usuário cadastrado</p>
            }
            
        </>
    );
}