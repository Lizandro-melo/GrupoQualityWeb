import React, { Component } from "react";
import ListaPendentesMaster from "./ChamadasMaster/ListaPendentesMaster";
import ListaAndamentoMaster from "./ChamadasMaster/ListaAndamentoMaster";
import ListaFinalizadosMaster from "./ChamadasMaster/ListaFinalizadosMaster";
import ListaPendentesComum from "./ChamadasComum/ListaPendentesComum";
import ListaAndamentoComum from "./ChamadasComum/ListaAndamentoComum";
import ListaFinalizadosComum from "./ChamadasComum/ListaFinalizadosComum";
import ReactModal from "react-modal";
import FormAbrirChamada from "./FormAbrirChamada";
import iconCross from "../../img/icon/add.png";
import iconPendente from "../../img/icon/tickets.png";
import iconAndamento from "../../img/icon/time.png";
import iconFinalizado from "../../img/icon/check.png";
import ButtonSair from "../../models/ButtonSair";
import Cookies from "js-cookie";

export default class Chamadas extends Component {
  state = {
    isOpenPedidosAbertos: true,
    isOpenPedidosFechados: false,
    isOpenPedidosEmAndamento: false,
    selectPendentes: true,
    selectAndamento: false,
    selectFinalizados: false,
    modalIsOpen: false,
    user: JSON.parse(Cookies.get("user"))
  };

  stateModalIsOpen = () => {
    this.setState({
      modalIsOpen: this.state.modalIsOpen === false ? true : false,
    });
  };

  stateSelectPendentes = () => {
    this.setState({
      selectPendentes: true,
      selectAndamento: false,
      selectFinalizados: false,
    });
  };
  stateSelectAndamento = () => {
    this.setState({
      selectPendentes: false,
      selectAndamento: true,
      selectFinalizados: false,
    });
  };
  stateSelectFinalizados = () => {
    this.setState({
      selectPendentes: false,
      selectAndamento: false,
      selectFinalizados: true,
    });
  };

  render() {
    return (
      <section className="flex h-full w-full">
        <ReactModal
          className="bg-transparent z-20"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.stateModalIsOpen}
          appElement={document.getElementById("root")}
        >
          <FormAbrirChamada />
        </ReactModal>
        <section className="bg-white w-1/4 shadow-xl shadow-stone-400 relative">
          <ul className="flex flex-col">
            <li
              className={`bg-zinc-200 w-full h-14 text-black font-semibold flex items-center justify-start gap-3 pl-5 hover:bg-zinc-300 transition-colors ${
                this.state.selectPendentes === true ? "!bg-zinc-300" : ""
              }`}
              onClick={() => {
                this.stateSelectPendentes();
                if (this.state.modalIsOpen === true) {
                  this.stateModalIsOpen();
                }
              }}
            >
              <img className="w-6" src={iconPendente} alt="icon de ticket" />
              PENDENTE
            </li>
            <li
              className={`bg-zinc-200 w-full h-14 text-black font-semibold flex items-center justify-start gap-3 pl-5 hover:bg-zinc-300 transition-colors ${
                this.state.selectAndamento === true ? "!bg-zinc-300" : ""
              }`}
              onClick={() => {
                this.stateSelectAndamento();
                if (this.state.modalIsOpen === true) {
                  this.stateModalIsOpen();
                }
              }}
            >
              <img className="w-6" src={iconAndamento} alt="icon de relogio" />
              ANDAMENTO
            </li>
            <li
              className={`bg-zinc-200 w-full h-14 text-black font-semibold flex items-center justify-start gap-3 pl-5 hover:bg-zinc-300 transition-colors ${
                this.state.selectFinalizados === true ? "!bg-zinc-300" : ""
              }`}
              onClick={() => {
                this.stateSelectFinalizados();
                if (this.state.modalIsOpen === true) {
                  this.stateModalIsOpen();
                }
              }}
            >
              <img className="w-6" src={iconFinalizado} alt="icon de check" />
              FINALIZADOS
            </li>
            <li
              className={`bg-zinc-200 w-full h-14 text-black font-semibold flex items-center justify-start gap-3 pl-5 hover:bg-zinc-300 transition-colors`}
              onClick={this.stateModalIsOpen}
            >
              <img className="w-6" src={iconCross} alt="icon de add" />
              ABRIR CHAMADA
            </li>
          </ul>
          <ButtonSair />
        </section>
        <section
          className={`flex w-3/4 items-center justify-center ${
            this.state.selectPendentes ? "!flex" : "!hidden"
          }`}
        >
          <section
            className={`bg-white w-11/12 h-tabela rounded-3xl shadow-xl shadow-stone-400 scale-90
                        `}
          >
            {this.state.user.master === true ? <ListaPendentesMaster /> : <ListaPendentesComum />}
          </section>
        </section>
        <section
          className={`flex w-3/4 items-center justify-center ${
            this.state.selectAndamento ? "!flex" : "!hidden"
          }`}
        >
          <section
            className={`bg-white w-11/12 h-tabela rounded-3xl shadow-xl shadow-stone-400 scale-90
                        `}
          >
            {this.state.user.master === true ? <ListaAndamentoMaster /> : <ListaAndamentoComum />}
          </section>
        </section>
        <section
          className={`flex w-3/4 items-center justify-center ${
            this.state.selectFinalizados ? "!flex" : "!hidden"
          }`}
        >
          <section
            className={`bg-white w-11/12 h-tabela rounded-3xl shadow-xl shadow-stone-400 scale-90
                        `}
          >
            {this.state.user.master === true ? <ListaFinalizadosMaster /> : <ListaFinalizadosComum />}
          </section>
        </section>
      </section>
    );
  }
}
