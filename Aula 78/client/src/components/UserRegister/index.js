import { useState } from "react";
import { api } from "../../services/api";
import InputMask from "react-input-mask";

export function UserRegister({title, url}) {
    console.log(url);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();        
        try {
            console.log(url);
            await api.post(url, { name, email, phone, password });
            setSuccess(true);
            setName("");
            setEmail("");
            setPhone("");
            setPassword("");
        } catch (err) {
            console.log(err);
            setSuccess(false);
        }
    }

    return (
        <>
            <h2>{title}</h2> 
            { success && <p className="success">Usuário cadastrado com sucesso!</p> }       
            <form className="form" onSubmit={handleSubmit}>
                <label>
                    Nome
                    <input type="text" required value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    Email
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    Senha
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <label>
                    Telefone
                    <InputMask mask="(99) 9 9999-9999" type="tel" required value={phone} onChange={e => setPhone(e.target.value)} />
                </label>
                <button className="button">Cadastrar</button>
            </form>
        </>                          
);
}