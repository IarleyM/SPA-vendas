import { useEffect, useMemo, useState } from "react";
import { IVendas, VendasServices } from "../../shared/services/vendas/VendasServices";
import { ApiException } from "../../shared/services/ApiException";
import { Input, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button, Paper, useTheme, Table, IconButton, Skeleton } from "@mui/material";
import { LayoutBase } from "../../shared/layout";
import { useNavigate, useSearchParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { IPagadores, PagadorServices } from "../../shared/services/pagadores/Pagadores";
import DeleteIcon from '@mui/icons-material/Delete';

export const PainelVendas = () => {
    const theme = useTheme();
    const [pagador, setPagador] = useState<IPagadores[]>([])
    const [rows, setRows] = useState<IVendas[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [SearchParams, setSearchParams] = useSearchParams()

    const pagadorBusca = useMemo(() => SearchParams.get('pagador') || '', [SearchParams]);
    const navigate = useNavigate()

    useEffect(() => {
        const buscarVendasFiltradas = async () => {
            try {
                let payerId: number | null = null;

                if (pagadorBusca) {
                    const pagadores = await PagadorServices.getByName(pagadorBusca);
                    if (!(pagadores instanceof ApiException) && pagadores.length > 0) {
                        payerId = pagadores[0].payerId;
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
                setIsLoading(false);
            } catch (err) {
                console.error(err);
            }
        };

        buscarVendasFiltradas();
    }, [pagadorBusca, rows]);


    useEffect(() => {
        const carregarPagadores = async () => {
            const response = await PagadorServices.getAll();
            if (response instanceof ApiException) {
                console.error("Erro ao carregar pagadores:", response.message);
                setPagador([]);
            } else {
                setPagador(response);
            }
        };

        carregarPagadores();
    }, []);


    const payerName = (id: number): string => {
        if (!Array.isArray(pagador)) return 'Desconhecido';
        if (id === null || id === undefined) return 'Desconhecido';

        const encontrado = pagador.find(p => p.payerId === Number(id));

        if (!encontrado) {
            console.warn(`Pagador com ID ${id} não encontrado`);
            return 'Desconhecido';
        }

        return encontrado.name;
    };

    const hangleConfirmSell = (id: number) => {
        if (window.confirm("Tem certeza que deseja confirmar esta venda?")) {
            VendasServices.update(id, { isPayed: true } as IVendas)
        }
    }

    const hangleDeleteSell = (id: number) => {
        if (window.confirm("Tem certeza que deseja deletar esta venda?")) {
            VendasServices.remove(id).then((res) => {      
                if (res instanceof ApiException) {
                    alert(res.message);
                }   
                else {  
                    setRows(rows.filter(row => row.sellId !== id));
                }
            })
        }
    }
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
                            <Button
                                variant="contained"
                                sx={{ width: 160, height: 30 }}
                                onClick={() => navigate("/adicionar-vendas")}
                            >
                                Nova Venda
                            </Button>
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
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            {Array.from({ length: 6 }).map((_, cellIndex) => (
                                                <TableCell key={cellIndex}>
                                                    <Skeleton variant="rectangular" width="100%" />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    rows.map((row) => (
                                        <TableRow key={row.sellId}>
                                            <TableCell>{row.sellId}</TableCell>
                                            <TableCell>{payerName(row.payerId)}</TableCell>
                                            <TableCell>{row.isPayed ? "Sim" : "Não"}</TableCell>
                                            <TableCell>{row.value}</TableCell>
                                            <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => navigate(`/detalhes-vendas/${row.sellId}`)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => hangleConfirmSell(row.sellId)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => hangleDeleteSell(row.sellId)}>
                                                    <AddIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>

                        </Table>
                    </TableContainer>
                </LayoutBase>
            </div>
        )
    }