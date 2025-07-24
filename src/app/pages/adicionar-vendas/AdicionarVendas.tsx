import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Autocomplete, Box, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useFetcher } from "react-router-dom";
import { useEffect, useState } from "react";
import { IPagadores, PagadorServices } from "../../shared/services/pagadores/Pagadores";
import { ApiException } from "../../shared/services/ApiException";
import { IProdutos, ProdutosServices } from "../../shared/services/produtos/Produtos";
import { IVendedor, VendedorServices } from "../../shared/services/vendedor/VendedorServices";
import { LayoutBase } from "../../shared/layout";

type ProdutoSelecionado = {
    produto: IProdutos;
    quantidade: number;
};

type FormData = {
    pagador: IPagadores | null;
    vendedor: IVendedor | null;
};

export const AdicionarVendas = () => {
    const { handleSubmit, control } = useForm<FormData>();

    const [pagadores, setPagadores] = useState<IPagadores[]>([]);
    const [produtos, setProdutos] = useState<IProdutos[]>([]);
    const [vendedores, setVendedores] = useState<IVendedor[]>([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState<IProdutos | null>(null);
    const [quantidade, setQuantidade] = useState<number>(1);
    const [itens, setItens] = useState<ProdutoSelecionado[]>([]);

    // Buscas
    useEffect(() => {
        PagadorServices.getAll().then(res => res instanceof ApiException ? alert(res.message) : setPagadores(res));
        ProdutosServices.getAll().then(res => res instanceof ApiException ? alert(res.message) : setProdutos(res));
        VendedorServices.getAll().then(res => res instanceof ApiException ? alert(res.message) : setVendedores(res));
    }, []);

    const adicionarItem = () => {
        if (!produtoSelecionado || quantidade <= 0) return;
        setItens(old => [...old, { produto: produtoSelecionado, quantidade }]);
        setProdutoSelecionado(null);
        setQuantidade(1);
    };

    const onSubmit = (data: FormData) => {
        const venda = {
            ...data,
            produtosVendidos: itens
        };
    };

    return (
        <LayoutBase Title="Adição de Venda">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>

                    <Controller
                        name="vendedor"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <Autocomplete
                                disablePortal
                                options={vendedores}
                                getOptionLabel={(option) => option.name}
                                onChange={(_, value) => field.onChange(value)}
                                value={field.value}
                                isOptionEqualToValue={(a, b) => a.id === b?.id}
                                renderInput={(params) => <TextField {...params} label="Vendedor" />}
                            />
                        )}
                    />
                    <Controller
                        name="pagador"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <Autocomplete
                                disablePortal
                                options={pagadores}
                                getOptionLabel={(option) => option.name}
                                onChange={(_, value) => field.onChange(value)}
                                value={field.value}
                                isOptionEqualToValue={(a, b) => a.id === b?.id}
                                renderInput={(params) => <TextField {...params} label="Comprador" />}
                            />
                        )}
                    />

                    <Autocomplete
                        disablePortal
                        options={produtos}
                        getOptionLabel={(option) => option.name}
                        onChange={(_, value) => setProdutoSelecionado(value)}
                        value={produtoSelecionado}
                        isOptionEqualToValue={(a, b) => a.id === b?.id}
                        renderInput={(params) => <TextField {...params} label="Produto" />}
                    />

                    <TextField
                        label="Quantidade"
                        type="number"
                        value={quantidade}
                        onChange={(e) => setQuantidade(parseInt(e.target.value))}
                    />

                    <Button variant="outlined" onClick={adicionarItem}>
                        Adicionar Produto
                    </Button>

                    {itens.length > 0 && (
                        <Box>
                            {itens.map((item, index) => (
                                <Box key={index} display="flex" justifyContent="space-between">
                                    <span>{item.produto.name}</span>
                                    <span>Qtd: {item.quantidade}</span>
                                </Box>
                            ))}
                        </Box>
                    )}

                    <Button type="submit" variant="contained" sx={{ width: 160, height: 30 }}>
                        Salvar<AddIcon sx={{ ml: 1 }} />
                    </Button>
                    <Button type="submit" variant="contained" sx={{ width: 160, height: 30 }}>
                        Salvar<AddIcon sx={{ ml: 1 }} />
                    </Button>
                </Box>
            </form>
        </LayoutBase>
    );
};
