import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./styles.css";

export function LoginPage() {
    const { authActions } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await authActions.signIn(email, password);
        } catch (error) {
            alert("Não foi possível realizar o login");
        }
    }

    return (
        <div className="container-login">
            <form className="form-login" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label>E-mail</label>
                <input placeholder="Digite seu e-mail" value={email} onChange={e => setEmail(e.target.value)} />
                <label>Senha</label>
                <input placeholder="Digite sua senha" value={password} onChange={e => setPassword(e.target.value)} />
                <button>Entrar</button>
            </form>
        </div>
    )
}