import { useNavigate, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import {
    Box,
    Button,
    Collapse,
    IconButton,
    Input,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useTheme
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";

import { LayoutBase } from "../../shared/layout";
import { ApiException } from "../../shared/services/ApiException";
import { IVendedor, VendedorServices } from "../../shared/services/vendedor/VendedorServices";
import { DetalhesVendasServices, IVendasDetalhes } from "../../shared/services/detalhes-vendas/DetalhesVendas";
import { IProdutos, ProdutosServices } from "../../shared/services/produtos/Produtos";
import { IItemSell, ItemSellServices } from "../../shared/services/item-sell/ItemSellServices";

export const DetalhesVendas = () => {
    const theme = useTheme();
    const { id } = useParams();
    const [detalhes, setDetalhes] = useState<IVendasDetalhes[]>([]);
    const [vendedores, setVendedores] = useState<IVendedor[]>([]);
    const [produtos, setProdutos] = useState<IProdutos[]>([]);
    const [itemSell, setitemSell] = useState<IItemSell[]>([]);
    const [linhaExpandida, setLinhaExpandida] = useState<number | null>(null);
    const navigate = useNavigate()

    useEffect(() => {
        const idNumber = Number(id);
        if (!id || isNaN(idNumber)) return;

        DetalhesVendasServices.getAll().then((res) => {
            if (res instanceof ApiException) {
                alert(res.message);
            } else {
                const detalhesFiltrados = res.filter((det) => Number(det.sellId) === idNumber);
                setDetalhes(detalhesFiltrados);
            }
        });
    }, [id]);


    useEffect(() => {
        VendedorServices.getAll().then((res) => {
            if (res instanceof ApiException) {
                alert(res.message);
            } else {
                setVendedores(res);
            }
        });
    }, []);

    useEffect(() => {
        ProdutosServices.getAll().then((res) => {
            if (res instanceof ApiException) {
                alert(res.message);
            } else {
                setProdutos(res);
            }
        });
    }, []);

    useEffect(() => {
        ItemSellServices.getAll()
            .then((res) => {
                if (res instanceof ApiException) {
                    alert(res.message);
                } else {
                    setitemSell(res);
                }
            });
    }, []);


    const getNomeVendedor = (id: number) =>
        vendedores.find((v) => v.id?.toString() === id?.toString())?.name ?? "Desconhecido";

    const getProduto = (id: number) => produtos.find((p) => p.id.toString() === id.toString());

    const getItemSellBySellAndProduct = (productId: number, sellId: number) => {
        return itemSell.find(item => item.productId?.toString() === productId.toString() && item.sellId?.toString() === sellId.toString());
    };

    const getItemQuantityBySellAndProduct = (productId: number, sellId: number): number => {
        const item = itemSell.find(
            (i) =>
                i.productId?.toString() === productId.toString() &&
                i.sellId?.toString() === sellId.toString()
        );
        return item?.quantity ?? 0;
    };

    console.log("aqui",itemSell.find((id) => id.id == 11))

    return (
        <LayoutBase Title="Detalhes de Venda">
            <Box
                component={Paper}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                padding={theme.spacing(2.5)}
                marginBottom={2}
            >
                <Input placeholder="Vendedor" sx={{ width: 150, height: 30 }} />
                <Button
                    variant="contained"
                    sx={{ width: 160, height: 30 }}
                    onClick={() => navigate('/adicionar-vendas')}>
                    Novo <AddIcon sx={{ ml: 1 }} />

                </Button>
                <Button
                    variant="contained"
                    sx={{ width: 160, height: 30 }}
                    onClick={() => navigate('/painel-vendas')}>
                    Voltar</Button>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id da Venda</TableCell>
                            <TableCell>Nome do Vendedor</TableCell>
                            <TableCell>Valor Total</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {detalhes.map((row) => (
                            <Fragment key={row.id}>
                                <TableRow>
                                    <TableCell>{row.sellId}</TableCell>
                                    <TableCell>{getNomeVendedor(row.sellerId)}</TableCell>
                                    <TableCell>
                                        {row.productList.reduce((acc, productId) => {
                                            const item = getItemSellBySellAndProduct(productId, row.sellId);
                                            const produto = getProduto(productId);

                                            if (item && produto) {
                                                return acc + item.quantity * Number(produto.unitValue);
                                            }

                                            return acc;
                                        }, 0).toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() =>
                                            setLinhaExpandida((prev) => (prev === row.id ? null : row.id))
                                        }>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                        <Collapse in={linhaExpandida === row.id} timeout="auto" unmountOnExit>
                                            <Box margin={2}>
                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Nome</TableCell>
                                                            <TableCell>Valor Individual</TableCell>
                                                            <TableCell>Quantidade</TableCell>
                                                            <TableCell>Descrição</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {row.productList.map((produtoId) => {
                                                            const produto = getProduto(produtoId);
                                                            if (!produto) return null;
                                                            return (
                                                                <TableRow key={produto.id}>
                                                                    <TableCell>{produto.name}</TableCell>
                                                                    <TableCell>R$ {produto.unitValue}</TableCell>
                                                                    <TableCell> {getItemQuantityBySellAndProduct(produto.id, row.sellId)}</TableCell>
                                                                    <TableCell>{produto.description}</TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </LayoutBase>
    );
};
