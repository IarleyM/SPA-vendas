import { useEffect, useMemo, useState } from "react";
import { IVendas, VendasServices } from "../../shared/services/vendas/VendasServices";
import { ApiException } from "../../shared/services/ApiException";
import { Input, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button, Paper, useTheme } from "@mui/material";
import { LayoutBase } from "../../shared/layout";

export const PainelVendas = () => {
    const theme = useTheme();
    const [vendedor, setVendedor] = useState<IVendas[]>([])
    const [inputVendedor, setInputVendedor] = useState("");
    const [rows, setRows] = useState<IVendas[]>([]);

    useEffect(() => {
        VendasServices.getAll()
            .then((response) => {
                if (response instanceof ApiException) {
                    alert(response.message);
                } else {
                    setVendedor(response);
                    console.log(response);
                    setRows(response);
                }
            })
    }, [])

    return (
        <div>
            <LayoutBase Title="Painel de Vendas">
                <Box
                    component={Paper}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center" 
                    padding={theme.spacing(2.5)}>
                    <Box
                        display="flex" flexDirection="column" gap={1} marginBottom={1} width={1}>
                        <Input placeholder="Vendedor" sx={{ width: 150, height: 30 }} />
                        <Input placeholder="Pagador" sx={{ width: 150, height: 30 }} />
                    </Box>
                    <Button variant="contained" sx={{ width: 160, height: 30 }}>Nova Venda</Button>
                </Box>

                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id do Vendedor</TableCell>
                            <TableCell>Pago</TableCell>
                            <TableCell>Valor Total</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Id do Pagador</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.isPayed ? "Sim" : "Não"}</TableCell>
                                <TableCell>{row.value}</TableCell>
                                <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                                <TableCell>{row.payerId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TableContainer>
            </LayoutBase>


        </div>
    )
}