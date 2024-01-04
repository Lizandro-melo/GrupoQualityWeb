import Cookies from "js-cookie";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import ListaPendentesMaster from "./ChamadasMaster/ListaPendentesMaster";
import ListaAndamentoMaster from "./ChamadasMaster/ListaAndamentoMaster";
import ListaFinalizadosMaster from "./ChamadasMaster/ListaFinalizadosMaster";
import { EnviarTicket } from "../../Controller/ticket/TicketsEnvios";

export default function SuporteTi() {
  const [select, setSelect] = useState("Pendentes");
  const [pendentesQuantidade, setPendentesQuantidade] = useState(0);
  const [andamentoQuantidade, setAndamentoQuantidade] = useState(0);
  const [finalizadosQuantidade, setFinalizadosQuantidade] = useState(0);
  const [abrirTicketState, setAbrirTicketState] = useState(false);
  const [mensagemTicket, setMensagemTicket] = useState("");
  const [mensagemResponse, setMensagemResponse] = useState("");
  const [colorFeedbackResponse, setColorFeedbackResponse] = useState();
  const [mensagemResponseState, setMensagemResponseState] = useState();
  const user = JSON.parse(Cookies.get("user"));

  useEffect(() => {
    setInterval(() => {
      setPendentesQuantidade(Cookies.get("Pendentes"));
      setAndamentoQuantidade(Cookies.get("Andamento"));
      setFinalizadosQuantidade(Cookies.get("Finalizados"));
    });
  }, [
    setPendentesQuantidade,
    setAndamentoQuantidade,
    setFinalizadosQuantidade,
  ]);

  return (
    <>
      <section className="h-screen w-screen flex-col flex">
        <Header />
        <main className="h-full w-screen flex kanit">
          <nav className="w-fit h-full bg-blue-950 spawnNavBarVertical">
            <ul className="font-semibold text-stone-200 flex flex-col">
              <li
                title="Pedidos Pendente"
                onClick={() => setSelect("Pendentes")}
                className={`${
                  select === "Pendentes" ? "bg-opacity-10 bg-white" : ""
                } bg-blue-950 shadow-lg hover:bg-white hover:bg-opacity-10 active:scale-90 h-12 gap-2 cursor-pointer z-20 flex items-center justify-start pl-10 w-52`}
              >
                <img
                  className="w-5 invert"
                  src="/icon/tickets.png"
                  alt="Icone de Pendente"
                />
                <span className="flex justify-between w-full pr-5">
                  Pendentes <span>{pendentesQuantidade}</span>
                </span>
              </li>
              <li
                title="Pedidos Andamento"
                onClick={() => setSelect("Andamento")}
                className={`${
                  select === "Andamento" ? "bg-opacity-10 bg-white" : ""
                } bg-blue-950 shadow-lg hover:bg-white hover:bg-opacity-10 active:scale-90 h-12 gap-2 cursor-pointer z-20 flex items-center justify-start pl-10 w-52`}
              >
                <img
                  className="w-5 invert"
                  src="/icon/time.png"
                  alt="Icone de Andamento"
                />
                <span className="flex justify-between w-full pr-5">
                  Andamento <span>{andamentoQuantidade}</span>
                </span>
              </li>
              <li
                title="Pedidos Finalizados"
                onClick={() => setSelect("Finalizados")}
                className={`${
                  select === "Finalizados" ? "bg-opacity-10 bg-white" : ""
                } bg-blue-950 shadow-lg hover:bg-white hover:bg-opacity-10 active:scale-90 h-12 gap-2 cursor-pointer  z-20 flex items-center justify-start pl-10 w-52`}
              >
                <img
                  className="w-5 invert"
                  src="/icon/check.png"
                  alt="Icone de Finalizados"
                />
                <span className="flex justify-between w-full pr-5">
                  Finalizados <span>{finalizadosQuantidade}</span>
                </span>
              </li>
              <li
                title="Abrir Ticket"
                onClick={() => {
                  setAbrirTicketState(true);
                }}
                className="bg-blue-950 shadow-lg hover:bg-white hover:bg-opacity-10 active:scale-90 h-12 gap-2 cursor-pointer  z-20 flex items-center justify-start pl-10 w-52"
              >
                <img
                  className="w-5 invert"
                  src="/icon/add.png"
                  alt="Icone de Abrir Ticket"
                />
                Abrir Ticket
              </li>
              <li
                onClick={() => window.history.back()}
                title="Abrir Ticket"
                className="bg-blue-950 shadow-lg hover:bg-white hover:bg-opacity-10 active:scale-90 h-12 gap-2 cursor-pointer  z-20 flex items-center justify-start pl-10 w-52"
              >
                <img
                  className="w-5"
                  src="/icon/goBack.svg"
                  alt="Icone de Abrir Ticket"
                />
                Voltar
              </li>
            </ul>
          </nav>
          <section
            className="w-full h-full flex justify-center items-start spawnConteudoPrincipal"
          >
            <span
              className={`px-9 rounded-full h-10 absolute ${
                mensagemResponseState === true ? "top-5" : "-top-full"
              } flex justify-center items-center ${colorFeedbackResponse} text-white`}
            >
              {mensagemResponse}
            </span>
            <form
              onSubmit={(e) => {
                EnviarTicket(
                  e,
                  mensagemTicket,
                  setAbrirTicketState,
                  setMensagemResponse,
                  setColorFeedbackResponse
                );
                setMensagemResponseState(true);
                setMensagemTicket("");
                setTimeout(() => {
                  setMensagemResponseState(false);
                }, 5000);
              }}
              className={`${
                abrirTicketState === true
                  ? "flex left-3 visible"
                  : "-left-full invisible"
              } absolute flex-col border border-stone-300 rounded-2xl p-3 w-3/5 h-2/4 shadow-lg  bottom-9 bg-white z-50`}
            >
              <section className="h-full w-full">
                <textarea
                  required
                  value={mensagemTicket}
                  onChange={(e) => setMensagemTicket(e.target.value)}
                  className="pt-2 rounded-md resize-none text-sm outline-none w-full h-4/5 shadow-lg pl-2"
                  placeholder="Descreva o que está acontencendo."
                ></textarea>
              </section>
              <section>
                <button
                  type="submit"
                  className="border w-28 h-9 rounded-md hover:bg-blue-950 hover:text-white transition-all border-blue-950 active:scale-90 font-bold text-sm"
                >
                  Enviar Ticket
                </button>
              </section>
            </form>
            <section
              onClick={() => {
                setAbrirTicketState(false);
              }}
              className={`bg-stone-50 h-11-12 w-11-12 rounded-xl flex flex-col ${
                select === "Pendentes" ? "" : "hidden"
              }`}
            >
              <ListaPendentesMaster />
            </section>
            <section
              onClick={() => {
                setAbrirTicketState(false);
              }}
              className={`bg-stone-50 h-11-12 w-11-12 rounded-xl flex flex-col ${
                select === "Andamento" ? "" : "hidden"
              }`}
            >
              <ListaAndamentoMaster />
            </section>
            <section
              onClick={() => {
                setAbrirTicketState(false);
              }}
              className={`bg-stone-50 h-11-12 w-11-12 rounded-xl flex flex-col ${
                select === "Finalizados" ? "" : "hidden"
              }`}
            >
              <ListaFinalizadosMaster />
            </section>
          </section>
        </main>
      </section>
    </>
  );
}
