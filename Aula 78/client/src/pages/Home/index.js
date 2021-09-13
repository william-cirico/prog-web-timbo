import { Redirect } from "react-router-dom";
import { Login } from "../../components/Login";
import { Toast } from "../../components/Toast";
import authServices from "../../services/authServices";
import "./styles.css";

export function Home() {
  const testList = [
    {
      id: 1,
      title: 'Success',
      description: 'This is a success toast component',
      backgroundColor: '#5cb85c',
      icon: checkIcon
    },
    {
      id: 2,
      title: 'Danger',
      description: 'This is an error toast component',
      backgroundColor: '#d9534f',
      icon: errorIcon
    },
  ];

  const accessToken = authServices.getAccessToken();  

  if (accessToken) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="container-home">        
        <h1 className="home-title">Sistema Gerenciador de Alunos</h1>
        <Toast 
            toastList={testList}
            position="bottom-right"
        />
      <Login />                                   
    </div>
  );  
}

