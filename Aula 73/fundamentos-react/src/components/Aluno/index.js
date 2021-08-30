export function Aluno(props) {
    // props.media = Math.ceil(props.media);  
    // props são read-only, ou seja, não podemos alterar os seus valores
    const situacao = props.media >= 6 ? "Aprovado" : "Reprovado"; 
    return (
        <>
            <h2>{ props.aluno }</h2>
            <p>{ props.media }</p>
            <p>{ situacao }</p>
        </>
    );
}