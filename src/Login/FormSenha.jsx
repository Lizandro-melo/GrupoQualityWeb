import { Component } from "react";
import ReactModal from "react-modal";
import Logo1 from "../img/Logo.png"
import { RequestsLogin } from "./Classes/Login.class";

export default class FormSenha extends Component {
  state = {
    modalMensageIsOpen: false,
    nome: "",
    setor: "",
    ramal: "",
    mensagem: "",
  };

  request = new RequestsLogin()

  stateModalMensage = () => {
    this.setState({
      modalMensageIsOpen:
        this.state.modalMensageIsOpen === false ? true : false,
    });
  };


  render() {
    return (
      <form
        onSubmit={(e) => {
          this.request.RedefinirSenha(e, this)
        }}
        className=" text-sky-950 z-4 w-1/2 border-2 bg-white py-20 text-center items-center flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-xl drop-shadow-2xl"
      >
        <ReactModal
          className="bg-transparent"
          isOpen={this.state.modalMensageIsOpen}
          onRequestClose={this.stateModalMensage}
          shouldCloseOnOverlayClick={false}
        >
          <section className="text-sky-950 z-50 w-1/2 border-2 border-blue-900 bg-white py-20 text-center items-center flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-10">
            <h2 className="font-semibold mb-6 text-xl">
              {this.state.mensagem}
            </h2>
            <button
              onClick={() => {
                window.location.reload();
              }}
              type="button"
              className="mt-8 border border-blue-950 w-32 h-9 m-5 hover:text-white hover:bg-blue-950 transition-colors font-semibold"
            >
              OK
            </button>
          </section>
        </ReactModal>
        <img className="py-3" src={Logo1} alt="" />
        <label htmlFor="nome" className="py-2">
          Nome
        </label>
        <input
          placeholder="Digite seu nome"
          required
          value={this.state.nome}
          onChange={(e) => this.setState({ nome: e.target.value })}
          type="text"
          id="nome"
          className="p-1 text-center rounded-lg border placeholder:text-gray-400 border-stone-200 focus:outline-none w-64"
        />
        <label htmlFor="setor" className="py-2">
          Setor
        </label>
        <input
          required
          placeholder="Digite seu setor"
          value={this.state.setor}
          onChange={(e) => this.setState({ setor: e.target.value })}
          type="text"
          id="setor"
          className="p-1 text-center rounded-lg border placeholder:text-gray-400 border-stone-200 w-64 focus:outline-none"
        />
        <label htmlFor="Ramal" className="py-2">
          Ramal
        </label>
        <input
          required
          placeholder="Digite um ramal"
          value={this.state.ramal}
          onChange={(e) => this.setState({ ramal: e.target.value })}
          type="text"
          id="ramal"
          className="p-1 text-center rounded-lg border placeholder:text-gray-400 border-stone-200 w-64 focus:outline-none"
        />
        <section>
          <button
            type="submit"
            className="mt-10 border border-blue-950 w-32 h-9 m-5 hover:text-white hover:bg-blue-950 transition-colors font-semibold"
          >
            Enviar
          </button>
        </section>
      </form>
    );
  }
}
