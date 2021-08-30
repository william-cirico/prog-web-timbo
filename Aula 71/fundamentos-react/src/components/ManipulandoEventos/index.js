export function ManipulandoEventos() {
    function handleClick() {
        alert("Você clicou no botão");
    }

    function handleMouseOver() {
        console.log("Mouse passou por cima");
    }

    function handleMouseLeave() {
        console.log("Mouse saiu de cima");
    }

    function handleSubmit(e) {
        e.preventDefault();
        alert("Formulário enviado!");
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <button type="submit">Enviar formulário</button>
            </form>
            <button onClick={handleClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                Teste os eventos nesse botão
            </button>
        </>
    );
}