import { Component } from "react";
import { formatarData } from "./Anotacoes/Constant/AnotacoesConstant";
import { getJSON } from "jquery";

export default class RelatorioGeral extends Component {
  state = {
    colaborador: JSON.parse(localStorage.getItem("colaborador")),
    dataInicio: localStorage.getItem("dataInicio"),
    dataFinal: localStorage.getItem("dataFinal"),
    anotacoes: JSON.parse(localStorage.getItem("anotacoesList")),
    relatorioGeral: JSON.parse(localStorage.getItem("relatorioGeral"))
  };

  render() {
    return (
      <main className=" h-screen w-full p-10">
        <section className="flex justify-between">
          <section className="text-2xl kanit flex flex-col gap-2">
            <section className="font-semibold">
              <span>{this.state.colaborador.nome.toUpperCase()}</span>
            </section>
            <section>
              <span>Setor: {this.state.colaborador.setor}</span>
            </section>
            <section>
              <span>Empresa: {this.state.colaborador.empresa}</span>
            </section>
            <section>
              <span>
                Data de Contratação: {this.state.colaborador.dataAdmissao}
              </span>
            </section>
            <section>
              <span>
                Periodo: {formatarData(this.state.dataInicio)} a{" "}
                {formatarData(this.state.dataFinal)}
              </span>
            </section>
          </section>
          <section>
            <img className="w-40" src={this.state.colaborador.foto} alt="" />
          </section>
        </section>
        <section className="py-8 flex flex-col gap-5">
          {this.state.anotacoes.map((anotacao) => {
            return (
              <section className="border text-xs border-stone-700 rounded-md p-3">
                <span>
                  {anotacao.dataInicio}: {anotacao.anotacao} - Motivo:{" "}
                  {anotacao.motivo == null ? "Não Informado" : anotacao.motivo}{" "}
                  -{" "}
                  {anotacao.atraso === true && anotacao.atrasoInt < 2
                    ? `${anotacao.atrasoInt} Minuto de Atraso`
                    : ""}{" "}
                  {anotacao.atraso === true && anotacao.atrasoInt > 2
                    ? `${anotacao.atrasoInt} Minutos de Atraso`
                    : ""}
                </span>
              </section>
            );
          })}
        </section>
        <section className=" relative">
          <section className="flex flex-col gap-2 text-lg">
            <span>Total de Faltas: {this.state.relatorioGeral.faltas}</span>
            <span>
              Total de Atrasos: {this.state.relatorioGeral.atrasoQuan} -
              Totalizando: {this.state.relatorioGeral.atrasoInt} minutos
            </span>
            <span>
              Total Atestado de Hora: {this.state.relatorioGeral.atestadoHora}
            </span>
            <span>
              Total de Suspensões: {this.state.relatorioGeral.suspensao}
            </span>
            <span>
              Total de Hora extra: {this.state.relatorioGeral.horaExtra} minutos
            </span>
            <span>
              Banco de Horas positivo: {this.state.relatorioGeral.bancoPositivo}{" "}
              minutos
            </span>
            <span>
              Banco de Horas negativo: {this.state.relatorioGeral.bancoNegativo}{" "}
              minutos
            </span>
            <span>
              Banco de Horas total: {this.state.relatorioGeral.bancoHoras}{" "}
              minutos
            </span>
          </section>
          <section className="absolute bottom-10 right-14 ">
            <button
              onClick={() => {window.history.back()}}
              className=" bg-white transition-colors border border-stone-300 px-12 h-10 rounded-md cursor-pointer hover:bg-stone-200 flex justify-center items-center font-medium"
            >
              Voltar
            </button>
          </section>
        </section>
      </main>
    );
  }
}
