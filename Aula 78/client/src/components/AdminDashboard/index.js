import "./styles.css";
import { useEffect, useState } from "react";
import { DashboardContainer } from "../DashboardContainer";
import { Modal } from "../Modal";
import { UserRegister } from "../UserRegister";
import { ClassesRegister } from "../ClassesRegister";
import { api, cancelTokenSource } from "../../services/api";


export function AdminsDashboard() {
    const [showClassRegister, setShowClassRegister] = useState(false);
    const [showTeacherRegister, setShowTeacherRegister] = useState(false);
    const [showStudentRegister, setShowStudentRegister] = useState(false);

    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);    
    const [classes, setClasses] = useState([]);

    useEffect(() => {                        
        async function getTeachers() {
            try {
                const teachers = (await api.get("/teachers", { cancelToken: cancelTokenSource.token })).data;
                
                setTeachers(teachers);
            } catch (err) {
                console.log(err);
            }
        }

        async function getStudents() {
            try {
                const students = (await api.get("/students", { cancelToken: cancelTokenSource.token })).data;
                
                setStudents(students);
            } catch (err) {
                console.log(err);
            }
        }

        async function getClasses() {
            try {
                const classes = (await api.get("/classes", { cancelToken: cancelTokenSource.token })).data;
                
                setClasses(classes);
            } catch (err) {
                console.log(err);
            }
        }

        getTeachers();
        getClasses();
        getStudents();    

        return () => cancelTokenSource.cancel();
    }, []);

    return (
        <DashboardContainer title="Dashboard Admin">
            <div className="admin-container">                                
                { showClassRegister && 
                    <Modal onClose={() => setShowClassRegister(false)}>            
                        <ClassesRegister />
                    </Modal>
                }
                { showTeacherRegister && 
                    <Modal onClose={() => setShowTeacherRegister(false)}>            
                        <UserRegister 
                            title="Cadastrar professor" 
                            addUser={teacher => setTeachers([...teachers, teacher])} 
                            url="/teachers"    
                            />
                    </Modal>
                }
                { showStudentRegister && 
                    <Modal onClose={() => setShowStudentRegister(false)}>            
                        <UserRegister 
                            title="Cadastrar aluno" 
                            addUser={student => setStudents([...students, student])} 
                            url="/students" />
                    </Modal>
                }        
                <button className="button" onClick={() => setShowClassRegister(true)}>Cadastrar turma</button>           
                <button className="button" onClick={() => setShowTeacherRegister(true)}>Cadastrar professor</button>
                <button className="button" onClick={() => setShowStudentRegister(true)}>Cadastrar aluno</button>
            </div>
        </DashboardContainer>
    );
}