import { Component } from "react";
import Header from "./components/Header";
import Cookies from "js-cookie";

// A Home como nome ja diz é a pagina principal onde se encontra todos os sistemas, nela como todos os objetos que você verá por aqui tera modulos importados como o ModuleHeader responsavel pelo header do site.

// Dito isso é bom dizer que se quiser alterar algo no header, não irá precisar mudar em varios lugares, é so ir no header modulo e alterar o que você quiser.
export class Home extends Component {
  render() {
    const user = JSON.parse(Cookies.get("user"));
    return (
      <section className="h-screen w-screen flex-col flex kanit">
        <>
          <Header />
          <main className="h-full flex">
            <nav className="w-fit h-full bg-blue-950 spawnNavBarVertical">
              <ul className="font-semibold text-stone-200 flex flex-col">
                <li
                  onClick={() => (window.location.href = "/chamadas")}
                  className="bg-blue-950 shadow-lg hover:bg-white hover:bg-opacity-10 active:scale-90 h-12 gap-2 cursor-pointer z-20 flex items-center justify-start px-8"
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
                      (user.rolePrimary === "RH" &&
                        user.roleSecondary === "COMUM")
                    ) {
                      window.location.href = "/colaboradores";
                    } else {
                      return;
                    }
                  }}
                  className={`${
                    user.rolePrimary === "MASTER" ||
                    (user.rolePrimary === "RH" &&
                      user.roleSecondary === "COMUM")
                      ? "flex"
                      : "hidden"
                  } bg-blue-950 shadow-lg hover:bg-white hover:bg-opacity-10 active:scale-90 h-12 gap-2 cursor-pointer z-20 items-center justify-start px-8`}
                >
                  <img
                    className="w-5"
                    src="/icon/iconRH.svg"
                    alt="Icone de RH"
                  />
                  Sistema de RH
                </li>
                <li className="bg-blue-950 shadow-lg hover:bg-white hover:bg-opacity-10 active:scale-90 h-12 gap-2 cursor-not-allowed z-20 flex items-center justify-start px-8">
                  <img
                    className="w-5"
                    src="/icon/iconEstoque.svg"
                    alt="Icone de Estoque"
                  />
                  Sistema de Estoque
                </li>
                <li className="bg-blue-950 shadow-lg hover:bg-white hover:bg-opacity-10 active:scale-90 h-12 gap-2 cursor-not-allowed  z-20 flex items-center justify-start px-8">
                  <img
                    className="w-5"
                    src="/icon/iconSac.svg"
                    alt="Icone de SAC"
                  />
                  SAC
                </li>
                <li className="bg-blue-950 shadow-lg hover:bg-white hover:bg-opacity-10 active:scale-90 h-12 gap-2 cursor-not-allowed  z-20 flex items-center justify-start px-8">
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
        </>
      </section>
    );
  }
}
