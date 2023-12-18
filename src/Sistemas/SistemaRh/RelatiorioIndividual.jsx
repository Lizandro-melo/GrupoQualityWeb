import { Component } from "react";
import { formatarData } from "./Anotacoes/Constant/AnotacoesConstant";

export default class Relatorio extends Component {
  state = {
    relatorioIdividual: JSON.parse(localStorage.getItem("relatorioIdividual")),
  };

  componentDidMount = () => {
    const doc = document.getElementById("relatorio");
    window.print(doc);
    window.history.back()
  };

  render() {
    return (
      <main
        id="relatorio"
        className="kanit flex flex-col  justify-center items-center"
      >
        <section className="flex flex-col justify-center gap-32 items-center h-screen">
          <section className="flex gap-4 flex-col justify-center items-center">
            <section className="flex justify-center items-center gap-1 flex-col">
              <h2 className="text-xl font-bold">
                {this.state.relatorioIdividual.nomeCompleto}
              </h2>
              <span>
                Admitido(a): {this.state.relatorioIdividual.dataAdmissao}
              </span>
            </section>
            <section>
              <span>
                Periodo:{" "}
                {formatarData(this.state.relatorioIdividual.dataInicial)} até{" "}
                {formatarData(this.state.relatorioIdividual.dataFinal)}
              </span>
            </section>
            <section>
              <ul className="gap-2 flex flex-col items-center">
                <li>
                  Banco de horas <strong>positivo</strong> do mês:{" "}
                  {this.state.relatorioIdividual.bancoPositivo} minutos
                </li>
                <li>
                  Banco de horas <strong>negativo</strong> do mês:{" "}
                  {this.state.relatorioIdividual.bancoNegativo} minutos
                </li>
                <li>
                  Saldo total no <strong>banco de horas</strong>:{" "}
                  {this.state.relatorioIdividual.bancoHoras} minutos
                </li>
              </ul>
            </section>
            <section className="flex justify-center mt-14 items-center gap-1 flex-col">
              <hr className="w-96 border-black" />
              <span>Ass. Colaborador</span>
            </section>
          </section>
          <section className="flex gap-4 flex-col justify-center items-center">
            <section className="flex justify-center items-center gap-1 flex-col">
              <h2 className="text-xl font-bold">
                {this.state.relatorioIdividual.nomeCompleto}
              </h2>
              <span>
                Admitido(a): {this.state.relatorioIdividual.dataAdmissao}
              </span>
            </section>
            <section>
              <span>
                Periodo:{" "}
                {formatarData(this.state.relatorioIdividual.dataInicial)} até{" "}
                {formatarData(this.state.relatorioIdividual.dataFinal)}
              </span>
            </section>
            <section>
              <ul className="gap-2 flex flex-col items-center">
                <li>
                  Banco de horas <strong>positivo</strong> do mês:{" "}
                  {this.state.relatorioIdividual.bancoPositivo} minutos
                </li>
                <li>
                  Banco de horas <strong>negativo</strong> do mês:{" "}
                  {this.state.relatorioIdividual.bancoNegativo} minutos
                </li>
                <li>
                  Saldo total no <strong>banco de horas</strong>:{" "}
                  {this.state.relatorioIdividual.bancoHoras} minutos
                </li>
              </ul>
            </section>
            <section className="flex justify-center mt-14 items-center gap-1 flex-col">
              <hr className="w-96 border-black" />
              <span>Ass. Colaborador</span>
            </section>
          </section>
        </section>
      </main>
    );
  }
}
