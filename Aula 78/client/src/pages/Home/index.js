import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


export function Home(props) {
    const { accessToken } = useAuth();
    const history = useHistory();
        
    if (accessToken) {
        return <Redirect to="/dashboard" />        
    }




    return (
      <>        
        <h1>Home</h1>
        <p>{props.text}</p>     
        <button onClick={() => history.push("/login")}>Logar</button>  
      </>
    );  
}