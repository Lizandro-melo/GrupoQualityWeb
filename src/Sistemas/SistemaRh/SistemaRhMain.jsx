import { Component } from "react";
import iconAnotar from "../../img/icon/anotar.png";
import iconAddFuncionario from "../../img/icon/addFuncionario.png";
import iconAtualizar from "../../img/icon/atualizar.png";
import iconRelatorio from "../../img/icon/relatorio.png";
import AnotacoesMain from "./Anotacoes/page";
import CadastrarSistemaRh from "./Cadastrar/page";
import AtualizarSistemaRh from "./Atualizar/page";
import RelatoriosMain from "./Relatorio/RelatoriosMain";
import Relatorios from "./Relatorio/page";

export default class SistemaRhMain extends Component {
  state = {
    select:
      localStorage.getItem("selectRh") === null
        ? ""
        : localStorage.getItem("selectRh"),
  };

  render() {
    return (
      <section className="heebo flex h-full bg-stone-100">
        <section className="coluna-nav h-full flex flex-col items-center gap-3 z-20">
          <section className=" flex flex-col gap-5 sticky top-16">
            <button
              onClick={() => {
                this.setState({ select: "Anotação" });
                localStorage.setItem("selectRh", "Anotação");
              }}
              className="mt-3 w-11 h-11 bg-slate-100 flex justify-start items-center rounded-xl overflow-hidden pl-2.5 gap-10 group/icons border-stone-400 border"
            >
              <img
                src={iconAnotar}
                className="w-6"
                alt="anotação"
                title="Adicionar uma anotação "
              />
              <span className="absolute w-52 left-8 z-50 border border-l-0 border-stone-400 flex items-center rounded-e-xl px-10 h-11 bg-slate-100 font-bold scale-0 group-hover/icons:scale-100 transition-transform">
                Nova Anotação
              </span>
            </button>
            <button
              onClick={() => {
                this.setState({ select: "Cadastro" });
                localStorage.setItem("selectRh", "Cadastro");
              }}
              className="w-11 h-11 bg-slate-100 flex justify-start items-center rounded-xl overflow-hidden pl-2.5 gap-10 group/icons border-stone-400 border"
            >
              <img
                src={iconAddFuncionario}
                className="w-6"
                alt="anotação"
                title="Adicionar uma anotação "
              />
              <span className="absolute w-56 left-8 z-50 border border-l-0 border-stone-400 flex items-center rounded-e-xl px-10 h-11 bg-slate-100 font-bold scale-0 group-hover/icons:scale-100 transition-transform">
                Novo Colaborador
              </span>
            </button>
            <button
              onClick={() => {
                this.setState({ select: "Atualizar" });
                localStorage.setItem("selectRh", "Atualizar");
              }}
              className=" w-11 h-11 bg-slate-100 flex justify-start items-center rounded-xl overflow-hidden pl-2.5 gap-10 group/icons z-50 border-stone-400 border"
            >
              <img
                src={iconAtualizar}
                className="w-6"
                alt="anotação"
                title="Adicionar uma anotação "
              />
              <span className="absolute left-8 z-50 flex border border-l-0 border-stone-400 items-center rounded-e-xl px-10 h-11 bg-slate-100 font-bold scale-0 group-hover/icons:scale-100 transition-transform">
                Atualizar
              </span>
            </button>
            <button
              onClick={() => {
                this.setState({ select: "Relatorios" });
                localStorage.setItem("selectRh", "Relatorios");
              }}
              className=" w-11 h-11 bg-slate-100 flex justify-start items-center rounded-xl overflow-hidden pl-2.5 gap-10 group/icons z-50 border-stone-400 border"
            >
              <img
                src={iconRelatorio}
                className="w-6"
                alt="anotação"
                title="Gerar Relatiorio "
              />
              <span className="absolute w-48 left-8 z-50 flex border border-l-0 border-stone-400 items-center rounded-e-xl px-10 h-11 bg-slate-100 font-bold scale-0 group-hover/icons:scale-100 transition-transform">
                Gerar Relatório
              </span>
            </button>
          </section>
        </section>
        <section className="p-3 h-full flex w-full z-10">
          {this.state.select === "Anotação" && <AnotacoesMain />}
          {this.state.select === "Cadastro" ? <CadastrarSistemaRh />}
          {this.state.select === "Atualizar" ? <AtualizarSistemaRh /> }
          {this.state.select === "Relatorios" ? <Relatorios />}
        </section>
      </section>
    );
  }
}
