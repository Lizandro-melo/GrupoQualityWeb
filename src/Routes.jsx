import { Home } from "./Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Component } from "react";
import Cookies from "js-cookie";
import Relatorio from "./Sistemas/SistemaRh/RelatiorioIndividual";
import RelatorioAll from "./Sistemas/SistemaRh/RelatiorioTodos";
import RelatorioGeral from "./Sistemas/SistemaRh/RelatorioGeral";
import FormLogin from "./Login/page";
import SuporteTi from "./Sistemas/SuporteTi/page";
import SistemaRH from "./Sistemas/SistemaRh/page";

export default class ModuleRoutes extends Component {
  state = {
    token: Cookies.get("user"),
  };
  // O state existe em todos os objetos por aqui, ele guarda para você estados, nesse caso ele esta dando um get no token existente no site.

  render() {
    return (
      // O Routes é responsável por direcionar o clint entre as paginas, state token verifica se há algum usuario logado, a baixo você verá um teste onde cada pagina verifica se o usuario esta logado como forma de segurança, o único diferente da lista é nossa raiz ( / ) onde verifica se há um user caso tenha ele volta para a home ( /home ).
      <BrowserRouter>
        <Routes>
          <Route
            element={!this.state.token ? <FormLogin /> : <Navigate to="/home" />}
            path="/"
          />
          <Route
            element={this.state.token ? <SistemaRH /> : <Navigate to="/home" />}
            path="/colaboradores"
          />
          <Route
            element={this.state.token ? <Home /> : <Navigate to="/" />}
            path="/home"
          />
          <Route
            element={this.state.token ? <SuporteTi /> : <Navigate to="/" />}
            path="/chamadas"
          />
          <Route
            element={this.state.token ? <Relatorio /> : <Navigate to="/" />}
            path="/relatorio/individual"
          />
          <Route
            element={this.state.token ? <RelatorioAll /> : <Navigate to="/" />}
            path="/relatorio/all"
          />
          <Route
            element={this.state.token ? <RelatorioGeral /> : <Navigate to="/" />}
            path="/relatorio/geral"
          />
        </Routes>
      </BrowserRouter>
    );
    // Caso venha Criar mais sistemas irá precisar colocar aqui e dar um direcional para ele, colocando a mesma regra de verificação ou outra que venha a ser importante
    // Exemplo é o sistema de estoque
  }
}
