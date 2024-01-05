import Cookies from "js-cookie";
import { useState } from "react";
import CriarAnotacao from "./Anotacoes/page";
import AtualizarDados from "./Atualizar/page";
import CadastrarColaborador from "./Cadastrar/page";
import Relatorios from "./Relatorio/page";

export default function SistemaRH() {
  const user = JSON.parse(Cookies.get("user"));
  const [select, setSelect] = useState("Criar Anotação");

  return (
    <>
      <main className="h-full flex max-lg:flex-col">
        <nav className="w-fit h-full bg-blue-950 spawnNavBarVertical max-lg:w-full max-lg:h-fit">
          <ul className="font-semibold text-stone-200 flex flex-col max-lg:flex-row max-lg:overflow-x-auto max-lg:w-full w-64">
            <li
              onClick={() => setSelect("Criar Anotação")}
              className={`${
                select === "Criar Anotação" ? "bg-opacity-10 bg-white" : ""
              } bg-blue-950 shadow-lg hover:bg-white hover:bg-opacity-10 active:scale-90 h-12 gap-2 cursor-pointer z-20 flex items-center justify-start px-8 flex-none`}
            >
              <img
                className="w-5 invert"
                src="/icon/anotar.png"
                alt="Icone de Criar Anotação"
              />
              Criar Anotação
            </li>
            <li
              onClick={() => setSelect("Cadastrar")}
              className={`${
                select === "Cadastrar" ? "bg-opacity-10 bg-white" : ""
              } flex bg-blue-950 shadow-lg hover:bg-white hover:bg-opacity-10 active:scale-90 h-12 gap-2 cursor-pointer z-20 items-center justify-start px-8 flex-none`}
            >
              <img
                className="w-5 invert"
                src="/icon/addFuncionario.png"
                alt="Icone de Cadastrar"
              />
              Cadastrar colaborador
            </li>
            <li
              onClick={() => setSelect("Atualizar")}
              className={`${
                select === "Atualizar" ? "bg-opacity-10 bg-white" : ""
              } bg-blue-950 shadow-lg hover:bg-white hover:bg-opacity-10 active:scale-90 h-12 gap-2 cursor-pointer z-20 flex items-center justify-start px-8 flex-none`}
            >
              <section>
                <img
                  className="w-5 invert"
                  src="/icon/atualizar.png"
                  alt="Icone de Atualizar"
                />
              </section>
              <section>Atualizar dados</section>
            </li>
            <li
              onClick={() => setSelect("Relatorios")}
              className={`${
                select === "Relatorios" ? "bg-opacity-10 bg-white" : ""
              } bg-blue-950 shadow-lg hover:bg-white hover:bg-opacity-10 active:scale-90 h-12 gap-2 cursor-pointer z-20 flex items-center justify-start px-8 flex-none`}
            >
              <img
                className="w-5 invert"
                src="/icon/relatorio.png"
                alt="Icone de Relatorios"
              />
              Relatórios
            </li>
            <li
              onClick={() => window.history.back()}
              title="Voltar"
              className="bg-blue-950 shadow-lg hover:bg-white hover:bg-opacity-10 active:scale-90 h-12 gap-2 cursor-pointer  z-20 flex items-center justify-start px-8 flex-none"
            >
              <img
                className="w-5 max-lg:w-4"
                src="/icon/goBack.svg"
                alt="Icone de Voltar"
              />
              Voltar
            </li>
          </ul>
        </nav>
        <section className="w-full h-full flex justify-center items-start spawnConteudoPrincipal">
          <section className="w-full h-full bg-stone-50 rounded-xl">
            {select === "Criar Anotação" && <CriarAnotacao />}
            {select === "Cadastrar" && <CadastrarColaborador />}
            {select === "Atualizar" && <AtualizarDados />}
            {select === "Relatorios" && <Relatorios />}
          </section>
        </section>
      </main>
    </>
  );
}
