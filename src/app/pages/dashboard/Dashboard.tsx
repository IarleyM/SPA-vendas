import { useState } from "react";
import { Link } from "react-router-dom"
import { useUsuarioLogado } from "../../shared/hooks/useUsuarioLogado";

export const Dashboard = () => {
    const [counter, setCounter] = useState(0);
    const [showLogMessage, setShowLogMessage] = useState(false);
    const { nome, logout } = useUsuarioLogado();

    const handleLogarContador = () => {
        console.log("Contador:", counter);
        setShowLogMessage(true);
    };

    return (
        <div>
            <h1>
                Dashboard
            </h1>

            <h2>Usuário Logado: { nome }</h2>

            <h3>Contador: {counter} </h3>
            <button onClick={() => {setCounter(counter + 1); setShowLogMessage(false)}}>Incrementar</button>
            <button onClick={() => {setCounter(0); setShowLogMessage(false)}}>Zerar</button>
            <button onClick={() => { logout(); }}>LogOut</button>
            <button onClick={handleLogarContador}>Logar Contador</button>
            {showLogMessage && <p>Foi clicado {counter} vezes</p>}
            <Link to="/grid-vendas">Voltar para Login</Link>
        </div>
    )
}