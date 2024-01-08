import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";

// A Home como nome ja diz é a pagina principal onde se encontra todos os sistemas, nela como todos os objetos que você verá por aqui tera modulos importados como o ModuleHeader responsavel pelo header do site.

// Dito isso é bom dizer que se quiser alterar algo no header, não irá precisar mudar em varios lugares, é so ir no header modulo e alterar o que você quiser.

export default function Home() {
  const [user, setState] = useState()

  useEffect(()=>{
    setState(JSON.parse(Cookies.get("user")));
  },[setState])

  return (
    <main className="h-full flex max-lg:flex-col">
      <nav className="w-fit h-full bg-blue-950 spawnNavBarVertical max-lg:w-full max-lg:h-fit">
        <ul className="font-semibold text-stone-200 flex flex-col max-lg:flex-row max-lg:overflow-x-auto max-lg:w-full w-64">
          <li
            onClick={() => (window.location.href = "/chamadas")}
            className="bg-blue-950 shadow-lg hover:bg-white hover:bg-opacity-10 active:scale-90 h-12 gap-2 cursor-pointer z-20 flex items-center justify-start px-8 flex-none"
          >
            <img
              className="w-5"
              src="/icon/iconSuport.svg"
              alt="Icone de Suporte"
            />
            Suporte
          </li>
          <li
            onClick={() => {
              if (
                user.rolePrimary === "MASTER" ||
                (user.rolePrimary === "RH" && user.roleSecondary === "COMUM")
              ) {
                window.location.href = "/colaboradores";
              } else {
                return;
              }
            }}
            className={`${
              user.rolePrimary === "MASTER" ||
              (user.rolePrimary === "RH" && user.roleSecondary === "COMUM")
                ? "flex"
                : "hidden"
            } bg-blue-950 shadow-lg hover:bg-white hover:bg-opacity-10 active:scale-90 h-12 gap-2 cursor-pointer z-20 items-center justify-start px-8 flex-none`}
          >
            <img className="w-5" src="/icon/iconRH.svg" alt="Icone de RH" />
            Sistema de RH
          </li>
          <li className="bg-blue-950 shadow-lg hover:bg-white hover:bg-opacity-10 active:scale-90 h-12 gap-2 cursor-not-allowed z-20 flex items-center justify-start px-8 flex-none">
            <section>
              <img
                className="w-5"
                src="/icon/iconEstoque.svg"
                alt="Icone de Estoque"
              />
            </section>
            <section>Sistema de Estoque</section>
          </li>
          <li className="bg-blue-950 shadow-lg hover:bg-white hover:bg-opacity-10 active:scale-90 h-12 gap-2 cursor-not-allowed  z-20 flex items-center justify-start px-8 flex-none">
            <img className="w-5" src="/icon/iconSac.svg" alt="Icone de SAC" />
            SAC
          </li>
          <li className="bg-blue-950 shadow-lg hover:bg-white hover:bg-opacity-10 active:scale-90 h-12 gap-2 cursor-not-allowed  z-20 flex items-center justify-start px-8 flex-none">
            <img
              className="w-5"
              src="/icon/iconTerceirizado.svg"
              alt="Icone de Terceirizado"
            />
            Terceirizados
          </li>
        </ul>
      </nav>
      <section className="spawnConteudoPrincipal bg-white flex justify-center items-center w-full h-full">
        <span className="bg-blue-950 rounded-xl px-10 py-2 text-white">
          Em breve
        </span>
      </section>
    </main>
  );
}
