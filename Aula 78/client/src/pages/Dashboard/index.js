import { AdminDashboard } from "../../components/AdminDashboard";
import { StudentDashboard } from "../../components/StudentDashboard";
import { TeacherDashboard } from "../../components/TeacherDashboard";
import { useAuth } from "../../hooks/useAuth";

export function Dashboard() {
  const { role } = useAuth();

  if (role === "student") {
    return <StudentDashboard />
  }

  if (role === "teacher") {
    return <TeacherDashboard />
  }

  if (role === "admin") {
    return <AdminDashboard />
  }  
} 