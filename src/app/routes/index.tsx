import { Route, Routes as Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom"
import { Dashboard, ListaVendas, Login, PainelVendedor } from "../pages";
import { Navigate } from "react-router-dom";
import { PainelVendas } from "../pages/painel-vendas/PainelVendas";
import { DetalhesVendas } from "../pages/detalhe-venda/DetalhesVendas";
import { PainelProdutos } from "../pages/painel-produtos/PainelProdutos";
import { AdicionarVendas } from "../pages/adicionar-vendas/AdicionarVendas";

export const Routes = () => {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/tela-inicial" element={<Dashboard />} />
            <Route path="/grid-vendas" element={<Login />} />
            <Route path="/lista-vendas" element={<ListaVendas />} />
            <Route path="/painel-vendas" element={<PainelVendas />} />
            <Route path="/painel-vendedor" element={<PainelVendedor />} />
            <Route path="/detalhes-vendas/:id" element={<DetalhesVendas />} />
            <Route path="/painel-produtos" element={<PainelProdutos />} />
            <Route path="/adicionar-vendas" element={<AdicionarVendas />} />
            <Route path="*" element={<Navigate to="/grid-vendas" replace />} />
        </Switch>
    </BrowserRouter>
  );
}