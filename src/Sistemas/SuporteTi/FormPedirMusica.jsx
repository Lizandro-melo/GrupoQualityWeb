import { Component } from "react";
import ReactModal from "react-modal";
import { RequestsSuporteTi } from "./Classes/SuporteTi.class";
import axios from "axios";
import { ticketMusica } from "./Constant/SuporteTiConst";

export default class FormPedirMusica extends Component {
  state = {
    pedido: "",
    mensagem: "",
    modalMensagemIsOpen: false,
  };

  request = new RequestsSuporteTi()

  stateModalMensage = () => {
    this.setState({
      modalMensageIsOpen:
        this.state.modalMensagemIsOpen === false ? true : false,
    });
  };

  PedirMusica = async (e) => {
    e.preventDefault();
    const url = `https://localhost:8081/chamadas/pedido`;
    axios.post(url, ticketMusica(this)).then((response) => {
      this.setState({
        mensagem: response.data,
        modalMensagemIsOpen: true,
      });
    }).catch((e) => {
      switch (e.code) {
        case "ERR_NETWORK":
          this.setState({
            mensagem: "Erro de Conexão, motivos -> Certificado ou Servidor Back-end, contate ao TI.",
            modalMensageIsOpen: true,
          });
          break;
        default:
          break;
      }
    })
  }

  render() {
    return (
      <form
        onSubmit={(e) => {
          this.PedirMusica(e)
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
        <h2>Pedir Música</h2>
        <textarea
          required
          placeholder="Nome da música e quem canta, de preferência"
          className="resize-none p-3 rounded-md border w-10/12 placeholder:text-gray-400 border-stone-200"
          cols="30"
          rows="5"
          maxLength="30"
          value={this.state.pedido}
          onChange={(e) =>
            this.setState({
              pedido: e.target.value,
            })
          }
        ></textarea>
        <span className="text-stone-500 text-sm">Musicas separadas por virgula, Limite de 30 caracteres!</span>
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
