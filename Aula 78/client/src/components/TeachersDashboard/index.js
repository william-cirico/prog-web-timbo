import { useState } from "react";
import { ClassesList } from "../ClassesList";
import { DashboardContainer } from "../DashboardContainer";
import { Modal } from "../Modal";
import { StudentsList } from "../StudentsList";
import { TestsModal } from "../TestsModal";
import "./styles.css";

export function TeachersDashboard() {    
    const [showStudents, setShowStudents] = useState(false);    
    const [showTests, setShowTests] = useState(false);   
    const [teacherId, setTeacherId] = useState(null);
    const [classId, setClassId] = useState(null);

    const [classes, setClasses] = useState([
        { id: 1, nome: "Geografia", ano: 2021, professor: "William" },
        { id: 2, nome: "Matemática", ano: 2021, professor: "Pedro" },
        { id: 3, nome: "Física", ano: 2021, professor: "Maria" },
    ]);

    function handleShowStudents(classId) {
        setClassId(classId)
        setShowStudents(true);
    }    

    function handleShowTests(classId) {
        setClassId(classId);
        setShowTests(true);
    }  

    return (
        <DashboardContainer title="Dashboard Teacher">
            { showStudents && 
                <Modal onClose={() => setShowStudents(false)}>
                    <StudentsList classId={classId} />
                </Modal> 
            }

            { showTests && 
                <Modal onClose={() => setShowTests(false)}>
                    <TestsModal classId={classId} />                    
                </Modal> 
            }
            <ClassesList teacherId={teacherId} handleShowStudents={handleShowStudents} handleShowTests={handleShowTests} />     
        </DashboardContainer>
    );
}