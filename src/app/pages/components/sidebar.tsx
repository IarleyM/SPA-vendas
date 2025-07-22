import { Button, Drawer, Icon, IconButton, Paper, useTheme } from "@mui/material"
import { Box, useMediaQuery } from "@mui/system"
import { useDrawerContext } from "../../shared/context";
import MenuIcon from '@mui/icons-material/Menu';

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
                        <MenuIcon/>
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
                    <Button sx={{ width: 110, height: 30 }} variant="contained" href="/painel-vendas">
                        Vendas
                    </Button>
                    <Button sx={{ width: 110, height: 30 }} variant="contained" href="https://www.xvideos.com/">
                        Vendedor
                    </Button>
                    <Button sx={{ width: 110, height: 30 }} variant="contained" href="https://www.xvideos.com/">
                        Comprador
                    </Button>
                </Box>
            </Drawer>

            <Box height="100vh" marginLeft={theme.spacing(20)}>
                {children}
            </Box>
        </>
    )
}