import "./styles.css";
import { useEffect, useState } from "react";

export function Contador() {
  const [ contador, setContador ] = useState(0);
  const [ incremento, setIncremento ] = useState(1);
  const [ customClass, setCustomClass ] = useState(""); 

  useEffect(() => {
    if (contador <= -100) {
      setCustomClass("vermelho");
    } else if (contador >= 100) {
      setCustomClass("verde");
    } else {
      setCustomClass("");
    }
  }, [contador]);

  return (
    <div>
      <h1>Contador</h1>
      <h3 className={customClass}>{contador}</h3>
      <button onClick={() => setContador(prevContador => prevContador - incremento)}>-</button>
      <input 
        type="number" 
        value={incremento}
        onChange={e => setIncremento(+e.target.value)} 
        className="texto-centralizado"
      />
      <button onClick={() => setContador(prevContador => prevContador + incremento)}>+</button>
    </div>
  );
}
