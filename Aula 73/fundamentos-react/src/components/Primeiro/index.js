import "./styles.css"

export function Primeiro() {
    const mensagem = "Incorporando expressões";
    return (
        <>
            <h2 className="title">Esse é o primeiro componente</h2>
            <p>Um componente pode ter várias tags dentro dele</p>
            <p>Essa é uma mensagem que está dentro de uma variável: <strong>{ mensagem }</strong></p>            
        </>
    );
}