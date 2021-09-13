import "./styles.css";
import { useState } from "react";
import { DashboardContainer } from "../DashboardContainer";
import { Modal } from "../Modal";
import { UserRegister } from "../UserRegister";
import { ClassesRegister } from "../ClassesRegister";

export function AdminsDashboard() {
    const [showClassRegister, setShowClassRegister] = useState(false);
    const [showTeacherRegister, setShowTeacherRegister] = useState(false);
    const [showStudentRegister, setShowStudentRegister] = useState(false);    

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
                        <UserRegister title="Cadastrar professor" url="/teachers" />
                    </Modal>
                }
                { showStudentRegister && 
                    <Modal onClose={() => setShowStudentRegister(false)}>            
                        <UserRegister title="Cadastrar aluno" url="/students" />
                    </Modal>
                }        
                <button className="button" onClick={() => setShowClassRegister(true)}>Cadastrar turma</button>           
                <button className="button" onClick={() => setShowTeacherRegister(true)}>Cadastrar professor</button>
                <button className="button" onClick={() => setShowStudentRegister(true)}>Cadastrar aluno</button>
            </div>
        </DashboardContainer>
    );
}