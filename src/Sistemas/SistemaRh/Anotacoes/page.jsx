import { Component, useEffect, useState } from "react";
import iconFiltro from "../../../img/icon/filtro.png";
import { RequisicaoAnotacao } from "./Classes/RequisicaoAnotacao";
import { formatarDataInput } from "./Constant/AnotacoesConstant";
import ReactModal from "react-modal";
import Cookies from "js-cookie";
import FormCriarAnotacao from "./FormCriarAnotacao";
import FormEditarAnotacao from "./FormEditarAnotacao";
import Header from "../../../components/Header";
import { DataHoje } from "../../../Constant/Constantes";

export default function CriarAnotacao() {
  const [listaColaboradores, setListaColaboradores] = useState([]);
  const [listaEstagiarios, setListaEstagiarios] = useState([]);
  const [listaDesligados, setListaDesligados] = useState([]);
  const [selectCategoria, setSelectCotegoria] = useState("Contratados");
  const [dataIncial, setDataInicial] = useState(formatarDataInput(DataHoje));
  const [dataFinal, setDataFinal] = useState(formatarDataInput(DataHoje));
  const [telaFiltroState, setTelaFiltroState] = useState(false);
  const [colaborador, setColaborador] = useState({
    idColaborador: "",
    nome: "",
    dataNascimento: "",
    nomecompleto: "",
    tipo: "",
    dataDemissao: "",
    dataAdmissao: "",
    setor: "",
    empresa: "",
    estagiario: "",
    status: "",
  });

  useEffect(() => {});

  return (
    <>
      <section
        className={`flex absolute w-full z-30 ${
          telaFiltroState === false ? "top-0" : "-top-full"
        } bg-white border border-stone-200 px-2 shadow-md text-sm`}
      >
        <section className="flex w-full items-center gap-3">
          <section>
            <img
              className="w-28 rounded-lg"
              src="/foto-funcionarios/josé melo.png"
              alt="foto do funcionario"
            />
          </section>
          <section className="flex flex-col ">
            <span>Nome: </span>
            <span>Setor: </span>
            <span>Empresa: </span>
            <span>Tipo: </span>
            <span>Contrado: </span>
            <span>Data de Nascimento: </span>
          </section>
        </section>
        <section className="w-full flex flex-col">
          <section className="py-3  flex flex-col gap-3">
            <section className="w-full flex gap-2">
              <section className="flex w-full flex-col gap-2">
                <label>Colaboradores</label>
                <select className="h-9 border border-stone-300 rounded-md outline-none">
                  <option value="Any">Colaborador</option>
                  {listaColaboradores.map((colaborador) => {
                    return (
                      <option value={colaborador.idColaborador}>
                        {colaborador.nomecompleto}
                      </option>
                    );
                  })}
                </select>
                <section className="flex gap-2">
                  <section className="flex gap-2">
                    <span>Contratados</span>
                    <input
                      type="radio"
                      name="tipoColaborador"
                      value="Contratados"
                    />
                  </section>
                  <section className="flex gap-2">
                    <span>Estagiarios</span>
                    <input
                      type="radio"
                      name="tipoColaborador"
                      value="Estagiarios"
                    />
                  </section>
                  <section className="flex gap-2">
                    <span>Desligados</span>
                    <input
                      type="radio"
                      name="tipoColaborador"
                      value="Desligados"
                    />
                  </section>
                </section>
              </section>
              <section className="w-full">
                <section className="flex flex-col gap-2">
                  <label>Categoria</label>
                  <select className="h-9 border border-stone-300 rounded-md outline-none">
                    <option value={selectCategoria}>{selectCategoria}</option>
                    <option value="Contratados">Contratados</option>
                    <option value="Estagiarios">Estagiarios</option>
                  </select>
                </section>
              </section>
            </section>
            <section className="w-full flex gap-2">
              <section className="flex flex-col w-full gap-2">
                <label>Data Incial</label>
                <input
                  className="pl-1 h-9 border border-stone-300 rounded-md outline-none"
                  type="date"
                  value={dataIncial}
                />
              </section>
              <section className="flex flex-col w-full gap-2">
                <label>Data Incial</label>
                <input
                  className="pl-1 h-9 border border-stone-300 rounded-md outline-none"
                  type="date"
                  value={dataFinal}
                />
              </section>
            </section>
          </section>
          <hr />
          <section className="flex p-4 w-full justify-end gap-5">
            <button className="border w-28 h-9 rounded-md bg-blue-950 text-white transition-all border-blue-950 active:scale-90 font-bold ">
              Criar Anotação
            </button>
            <button className="border w-28 h-9 rounded-md bg-blue-950 text-white transition-all border-blue-950 active:scale-90 font-bold ">
              Filtrar
            </button>
          </section>
        </section>
        <section
          className={`absolute m-2 bottom-1 ${
            telaFiltroState === false ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={() => setTelaFiltroState(true)}
            className="border p-2 rotate-180 rounded-full bg-blue-950 text-white transition-all border-blue-950 active:scale-90 font-bold "
          >
            <img className="w-5" src="/icon/arrowDown.svg" alt="" />
          </button>
        </section>
      </section>
      <section className="flex flex-col h-full">
        <header className="bg-white shadow-lg p-4 flex items-center gap-8 font-semibold">
          <section
            className={`z-20 ${
              telaFiltroState === false ? "opacity-0" : "opacity-100"
            }`}
          >
            <button
              onClick={() => setTelaFiltroState(false)}
              className="border p-2 rounded-full bg-blue-950 text-white transition-all border-blue-950 active:scale-90 font-bold "
            >
              <img className="w-5" src="/icon/arrowDown.svg" alt="" />
            </button>
          </section>
          <section>Anotações</section>
        </header>
        <section className="flex w-full items-center gap-3 p-3 text-sm xl:hidden">
          <section>
            <img
              className="w-28 rounded-lg"
              src="/foto-funcionarios/josé melo.png"
              alt="foto do funcionario"
            />
          </section>
          <section className="flex flex-col ">
            <span>Nome: </span>
            <span>Setor: </span>
            <span>Empresa: </span>
            <span>Tipo: </span>
            <span>Contrado: </span>
            <span>Data de Nascimento: </span>
          </section>
        </section>
        <section className="flex w-full h-full overflow-auto bg-white border border-stone-300">
          <section className="w-full h-full overflow-auto">
            <section className="gap-2 flex flex-col justify-end py-2 px-1 overflow-auto">
              <section className="w-full flex flex-col gap-3 text-sm border bg-white rounded-md p-2">
                <section className="flex gap-3">
                  <section>
                    <legend>Motivo: Faltou</legend>
                  </section>
                  <section>
                    <legend>Data Inicio: XX/XX/XXXX</legend>
                  </section>
                  <section>
                    <legend>Data Final: XX/XX/XXXX</legend>
                  </section>
                </section>
                <section>
                  <p className="text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis impedit numquam dolorem perferendis officia. Cumque
                    nostrum quidem, ea magni aperiam doloremque velit
                    repellendus totam consequuntur laborum ullam quia tempora
                    quod?
                  </p>
                </section>
              </section>
            </section>
          </section>
          <section className="w-full h-full"></section>
        </section>
      </section>
    </>
  );
}
