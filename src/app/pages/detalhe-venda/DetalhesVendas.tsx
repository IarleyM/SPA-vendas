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
  useTheme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { LayoutBase } from "../../shared/layout";
import { ApiException } from "../../shared/services/ApiException";
import { IVendedor, VendedorServices } from "../../shared/services/vendedor/VendedorServices";
import { DetalhesVendasServices, IVendasDetalhes } from "../../shared/services/detalhes-vendas/DetalhesVendas";
import { IProdutos, ProdutosServices } from "../../shared/services/produtos/Produtos";
import { IItemSell, ItemSellServices } from "../../shared/services/item-sell/ItemSellServices";

export const DetalhesVendas = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  const [detalhes, setDetalhes] = useState<IVendasDetalhes[]>([]);
  const [vendedores, setVendedores] = useState<IVendedor[]>([]);
  const [produtos, setProdutos] = useState<IProdutos[]>([]);
  const [itemSell, setItemSell] = useState<IItemSell[]>([]);
  const [linhaExpandida, setLinhaExpandida] = useState<number | null>(null);

  const idVenda = Number(id);

  useEffect(() => {
    if (!idVenda) return;

    DetalhesVendasServices.getAll().then((res) => {
      if (res instanceof ApiException) {
        alert(res.message);
        return;
      }
      const detalhesFiltrados = res.filter((det) => Number(det.sellId) === idVenda);
      setDetalhes(detalhesFiltrados);
    });
  }, [idVenda]);

  useEffect(() => {
    VendedorServices.getAll().then((res) => {
      if (!(res instanceof ApiException)) {
        setVendedores(res);
      }
    });
  }, []);

  useEffect(() => {
    if (!idVenda) return;

    ProdutosServices.GetProductBySell(idVenda).then((res) => {
      if (!(res instanceof ApiException)) {
        setProdutos(res);
      }
    });
  }, [idVenda]);

  useEffect(() => {
    ItemSellServices.getAll().then((res) => {
      if (!(res instanceof ApiException)) {
        setItemSell(res);
      }
    });
  }, []);

  const getNomeVendedor = (sellerId: number) => {
    return vendedores.find((v) => v.sellerId === sellerId)?.name ?? "Desconhecido";
  };

  const getProduto = (id: number) => {
    return produtos.find((p) => p.productId === id);
  };

  const getItemQuantityBySellAndProduct = (productId: number, sellId: number): number => {
    const item = itemSell.find(
      (i) => i.productId === productId && i.sellId === sellId
    );
    return item?.quantity ?? 0;
  };

  const getTotalValueBySellId = (sellId: number): string => {
    const total = itemSell
      .filter((det) => det.sellId === sellId)
      .reduce((acc, curr) => acc + curr.total, 0);
    return `R$ ${total.toFixed(2)}`;
  };

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
        <Box display="flex" gap={1}>

          <Button
            variant="contained"
            sx={{ width: 160, height: 30 }}
            onClick={() => navigate("/painel-vendas")}
          >
            Voltar
          </Button>
        </Box>
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
              <Fragment key={row.sellId ?? Math.random()}>
                <TableRow>
                  <TableCell>{row.sellId}</TableCell>
                  <TableCell>{getNomeVendedor(row.sellerId)}</TableCell>
                  <TableCell>
                    {getTotalValueBySellId(row.sellId)}
                    </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        setLinhaExpandida((prev) => (prev === row.id ? null : row.id))
                      }
                    >
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
                            {produtos.map((prod) => {
                              const produto = getProduto(prod.productId);
                              if (!produto) return null;

                              return (
                                <TableRow key={produto.productId ?? Math.random()}>
                                  <TableCell>{produto.name}</TableCell>
                                  <TableCell>R$ {produto.unitValue}</TableCell>
                                  <TableCell>
                                    {getItemQuantityBySellAndProduct(produto.productId, row.sellId)}
                                  </TableCell>
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
