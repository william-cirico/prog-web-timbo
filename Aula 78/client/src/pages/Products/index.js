import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


export function Products() {
    const { id } = useParams();
    const { valor } = useAuth();
  
    return <h1>Parâmetro da URL: {id}, Valor: {valor}</h1>
  }