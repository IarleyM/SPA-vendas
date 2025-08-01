import { Button, Drawer, IconButton, useTheme } from "@mui/material"
import { Box, useMediaQuery } from "@mui/system"
import { useDrawerContext } from "../../shared/context";
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';


interface SideBarProps {
    children?: React.ReactNode;
}

export const SideBar: React.FC<SideBarProps> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

    return (
        <>
            {smDown && (
                <Box position="fixed" top={0} left={0} zIndex={1301} p={1}>
                    <IconButton onClick={toggleDrawerOpen} color="inherit">
                        <MenuIcon />
                    </IconButton>
                </Box>
            )}
            <Drawer open={isDrawerOpen} variant={smDown ? "temporary" : "permanent"}>
                <Box
                    gap={0.75}
                    height="100vh"
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="center"
                    width={theme.spacing(10)}
                    margin={theme.spacing(2)}
                    padding={theme.spacing(2)}
                    color={theme.palette.primary.main}
                >
                    <Button
                        component={RouterLink}
                        to="/painel-vendas"
                        sx={{ width: 110, height: 30 }}
                        variant="contained"
                    >
                        Vendas
                    </Button>

                    <Button
                        component={RouterLink}
                        to="/painel-vendedor"
                        sx={{ width: 110, height: 30 }}
                        variant="contained"
                    >
                        Vendedor
                    </Button>

                    <Button
                        component={RouterLink}
                        to="/painel-produtos"
                        sx={{ width: 110, height: 30 }}
                        variant="contained"
                    >
                        Produtos
                    </Button>

                </Box>
            </Drawer>

            <Box
                height="100vh"
                marginLeft={smDown ? theme.spacing(5) : theme.spacing(20)}
            >
                {children}
            </Box>
        </>
    )
}