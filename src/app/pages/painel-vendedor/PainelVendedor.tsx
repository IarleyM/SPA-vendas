import { useEffect, useState } from "react";
import { ApiException } from "../../shared/services/ApiException";
import { Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button, Paper, useTheme } from "@mui/material";
import { LayoutBase } from "../../shared/layout";
import { IVendedor, VendedorServices } from "../../shared/services/vendedor/VendedorServices";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useSearchParams } from "react-router-dom";

export const PainelVendedor = () => {
    const theme = useTheme();
    const [vendedor, setVendedor] = useState<IVendedor[]>([])
    const navigate = useNavigate()

    const [SearchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        VendedorServices.getAll()
            .then((response) => {
                if (response instanceof ApiException) {
                    alert(response.message);
                } else {
                    setVendedor(response);
                }
            })
    }, [])

    return (
        <div>
            <LayoutBase Title="Portal do Vendedor">
                <Box
                    component={Paper}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    padding={theme.spacing(2.5)}>
                    <Box
                        display="flex" flexDirection="column" gap={1} marginBottom={1} width={1}>
                        <Input placeholder="Vendedor" sx={{ width: 150, height: 30 }}
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
                                <TableCell>Id do Vendedor</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Telefone</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vendedor.map((row) => (
                                <TableRow key={row.sellerId}>
                                    <TableCell>{row.sellerId}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </LayoutBase>
        </div>
    )
}