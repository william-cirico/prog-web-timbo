import { Redirect } from "react-router-dom";
import { AdminDashboard } from "../../components/AdminDashboard";
import { StudentDashboard } from "../../components/StudentsDashboard";
import { TeacherDashboard } from "../../components/TeacherDashboard";
import { useAuth } from "../../hooks/useAuth";

export function Dashboard() {
    const { role } = useAuth();    

    if (role === "teacher") {      
      return <TeacherDashboard />      
    }

    if (role === "student") {
      return <StudentDashboard />
    }

    if (role === "admin") {
      return <AdminDashboard />
    }
  
    return <Redirect to="/login" />
  }