import Cookies from "js-cookie";
import { Component } from "react";

export default class Saida extends Component {
  // Esse metodo é responsavel pelo o reset na marquina do usuario, então qualquer adição feita no Cookie ou local/session storage você tera que entrar aqui e dar um clear ou um remove no caso do Cookie.
  desconectar = () => {
    Cookies.remove("user");
    Cookies.remove("tamanhoAntigo");
    localStorage.clear();
    window.location.reload();
  };

  render() {
    // Esse é apenas o modulo que executa essa função.
    return (
      <section
        onClick={() => {
          this.desconectar();
        }}
        className="text-white cursor-pointer mr-5"
      >
        <span>Sair</span>
      </section>
    );
  }
}
