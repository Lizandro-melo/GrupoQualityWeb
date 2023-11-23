import axios from "axios";
import { Component } from "react";
import ReactModal from "react-modal";
import Cookies from "js-cookie";
import iconPendente from "../../../img/icon/tickets256x.png";
import iconAndamento from "../../../img/icon/clock256x.png";
import iconFinalizado from "../../../img/icon/check256x.png";
import iconAnexo from "../../../img/icon/anexo.png";
import iconDownload from "../../../img/icon/icon_download.png";
import { RequestsSuporteTi, UpdateSuporteTi } from "../Classes/SuporteTi.class";
import iconMusica from "../../../img/icon/iconMusica.png";



export default class ListaMusicaMaster extends Component {

  state = {
    pendentes: [],
    tamanhoPendente: Cookies.get("tamanhoPendente")
      ? Cookies.get("tamanhoPendente")
      : Cookies.set("tamanhoPendente", 0),
    modalIsOpen: false,
    itemSelecionado: {},
    foto: "",
    time: 0,
    file: {

    }
  };

  requests = new RequestsSuporteTi()
  updates = new UpdateSuporteTi()

  stateModalIsOpen = (item) => {
    this.setState({
      modalIsOpen: this.state.modalIsOpen === false ? true : false,
      itemSelecionado: item,
      foto: `foto-funcionarios/${item.nome}.png`
    });
  };

  render() {
    this.requests.RequestChamadasMusicasMaster(this);
    return (
      <section className="flex flex-col w-full h-full">
        <section className="flex w-full bg-stone-200 h-44 shadow-md rounded-t-3xl">
          <section className="flex items-center justify-evenly w-full">
            <section className="flex items-center gap-4">
              <section className="flex flex-col justify-center items-center">
                <img
                  className="w-12 h-12"
                  src={iconPendente}
                  alt="icon de ticket"
                />
              </section>
              <section className=" flex flex-col">
                <span className="text-4xl font-bold">
                  {Cookies.get("tamanhoPendente")}
                </span>
                <span>PENDENTES</span>
              </section>
            </section>
            <section className="flex items-center gap-4">
              <section className="flex flex-col justify-center items-center">
                <img
                  className="w-12 h-12"
                  src={iconAndamento}
                  alt="icon de ticket"
                />
              </section>
              <section className=" flex flex-col">
                <span className="text-4xl font-bold">
                  {Cookies.get("tamanhoAndamento")}
                </span>
                <span>ANDAMENTOS</span>
              </section>
            </section>
            <section className="flex items-center gap-4">
              <section className="flex flex-col justify-center items-center">
                <img
                  className="w-12 h-12"
                  src={iconFinalizado}
                  alt="icon de ticket"
                />
              </section>
              <section className="flex flex-col">
                <span className="text-4xl font-bold">
                  {Cookies.get("tamanhoFinalizado")}
                </span>
                <span>FINALIZADOS</span>
              </section>
            </section>
            <section className="flex items-center gap-4">
              <section className="flex flex-col justify-center items-center">
                <img
                  className="w-12 h-12"
                  src={iconMusica}
                  alt="icon de ticket"
                />
              </section>
              <section className="flex flex-col">
                <span className="text-4xl font-bold">
                  {Cookies.get("tamanhoMusica")}
                </span>
                <span>MUSICAS</span>
              </section>
            </section>
          </section>
        </section>
        <ReactModal
          className="bg-transparent z-20"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.stateModalIsOpen}
        >
          <section className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 rounded-xl shadow-2xl  flex items-center border-2  bg-zinc-50 flex-col w-2/4 py-10">
            <h1 className="text-xl pb-8">Pedido</h1>
            <section className="flex gap-3 text-sm mb-10">
              <section className="flex-none w-20 h-20 bg-slate-400">
                <img src={this.state.foto} alt="" />
              </section>
              <section className="flex flex-col justify-center">
                <span className="font-semibold">
                  Nome: {this.state.itemSelecionado.nome}
                </span>
                <span className="font-semibold">
                  Setor: {this.state.itemSelecionado.setor}
                </span>
                <span className="font-semibold">
                  Data/Hora: {this.state.itemSelecionado.dataHora}
                </span>
                <span className="font-semibold">
                  Responsavel: {this.state.itemSelecionado.responsavel}
                </span>
              </section>
            </section>
            <section className="p-5 rounded-lg flex justify-center items-start border border-black w-2/3 h-full mb-10">
              <p className="text-center font-semibold">
                {this.state.itemSelecionado.os}
              </p>
            </section>
          </section>
        </ReactModal>
        <section className="h-3/4 flex flex-col rounded-b-3xl ">
          <section className="flex w-full bg-white sticky top-0 justify-between px-7 font-bold text-lg shadow-md shadow-slate-200">
            <span className="c-pedido ">Pedido</span>
            <span className="c-setor text-center ">Setor</span>
            <span className="c-datahora text-center ">Data / Hora</span>
            <span className="c-status text-center ">Status</span>
          </section>
          <section className="h-full w-full overflow-auto">
            {this.state.pendentes.map((item, index) => {
              return (
                <section key={item.id} className="h-20 items-center border-b-2 px-7 flex justify-between hover:bg-slate-100 cursor-pointer">
                  <section
                    onClick={() => {
                      this.stateModalIsOpen(item);
                    }}
                    className="c-pedido flex after:w-0.5 after:h-5 after:bg-stone-200 h-full items-center after:relative after:-right-16"
                  >
                    <section className="flex flex-col justify-center">
                      <span>{item.nome}</span>
                      <span className="pedido c-pedido ">{item.os}</span>
                    </section>
                    <img src={iconAnexo} className={`${item.enderecoArquivo === null ? "!hidden" : ""} w-5`} alt="" />
                  </section>
                  <span
                    onClick={() => {
                      this.stateModalIsOpen(item);
                    }}
                    className="c-setor text-xs text-center flex h-full justify-center items-center"
                  >
                    {item.setor}
                  </span>
                  <span
                    onClick={() => {
                      this.stateModalIsOpen(item);
                    }}
                    className="c-datahora text-xs text-center flex h-full justify-center items-center"
                  >
                    {item.dataHora}
                  </span>
                  <section className="flex justify-center gap-3 c-status h-full items-center">
                    <span
                      onClick={() => {
                        this.updates.enviarParaInativo(item);
                      }}
                      className="w-5 cursor-pointer"
                    >
                      	&#10006;
                    </span>
                  </section>
                </section>
              );
            })}
          </section>
        </section>
      </section>
    );
  }
}
