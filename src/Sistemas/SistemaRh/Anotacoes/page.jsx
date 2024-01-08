import { Component, useEffect, useState } from "react";
import iconFiltro from "../../../img/icon/filtro.png";
import { RequisicaoAnotacao } from "./Classes/RequisicaoAnotacao";
import { formatarData, formatarDataInput } from "./Constant/AnotacoesConstant";
import ReactModal from "react-modal";
import Cookies from "js-cookie";
import FormCriarAnotacao from "./FormCriarAnotacao";
import FormEditarAnotacao from "./FormEditarAnotacao";
import Header from "../../../components/Header";
import { DataHoje } from "../../../Constant/Constantes";
import {
  getContratados,
  getDesligados,
  getEstagiarios,
} from "../../../Controller/sistemarh/SistemaRhPuxarColaboradores";
import { getColaboradorById } from "../../../Controller/sistemarh/SistemaRhPuxarDados";

export default function CriarAnotacao() {
  const [listaContratados, setListaContratados] = useState([]);
  const [listaEstagiarios, setListaEstagiarios] = useState([]);
  const [listaDesligados, setListaDesligados] = useState([]);
  const [selectCategoria, setSelectCotegoria] = useState("Contratados");
  const [dataIncial, setDataInicial] = useState(formatarDataInput(DataHoje));
  const [dataFinal, setDataFinal] = useState(formatarDataInput(DataHoje));
  const [telaFiltroState, setTelaFiltroState] = useState(false);
  const [colaborador, setColaborador] = useState({
    idColaborador: "",
    nome: "",
    dataNascimento: null,
    nomeCompleto: "",
    tipo: "",
    dataDemissao: "",
    dataAdmissao: "",
    setor: {
      idSetor: "",
      nome: "",
    },
    empresa: {
      idEmpresa: "",
      nome: "",
    },
    estagiario: {
      dataAdmissao: null,
      dataDemissao: "",
      status: null,
    },
    status: "",
  });

  useEffect(() => {
    getContratados(setListaContratados);
    getDesligados(setListaDesligados);
    getEstagiarios(setListaEstagiarios);
  }, [setListaContratados, setListaDesligados, setListaEstagiarios]);

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
              src={`/foto-funcionarios/${
                colaborador.nome === "" ? "todos" : colaborador.nome
              }.png`}
              alt="foto do funcionario"
            />
          </section>
          <section className="flex flex-col ">
            <span>Nome: {colaborador.nomeCompleto}</span>
            <span>Setor: {colaborador.setor.nome}</span>
            <span>Empresa: {colaborador.empresa.nome}</span>
            <span>Tipo: {colaborador.tipo}</span>
            <span>
              Contrado:{" "}
              {selectCategoria === "Estagiarios" &&
                formatarData(colaborador.estagiario.dataAdmissao)}
              {selectCategoria === "Contratados" &&
                formatarData(colaborador.dataAdmissao)}
            </span>
            <span>
              Data de Nascimento:{" "}
              {colaborador.dataNascimento === null
                ? "Não informado"
                : formatarData(colaborador.dataNascimento)}
            </span>
          </section>
        </section>
        <section className="w-full flex flex-col">
          <section className="py-3  flex flex-col gap-3">
            <section className="w-full flex gap-2">
              <section className="flex w-full flex-col gap-2">
                <label>Colaboradores</label>
                <select
                  onChange={(e) =>
                    getColaboradorById(e.target.value, setColaborador)
                  }
                  className="h-9 border border-stone-300 rounded-md outline-none"
                >
                  <option selected value="Any">
                    Colaborador
                  </option>
                  {selectCategoria === "Contratados" &&
                    listaContratados.map((colaborador) => {
                      return (
                        <option value={colaborador.idColaborador}>
                          {colaborador.nomeCompleto}
                        </option>
                      );
                    })}
                  {selectCategoria === "Estagiarios" &&
                    listaEstagiarios.map((colaborador) => {
                      return (
                        <option value={colaborador.idColaborador}>
                          {colaborador.nomeCompleto}
                        </option>
                      );
                    })}
                  {selectCategoria === "Desligados" &&
                    listaDesligados.map((colaborador) => {
                      return (
                        <option value={colaborador.idColaborador}>
                          {colaborador.nomeCompleto}
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
                      onChange={(e) => setSelectCotegoria(e.target.value)}
                      checked={selectCategoria === "Contratados"}
                    />
                  </section>
                  <section className="flex gap-2">
                    <span>Estagiarios</span>
                    <input
                      type="radio"
                      name="tipoColaborador"
                      value="Estagiarios"
                      onChange={(e) => setSelectCotegoria(e.target.value)}
                      checked={selectCategoria === "Estagiarios"}
                    />
                  </section>
                  <section className="flex gap-2">
                    <span>Desligados</span>
                    <input
                      type="radio"
                      name="tipoColaborador"
                      value="Desligados"
                      onChange={(e) => setSelectCotegoria(e.target.value)}
                      checked={selectCategoria === "Desligados"}
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
        <section className="flex w-full h-full bg-white border border-stone-300">
          <ul className="scrollable-list w-full relative">
            <section className="flex flex-col gap-3 absolute">
              <li className="w-full flex flex-col gap-3 text-sm border bg-white rounded-md p-2">
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
              </li>
            </section>
          </ul>
          <ul className="flex flex-col h-full w-2/5">
            <li className="whitespace-nowrap flex justify-between px-10 h-full items-center border">
              <span>Banco de horas</span>
              <span>{0}</span>
            </li>
            <li className="whitespace-nowrap flex justify-between px-10 h-full items-center border">
              <span>Hora extra</span>
              <span>{0}</span>
            </li>
            <li className="whitespace-nowrap flex justify-between px-10 h-full items-center border">
              <span>Faltas</span>
              <span>{0}</span>
            </li>
            <li className="whitespace-nowrap flex justify-between px-10 h-full items-center border">
              <span>Atestado hora</span>
              <span>{0}</span>
            </li>
            <li className="whitespace-nowrap flex justify-between px-10 h-full items-center border">
              <span>Atestado dias</span>
              <span>{0}</span>
            </li>
            <li className="whitespace-nowrap flex justify-between px-10 h-full items-center border">
              <span>Licença</span>
              <span>{0}</span>
            </li>
            <li className="whitespace-nowrap flex justify-between px-10 h-full items-center border">
              <span>Suspensão</span>
              <span>{0}</span>
            </li>
            <li className="whitespace-nowrap flex justify-between px-10 h-full items-center border">
              <span>Advertências escritas</span>
              <span>{0}</span>
            </li>
            <li className="whitespace-nowrap flex justify-between px-10 h-full items-center border">
              <span>Advertências verbais</span>
              <span>{0}</span>
            </li>
            <li className="whitespace-nowrap flex justify-between px-10 h-full items-center border">
              <span>Atraso</span>
              <span>{0}</span>
            </li>
            <li className="whitespace-nowrap flex justify-between px-10 h-full items-center border">
              <span>Ferias</span>
              <span>{0}</span>
            </li>
          </ul>
        </section>
      </section>
    </>
  );
}
