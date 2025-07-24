import { useEffect, useMemo, useState } from "react";
import { IVendas, VendasServices } from "../../shared/services/vendas/VendasServices";
import { ApiException } from "../../shared/services/ApiException";
import { Input, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button, Paper, useTheme, Table, IconButton } from "@mui/material";
import { LayoutBase } from "../../shared/layout";
import { Navigate, replace, useNavigate, useSearchParams } from "react-router-dom";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { IPagadores, PagadorServices } from "../../shared/services/pagadores/Pagadores";

export const PainelVendas = () => {
    const theme = useTheme();
    const [vendas, setVendas] = useState<IVendas[]>([])
    const [pagador, setPagador] = useState<IPagadores[]>([])
    const [rows, setRows] = useState<IVendas[]>([]);

    const [SearchParams, setSearchParams] = useSearchParams()

    const vendedorBusca = useMemo(() => SearchParams.get('vendedor') || '', [SearchParams]);
    const pagadorBusca = useMemo(() => SearchParams.get('pagador') || '', [SearchParams]);
    const navigate = useNavigate()

    useEffect(() => {
        VendasServices.getAll()
            .then((response) => {
                if (response instanceof ApiException) {
                    alert(response.message);
                } else {
                    setVendas(response);
                    setRows(response);
                }
            })
    }, [vendedorBusca])

    useEffect(() => {
        const buscarVendasFiltradas = async () => {
            try {
                let payerId: number | null = null;

                if (pagadorBusca) {
                    const pagadores = await PagadorServices.getByName(pagadorBusca);
                    if (!(pagadores instanceof ApiException) && pagadores.length > 0) {
                        payerId = pagadores[0].id;
                    }
                }

                const vendasResponse = await VendasServices.getAll();
                if (vendasResponse instanceof ApiException) {
                    alert(vendasResponse.message);
                    return;
                }

                let vendasFiltradas = vendasResponse;

                if (payerId !== null) {
                    vendasFiltradas = vendasFiltradas.filter(v => v.payerId?.toString() === payerId?.toString());
                }

                setRows(vendasFiltradas);

            } catch (err) {
                console.error(err);
            }
        };

        buscarVendasFiltradas();
    }, [vendedorBusca, pagadorBusca]);


    useEffect(() => {
        PagadorServices.getAll()
            .then((response) => {
                if (response instanceof ApiException) {
                    alert(response.message);
                } else {
                    setPagador(response);
                }
            })
    }, [])

    const payerName = (id: number | string) => {
        const payerName = pagador.find(v => v.id.toString() === id.toString())?.name || 'Desconhecido';
        return payerName;
    };

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
                        <Input
                            placeholder="Pagador"
                            sx={{ width: 150, height: 30 }}
                            value={pagadorBusca}
                            onChange={(e) => {
                                const value = e.target.value;
                                const newParams = new URLSearchParams(SearchParams);
                                newParams.set('pagador', value);
                                setSearchParams(newParams, { replace: true });
                            }}
                        />

                    </Box>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id da Venda</TableCell>
                                <TableCell>Pagador</TableCell>
                                <TableCell>Pago</TableCell>
                                <TableCell>Valor Total</TableCell>
                                <TableCell>Data</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{payerName(row.payerId)}</TableCell>
                                    <TableCell>{row.isPayed ? "Sim" : "Não"}</TableCell>
                                    <TableCell>{row.value}</TableCell>
                                    <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => navigate(`/detalhes-vendas/${row.id}`)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton>
                                            <AddIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </LayoutBase>
        </div>
    )
}