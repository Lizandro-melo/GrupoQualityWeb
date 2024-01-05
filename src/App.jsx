import { Component } from "react";
import ModuleRoutes from "./Routes";
import Header from "./components/Header";

export default class App extends Component {
  // Nosso obj App é o responsavel pelo os direcionamentos, ele pega o module de routes e joga na raiz, se você for no index.jsx verá que ele estará importando o obj App dentro dele, assim fazendo o Routes funcionar.

  render() {
    return (
      <>
        <section className="h-screen w-screen flex-col flex kanit">
          <Header />
          <ModuleRoutes />
        </section>
      </>
    );
  }
}
