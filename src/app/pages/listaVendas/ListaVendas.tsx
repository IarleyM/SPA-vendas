import { useCallback, useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom"
import { ITarefa, TarefasServices } from "../../shared/services/tarefas/TarefasServices";
import { ApiException } from "../../shared/services/ApiException";

export const ListaVendas = () => {
    const navigate = useNavigate();

    const [list, setList] = useState<ITarefa[]>([]);
    const [ExistError, setExistError] = useState("");

    useEffect(() => {
        TarefasServices.getAll()
            .then((response) => {
                if (response instanceof ApiException) {
                    alert(response.message);
                } else {
                    setList(response);
                }
            })
    }, [])

    const addVendas: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === "Enter") {
            if (e.currentTarget.value.trim() === "") return;


            const value = e.currentTarget.value;
            e.currentTarget.value = "";

            setList(oldList => {
                if (oldList.some(IListItem => IListItem.title === value)) {
                    setExistError("Item já existe na lista");
                    setTimeout(() => {
                        setExistError("");
                    }, 2000)
                    return oldList;
                }
                setExistError("")
                return [...oldList, { id: oldList.length, title: value }];
            });
        }
    }, []);

    const handleAddItem = () => {
        const inputElement = document.querySelector<HTMLInputElement>("input");
        if (inputElement && inputElement.value.trim() !== "") {
            const value = inputElement.value;
            inputElement.value = "";

            setList(oldList => {
                if (oldList.some(item => item.title === value)) {
                    setExistError("Item já existe na lista");
                    setTimeout(() => {
                        setExistError("");
                    }, 2000)
                    return oldList;
                }
                setExistError("")
                return [...oldList, { id: oldList.length, title: value }];
            });
        }
    };

    return (
        <div>
            <h1>Lista de Vendas</h1>

            <input placeholder="Adicionar Venda" onKeyDown={addVendas} />
            <button onClick={handleAddItem}>Adicionar Item</button>
            <button onClick={() => { setList([])}}>Limpar Lista</button>
            <button onClick={() => navigate("/tela-inicial")}>Tela Inicial</button>
            {ExistError && <p style={{ color: "red" }}>{ExistError}</p>}

            <p>Itens selectionados: {list.filter((list) => list.isCompleted).length}</p>

            <ul>
                {list.map((itemList, index) => {
                    return <li key={itemList.title}>{itemList.title}
                        <input type="checkbox"
                            checked={itemList.isCompleted}
                            onChange={() => {
                                setList(oldList => {
                                    return oldList.map(oldListItem => {
                                        const isChecked = oldListItem.title === itemList.title ? !oldListItem.isCompleted : oldListItem.isCompleted;
                                        return { ...oldListItem, isCompleted: isChecked };
                                    })
                                })
                            }} />
                    </li>;
                })}
            </ul>
        </div>
    );
}