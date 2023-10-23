import LogoGQ from "./LogoGQ";
import { Component } from "react";
import Cookies from "js-cookie";
import Saida from "./Saida";

export default class ModuleHeader extends Component {
  render() {
    const funcionario = JSON.parse(Cookies.get("user"));
    return (
      <header className="flex items-center justify-between w-full py-4 shadow-md h-16 sticky top-0 z-30 bg-blue-950">
        <LogoGQ />
        <span className="relative -left-1/4 text-white text-xl">
          {`Olá, ${funcionario.nome} ${funcionario.sobrenome}. Bem vindo!`}
        </span>
        <Saida />
      </header>
    );
  }
}
