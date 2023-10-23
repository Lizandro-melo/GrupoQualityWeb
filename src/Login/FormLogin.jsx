import Fundo1 from "../img/fundo1.png"
import Logo from "../img/Logo.png"
import { Component } from "react";
import ReactModal from "react-modal";

import FormSenha from "./FormSenha";
import { RequestsLogin } from "./Classes/Login.class";

export default class FormLogin extends Component {
  state = {
    modalMensageIsOpen: false,
    modalSenhaIsOpen: false,
    login: "",
    senha: "",
    mensagemError: "",
  };

  request = new RequestsLogin()

  stateModalMensage = () => {
    this.setState({
      modalMensageIsOpen:
        this.state.modalMensageIsOpen === false ? true : false,
    });
  }

  stateModalSenha = () => {
    this.setState({
      modalSenhaIsOpen:
        this.state.modalSenhaIsOpen === false ? true : false,
    })
  }

  render() {
    return (
      <section className="flex items-center">
        <section>
          <img className="w-screen h-screen" src={Fundo1} alt="" />
        </section>
        <ReactModal
          className="bg-transparent"
          isOpen={this.state.modalSenhaIsOpen}
          onRequestClose={this.stateModalSenha}
        >
          <FormSenha />
        </ReactModal>
        <form
          onSubmit={(e) => {
            this.request.Autenticar(e, this)
          }}
          className={`${this.state.modalSenhaIsOpen === true ? "!hidden" : ""}text-sky-950 w-1/4 lg:w-1/3 border-none py-20 text-center items-center  flex flex-col rounded-xl max-lg:scale-75`}
        >

          <ReactModal
            className="bg-transparent"
            isOpen={this.state.modalMensageIsOpen}
            onRequestClose={this.stateModalMensage}
            shouldCloseOnOverlayClick={false}
          >
            <form className="text-sky-950 z-50 w-1/2 border-2 border-stone-200 bg-white p-20 text-center items-center flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl">
              <h2 className="font-semibold mb-6 text-xl">
                {this.state.mensagemError}
              </h2>
              <button
                onClick={() => {
                  this.stateModalMensage()
                }}
                type="submit"
                className="mt-8 border  border-blue-950 w-32 h-9 m-5 hover:text-white hover:bg-blue-950 transition-colors font-semibold"
              >
                OK
              </button>
            </form>
          </ReactModal>
          <img className="py-3" src={Logo} alt="" />
          <section className="flex flex-col">
            <label className="py-1 pt-2 text-start" htmlFor="login">
              Login
            </label>
            <input
              placeholder="Nome Sobrenome"
              required
              value={this.state.login}
              onChange={(e) => this.setState({ login: e.target.value })}
              className="pl-2 focus:outline-none rounded-lg border placeholder:text-gray-400 border-stone-300 w-52 h-8"
              type="text"
            />
          </section>
          <section className="flex flex-col">
            <label htmlFor="login" className=" text-start py-1 pt-2">
              Senha
            </label>
            <input
              placeholder="Digite sua senha"
              required
              value={this.state.senha}
              onChange={(e) => this.setState({ senha: e.target.value })}
              className=" pl-2 focus:outline-none rounded-lg border placeholder:text-gray-400 border-stone-300 w-52 h-8"
              type="password"
            />
          </section>
          <section className="relative w-full">
            <span
              title="Esqueceu a senha?"
              onClick={this.stateModalSenha}
              className="text-xs cursor-pointer absolute right-14 max-lg:right-0"
            >
              Esqueci a senha!
            </span>
          </section>
          <button
            type="submit"
            className="mt-10 border  border-stone-300 w-32 h-9 m-5 hover:text-white hover:bg-blue-950 transition-colors font-semibold"
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}
