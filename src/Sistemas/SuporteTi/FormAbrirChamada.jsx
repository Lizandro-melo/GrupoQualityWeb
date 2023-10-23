import { Component } from "react";
import ReactModal from "react-modal";
import { RequestsSuporteTi } from "./Classes/SuporteTi.class";

export default class FormAbrirChamada extends Component {
  state = {
    pedido: "",
    mensagem: "",
    modalMensagemIsOpen: false,
    file: {

    }
  };

  request = new RequestsSuporteTi()

  stateModalMensage = () => {
    this.setState({
      modalMensageIsOpen:
        this.state.modalMensagemIsOpen === false ? true : false,
    });
  };

  render() {
    return (
      <form
        onSubmit={(e) => {
          this.request.AbrirChamada(e, this)
        }}
        encType="multipart/form-data"
        className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 rounded-xl shadow-2xl  flex items-center border-2  bg-zinc-50 flex-col w-2/4 p-7 gap-5 justify-around"
      >
        <ReactModal
          appElement={document.getElementById("root")}
          className="bg-transparent z-50"
          isOpen={this.state.modalMensagemIsOpen}
          onRequestClose={this.stateModalMensage}
          shouldCloseOnOverlayClick={false}
        >
          <section className="text-sky-950 w-1/2 border-2 border-blue-900 bg-white py-20 text-center items-center flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl z-50">
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
        <h2>Abrir Chamadas</h2>
        <textarea
          required
          placeholder="Descreva o Problema"
          className="resize-none p-3 rounded-md border w-10/12 placeholder:text-gray-400 border-stone-200"
          cols="30"
          rows="5"
          minLength="200"
          value={this.state.pedido}
          onChange={(e) =>
            this.setState({
              pedido: e.target.value,
            })
          }
        ></textarea>
        <section className="flex items-baseline gap-5 justify-center">
          <input className="mb-5 file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-stone-100 file:text-blue-950
      hover:file:bg-stone-200 text-xs" type="file" onChange={(e) => {
              this.setState({
                file: e.target.files[0]
              })
            }} />
        </section>
        <button
          type="submit"
          className="border w-2/6 h-11 hover:text-white hover:bg-blue-950 transition-colors font-semibold"
        >
          Enviar
        </button>
      </form>
    );
  }
}
