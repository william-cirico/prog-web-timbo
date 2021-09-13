import { AdminsDashboard } from "../../components/AdminDashboard";
import { StudentsDashboard } from "../../components/StudentsDashboard";
import { TeachersDashboard } from "../../components/TeachersDashboard";
import { NotFound } from "../NotFound";

export function Dashboard({ userRole }) {  
  if (userRole === "student") {
    return <StudentsDashboard />
  }

  if (userRole === "teacher") {
    return <TeachersDashboard />
  }

  if (userRole === "admin") {
    return <AdminsDashboard />
  }  

  return <NotFound />
} 