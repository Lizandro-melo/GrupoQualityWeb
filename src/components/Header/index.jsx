import Cookies from "js-cookie";
import { useState } from "react";

export default function Header() {
  const [stateModalExit, setStateModalExit] = useState("hiddenModal");
  const user = JSON.parse(Cookies.get("user"));

  function desconectar() {
    localStorage.clear();
    Cookies.remove("user");
    window.location.href = "/";
  }
  return (
    <>
      <header
        className={`shadow-xl z-50 bg-blue-950 p-8 flex justify-between items-center h-16 w-screen sticky top-0`}
      >
        <section className="flex items-center gap-10">
          <img
            title="Sistema Quality Web"
            className="drop-shadow-lg cursor-pointer max-lg:w-11"
            onClick={() => (window.location.href = "/home")}
            src="/icon/iconQuality.png"
            alt="Logo quality"
          />
          <span className="text-white font-medium max-sm:hidden">
            {user.nome} {user.sobrenome}, bem vindo!
          </span>
        </section>
        <button
          onClick={() => setStateModalExit("spawnModal")}
          className="flex overflow-hidden gap-2 group cursor-pointer items-center active:scale-95 active:opacity-75 relative"
        >
          <img
            className="w-7 bg-blue-950 z-10 relative max-lg:w-6"
            src="/icon/sairIcon.svg"
            alt="Icone de sair"
          />
          <span className="text-white text-sm w-0 group-hover:w-7">Sair</span>
        </button>
      </header>
      <section
        className={`w-full ${
          stateModalExit === "hiddenModal" ? "hidden" : "flex"
        } z-50 h-full absolute top-0 justify-center items-center`}
      >
        <section className="bg-stone-50 opacity-70 w-screen h-screen absolute"></section>
        <section
          className={`w-2/5 h-2/5 hidden bg-white rounded-lg flex-col shadow-lg border ${stateModalExit} justify-evenly items-center max-lg:w-full`}
        >
          <section>
            <span className="text-xl text-blue-950 font-semibold">
              Você deseja se desconectar?
            </span>
          </section>
          <section className="flex gap-10">
            <button
              onClick={() => desconectar()}
              className="border w-28 h-9 hover:bg-blue-950 hover:text-white transition-all bg-white border-blue-950 active:scale-90 font-bold text-sm"
            >
              Sim
            </button>
            <button
              onClick={() => setStateModalExit("hiddenModal")}
              className="border w-28 h-9 hover:bg-blue-950 hover:text-white transition-all bg-white border-blue-950 active:scale-90 font-bold text-sm"
            >
              Não
            </button>
          </section>
        </section>
      </section>
    </>
  );
}
