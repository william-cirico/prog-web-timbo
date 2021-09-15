import { useState } from "react";
import { api } from "../../services/api";
import InputMask from "react-input-mask";

const initialState = {
    name: "",
    email: "",
    phone: "",
    password: "",
    success: false,
    error: false,
}

export function UserRegister({ title, url, addUser }) {
    const [state, setState] = useState(initialState);

    async function handleSubmit(e) {
        e.preventDefault();        
        
        try {
            const user = (await api.post(url, { 
                name: state.name,
                email: state.email,
                phone: state.phone,
                password: state.password
            })).data;

            addUser(user);
            setState({ ...initialState, success: true });
        } catch (err) {
            console.log(err);
            this.setState({ ...state, error: true });
        }        
    }

    async function handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;  
                
        setState({ 
            ...state,           
            [name]: value
        });
    }

    return (
        <>
            <h2>{title}</h2> 
            {state.error && <p className="alert-error">Erro ao cadastrar o usuário</p>}
            { state.success && <p className="alert-success">Usuário cadastrado com sucesso!</p> }       
            <form className="form" onSubmit={handleSubmit}>
                <label>
                    Nome
                    <input 
                        type="text"  
                        name="name"
                        value={state.name} 
                        onChange={handleChange}                         
                        required />
                </label>
                <label>
                    Email
                    <input 
                        type="email" 
                        name="email"
                        value={state.email} 
                        onChange={handleChange} 
                        required />
                </label>
                <label>
                    Senha
                    <input 
                        type="password" 
                        name="password"
                        value={state.password} 
                        onChange={handleChange} 
                        required />
                </label>
                <label>
                    Telefone
                    <InputMask 
                        mask="(99) 9 9999-9999" 
                        type="tel" 
                        name="phone" 
                        value={state.phone} 
                        onChange={handleChange}
                        required />
                </label>
                <button className="button">Cadastrar</button>
            </form>
        </>                          
);
}