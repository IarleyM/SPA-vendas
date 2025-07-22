import { Route, Routes as Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom"
import { Dashboard, ListaVendas, Login } from "../pages";
import { Navigate } from "react-router-dom";
import { PainelVendas } from "../pages/painel-vendas/PainelVendas";

export const Routes = () => {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/tela-inicial" element={<Dashboard />} />
            <Route path="/grid-vendas" element={<Login />} />
            <Route path="/lista-vendas" element={<ListaVendas />} />
            <Route path="/painel-vendas" element={<PainelVendas />} />
            <Route path="*" element={<Navigate to="/grid-vendas" replace />} />
        </Switch>
    </BrowserRouter>
  );
}