import { useEffect, useMemo, useState } from "react";
import { ApiException } from "../../shared/services/ApiException";
import { Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button, Paper, useTheme } from "@mui/material";
import { LayoutBase } from "../../shared/layout";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useSearchParams } from "react-router-dom";
import { IProdutos, ProdutosServices } from "../../shared/services/produtos/Produtos";

export const PainelProdutos = () => {
    const theme = useTheme();
    const [produtos, setProdutos] = useState<IProdutos[]>([])
    const navigate = useNavigate()

    const [SearchParams, setSearchParams] = useSearchParams()

    const busca = useMemo(() => {
        return SearchParams.get('busca') || ''
    }, [])

    useEffect(() => {
        ProdutosServices.getAll()
            .then((response) => {
                if (response instanceof ApiException) {
                    alert(response.message);
                } else {
                    setProdutos(response);
                }
            })
    }, [])

    return (
        <div>
            <LayoutBase Title="Portal do Produtos">
                <Box
                    component={Paper}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    padding={theme.spacing(2.5)}>
                    <Box
                        display="flex" flexDirection="column" gap={1} marginBottom={1} width={1}>
                        <Input placeholder="Produto" sx={{ width: 150, height: 30 }}
                            onChange={(e) => {
                                setSearchParams({ busca: e.target.value }, { replace: true });
                            }} />
                    </Box>
                    <Button variant="contained" sx={{ width: 160, height: 30 }}>
                        Novo <AddIcon sx={{ ml: 1 }} />
                    </Button>
                    <Button variant="contained" sx={{ width: 160, height: 30 }}
                        onClick={() => navigate('/painel-vendas')}>
                        Voltar</Button>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id do Produtos</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Preço Unitário</TableCell>
                                <TableCell>Descrição</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {produtos.map((row) => (
                                <TableRow key={row.productId}>
                                    <TableCell>{row.productId}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.unitValue}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </LayoutBase>
        </div>
    )
}