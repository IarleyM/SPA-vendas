import { useNavigate } from "react-router-dom"
import { useState, useMemo } from "react";
import { Button } from "../components/Button";
import { useUsuarioLogado } from "../../shared/hooks/useUsuarioLogado";

export const Login = () => {

    const { nome } = useUsuarioLogado();  

    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const contEmail = useMemo(() => {
        console.log("Contando caracteres do email");
        return email.length;
    }, [email.length]);

    const handleLogin = () => {
        console.log("Email:", email);
        console.log("Senha:", password);
    }

    return (
        <div>
            <p>Contador de Caracteres do Email: { contEmail }</p>
            <form>
                <h1>usuario Logado: {nome}</h1>
                <label>
                    <span>Email</span>
                    <input type="text" placeholder="email@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
                </label>

                <label>
                    <span>Senha</span>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>

                <Button 
                    type="button" 
                    onClick={handleLogin}>Entrar
                    </Button>
            </form>
            <Button 
                type="button" 
                onClick={() => navigate("/tela-inicial")}>Ir para Dashboard</Button>
            <Button 
                type="button"
                onClick={() => navigate("/lista-vendas")}>Lista de Vendas</Button>
            
        </div>
    )
}