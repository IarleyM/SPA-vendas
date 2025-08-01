import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Autocomplete, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { IPagadores, PagadorServices } from "../../shared/services/pagadores/Pagadores";
import { ApiException } from "../../shared/services/ApiException";
import { IProdutos, ProdutosServices } from "../../shared/services/produtos/Produtos";
import { IVendedor, VendedorServices } from "../../shared/services/vendedor/VendedorServices";
import { LayoutBase } from "../../shared/layout";
import { Api } from "../../shared/services/apiConfig"; 
import { IRequestCreateVenda } from "../../shared/services/vendas/VendasServices";

type ProdutoSelecionado = {
    produto: IProdutos;
    quantidade: number;
};

type FormData = {
    pagador: IPagadores | null;
    vendedor: IVendedor | null;
    produtos: IProdutos | null;
};

export const AdicionarVendas = () => {
    const { handleSubmit, control } = useForm<FormData>();

    const [pagadores, setPagadores] = useState<IPagadores[]>([]);
    const [produtos, setProdutos] = useState<IProdutos[]>([]);
    const [vendedores, setVendedores] = useState<IVendedor[]>([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState<IProdutos | null>(null);
    const [quantidade, setQuantidade] = useState<number>(1);
    const [itens, setItens] = useState<ProdutoSelecionado[]>([]);

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

    const create = async (dataToCreate: IRequestCreateVenda): Promise<IRequestCreateVenda | ApiException> => {
        try {
            const { data } = await Api().post<any>('/AddNewSell', dataToCreate);
            return data;
        } catch (error) {
            return new ApiException("Erro ao criar venda");
        }
    };

    const onSubmit = async (data: FormData) => {
        if (!data.pagador || !data.vendedor) {
            alert("Selecione um pagador e um vendedor");
            return;
        }

        if (itens.length === 0) {
            alert("Adicione pelo menos um produto");
            return;
        }

        const itemSells = itens.map(item => ({
            quantity: item.quantidade,
            unitValue: Number(item.produto.unitValue), 
            total: item.quantidade * Number(item.produto.unitValue),
            productId: item.produto.productId
        }));

        const valorTotal = itemSells.reduce((acc, item) => acc + item.total, 0);

        const venda: IRequestCreateVenda = {
            isPayed: false,
            value: valorTotal,
            date: new Date().toISOString(),
            payerId: data.pagador.payerId,
            sellerId: data.vendedor.sellerId,
            itemSells
        };
        
        console.log("Venda",venda)
        const response = await create(venda);

        if (response instanceof ApiException) {
            alert(response.message);
        } else {
            alert("Venda cadastrada com sucesso!");
            setItens([]); 
        }
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
                                isOptionEqualToValue={(a, b) => a.sellerId === b?.sellerId}
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
                                isOptionEqualToValue={(a, b) => a.payerId === b?.payerId}
                                renderInput={(params) => <TextField {...params} label="Comprador" />}
                            />
                        )}
                    />

                    <Controller
                        name="produtos"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <Autocomplete<IProdutos>
                                disablePortal
                                options={produtos ?? []}
                                getOptionLabel={(option) => option.name}
                                onChange={(_, value) => {
                                    field.onChange(value);
                                    setProdutoSelecionado(value); 
                                }}
                                value={field.value}
                                isOptionEqualToValue={(a, b) => a.productId === b?.productId}
                                renderInput={(params) => <TextField {...params} label="Produtos" />}
                            />
                        )}
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
                </Box>
            </form>
        </LayoutBase>
    );
};
