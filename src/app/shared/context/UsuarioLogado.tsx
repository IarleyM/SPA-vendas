import React, { createContext, useCallback, useEffect } from 'react';

interface IUsuarioLogadoData {
    nome?: string;
    logout: () => void;
}

export const UsuarioLogadoContext = createContext<IUsuarioLogadoData>({} as IUsuarioLogadoData);

export const UsuarioLogadoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [_nome,setNome] = React.useState('');

    useEffect(()=>{
        setTimeout(() => {
            setNome("Joãozinho")
        }, 1000);
    })

    const _logout = useCallback(() => {
        console.log("Usuário deslogado");
    }, []);

    return (
        <UsuarioLogadoContext.Provider value={{ nome: _nome, logout: _logout }}>
            {children}
        </UsuarioLogadoContext.Provider>
    );
};