import { useEffect, useState } from "react";
import { api } from "../../services/api";
import authServices from "../../services/authServices";

export function ClassesRegister({handleSubmit}) {
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [teacherId, setTeacherId] = useState("");
    const [success, setSuccess] = useState(false);

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await api.get("/teachers");

            setTeachers(res.data);
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
                <button className="button">Cadastrar turma</button>
            </form>        
        </>
    );
    
}