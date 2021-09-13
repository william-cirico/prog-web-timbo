import { Login } from "../../components/Login";
import "./styles.css";

export function Home(props) {

  return (
    <div className="container-home">        
        <h1 className="home-title">Sistema Gerenciador de Alunos</h1>        
      <Login />                                   
    </div>
  );  
}