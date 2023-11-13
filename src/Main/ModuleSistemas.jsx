import { Component } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export default class ModuleSistemas extends Component {
  state = {
    listSistemas: [
      "Suporte TI",
      "Colaboradores",
      "Intranet",
      "Sistema de rotinas",
      "SAC",
      "Sistema de Estoque",
    ],
    mensagem: "",
    modalMensageIsOpen: false,
  };

  stateModalMensage = () => {
    this.setState({
      modalMensageIsOpen:
        this.state.modalMensageIsOpen === false ? true : false,
    });
    this.setState({
      mensagem: "",
    });
  };

  render() {
    const funcionario = JSON.parse(Cookies.get("user"));
    return this.state.listSistemas.map((element, index) => {
      let href;
      let target;
      let intranet = false;
      switch (index) {
        case 0:
          href = "/chamadas";
          break;
        case 1:
          return
          if ((funcionario.rolePrimary === "RH" || funcionario.rolePrimary === "MASTER") && (funcionario.roleSecondary === "COMUM" || funcionario.roleSecondary === "MASTER")) {
            href = "/colaboradores";
          } else {
            return;
          }
          break;
        case 2:
          href = `http://grupoquality.myddns.me:81/intranet/`;
          target = "_blank";
          intranet = true;
          break;
        case 3:
          return;
        case 4:
          
          return
        case 5:
          return;
        default:
          break;
      }
      return (
        <Link to={href} target={target}>
          <section
            className={`bg-white hover:bg-blue-950 w-72 h-36 flex items-center justify-center fy-center border border-blue-900 shadow-xl drop-shadow-2xl rounded-lg hover:scale-105 transition-transform  cursor-pointer text-blue-900 hover:text-white ${element === "Sistema de rotinas" ||
              element === "Sistema de Estoque"
              ? "!opacity-40 !cursor-not-allowed"
              : ""
              }`}
          >
            <span className=" font-medium text-lg">{element}</span>
          </section>
        </Link>
      );
    });
  }
}
