import { ThemeProvider } from "@mui/material";
import { Routes } from "./routes/index";
import { lightTheme } from "./shared/themes";
import { SideBar } from "./pages/components/sidebar";
import { DrawerProvider } from "./shared/context";

export const App = () => {
  return (

    <ThemeProvider theme={lightTheme}>
      <DrawerProvider>
        <SideBar>
          <Routes />
        </SideBar>
      </DrawerProvider>
    </ThemeProvider>
  );
}
