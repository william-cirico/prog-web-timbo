import { Redirect } from "react-router-dom";
import { Login } from "../../components/Login";
import authServices from "../../services/authServices";
import "./styles.css";

export function Home() {
  const accessToken = authServices.getAccessToken();  

  if (accessToken) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="container-home">        
        <h1 className="home-title">Sistema Gerenciador de Alunos</h1>
      <Login />                                   
    </div>
  );  
}

