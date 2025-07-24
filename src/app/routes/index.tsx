import { Route, Routes as Switch, Navigate } from "react-router-dom";
import { PainelVendedor } from "../pages";
import { PainelVendas } from "../pages/painel-vendas/PainelVendas";
import { DetalhesVendas } from "../pages/detalhe-venda/DetalhesVendas";
import { PainelProdutos } from "../pages/painel-produtos/PainelProdutos";
import { AdicionarVendas } from "../pages/adicionar-vendas/AdicionarVendas";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/painel-vendas" element={<PainelVendas />} />
      <Route path="/painel-vendedor" element={<PainelVendedor />} />
      <Route path="/detalhes-vendas/:id" element={<DetalhesVendas />} />
      <Route path="/painel-produtos" element={<PainelProdutos />} />
      <Route path="/adicionar-vendas" element={<AdicionarVendas />} />
      <Route path="*" element={<Navigate to="/painel-vendas" replace />} />
    </Switch>
  );
}
