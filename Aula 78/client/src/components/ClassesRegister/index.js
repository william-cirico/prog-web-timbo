import { useEffect, useState } from "react";
import { api } from "../../services/api";
import authServices from "../../services/authServices";
import { StudentsList } from "../StudentsList";
import { SuperSearchbox } from "../SuperSearchBox";

export function ClassesRegister() {
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [teacherId, setTeacherId] = useState("");
    const [success, setSuccess] = useState(false);

    const [teachers, setTeachers] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        
    }, []);

    useEffect(() => {
        (async () => {
            const res = await api.get("/students");

            setStudents(res.data)
        })();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();        
        try {
            await api.post("/classes", { name, year, teacherId });
            setSuccess(true);
            setName("");
            setYear("");
            setTeacherId("");
        } catch (err) {
            console.log(err)
        }
    }

    function addStudentToClass(student) {  
        const studentAlreadyExists = selectedStudents.find(selectedStudent => (
            selectedStudent.id === student.id
        ));
        
        if (!studentAlreadyExists) {
            setSelectedStudents([...selectedStudents, student])
        }        
    }

    
    return (
        <>
            <h2>Cadastrar turma</h2>     
            { success && <p className="success">Turma cadastrada com sucesso!</p> }   
            <form className="form" onSubmit={handleSubmit}>
                <label>
                    Nome da turma
                    <input type="text" required value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    Ano turma
                    <input type="number" required value={year} onChange={e => setYear(e.target.value)} />
                </label>
                <label>
                    Professor
                    <select value={teacherId} onChange={e => setTeacherId(e.target.value)}>
                        <option value="" disabled>Selecione o professor</option>
                        {                                    
                            teachers.map(teacher => (
                                <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                            )) 
                        }
                    </select>
                </label>
                <label>
                    Adicionar alunos
                    <SuperSearchbox 
                        users={[ 
                            { id: 1, name: "William Círico", email: "contato.williamc@gmail.com" }, 
                            { id: 2, name: "Matheus", email: "matheus.c@gmail.com" },
                        ]}
                        addUser={addStudentToClass}    
                    />
                </label>
                { selectedStudents && 
                    <StudentsList students={selectedStudents} />
                }
                <button className="button">Cadastrar turma</button>
            </form>        
        </>
    );
    
}