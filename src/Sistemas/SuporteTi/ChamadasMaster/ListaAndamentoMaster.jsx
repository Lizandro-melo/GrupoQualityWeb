import { useEffect, useState } from "react";
import {
  DeletarTicket,
  EnviarParaFinalizado,
  EnviarParaPendente,
} from "../../../Controller/ticket/TicketsEnvios";
import Cookies from "js-cookie";
import {
  RequestAndamentoComum,
  RequestAndamentoMaster,
} from "../../../Controller/ticket/TicketAndamento";

export default function ListaAndamentoMaster() {
  const [andamento, setAndamento] = useState([]);
  const user = JSON.parse(Cookies.get("user"));
  const [stateModalTicket, setStateModalTicket] = useState("hiddenModal");
  const [ticketDados, setTicketDados] = useState({
    id: "",
    nome: "",
    setor: "",
    dataHora: "",
    os: "",
    status: "",
    responsavel: "",
  });

  useEffect(() => {
    if (user.roleSecondary === "MASTER") {
      setInterval(() => {
        RequestAndamentoMaster(setAndamento);
      }, 500);
    } else {
      setInterval(() => {
        RequestAndamentoComum(setAndamento);
      }, 500);
    }
  }, [setAndamento, user.roleSecondary]);

  return (
    <>
      {user.roleSecondary === "MASTER" ? (
        <section
          className={`${
            stateModalTicket === "hiddenModal" ? "hidden" : "flex"
          } absolute w-98 h-full`}
        >
          <section
            onClick={() => {
              setStateModalTicket("hiddenModal");
            }}
            className="absolute bg-stone-100 opacity-70 w-full h-full"
          ></section>
          <section
            className={`rounded-xl z-20 w-3/4 py-20 shadow-xl bg-white border border-stone-200 absolute left-2/4 top-2/4 flex-col justify-center items-center flex -translate-x-2/4 -translate-y-2/4 gap-14 ${stateModalTicket} max-md:w-full max-lg:py-10 max-md:gap-14`}
          >
            <section className="flex gap-3 max-md:scale-75">
              <span>
                <img
                  className="w-32 rounded-xl"
                  src={`../../foto-funcionarios/${ticketDados.nome}.png`}
                  alt="foto do colaborador"
                />
              </span>
              <section className="flex flex-col gap-2">
                <span>Nome: {ticketDados.nome}</span>
                <span>Setor: {ticketDados.setor}</span>
                <span>Data e Hora: {ticketDados.dataHora}</span>
                <span>Status: {ticketDados.status}</span>
              </section>
            </section>
            <section className="w-4/5 text-center">
              <span>{ticketDados.os}</span>
            </section>
            <section className="flex gap-5">
              <button
                onClick={() => {
                  EnviarParaPendente(
                    ticketDados.id,
                    `${user.nome} ${user.sobrenome}`
                  );
                  setStateModalTicket("hiddenModal");
                }}
                className="bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 border border-blue-950 hover:border-blue-800 rounded active:scale-90"
              >
                Pendente
              </button>
              <button
                onClick={() => {
                  EnviarParaFinalizado(
                    ticketDados.id,
                    `${user.nome} ${user.sobrenome}`
                  );
                  setStateModalTicket("hiddenModal");
                }}
                className="bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 border border-blue-950 hover:border-blue-800 rounded active:scale-90"
              >
                Finalizado
              </button>
            </section>
          </section>
        </section>
      ) : (
        <section
          className={`${
            stateModalTicket === "hiddenModal" ? "hidden" : "flex"
          } absolute w-98 h-full`}
        >
          <section
            onClick={() => {
              setStateModalTicket("hiddenModal");
            }}
            className="absolute bg-stone-100 opacity-70 w-full h-full"
          ></section>
          <section
            className={`rounded-xl z-20 w-3/4 py-20 shadow-xl bg-white border border-stone-200 absolute left-2/4 top-2/4 flex-col justify-center items-center flex -translate-x-2/4 -translate-y-2/4 gap-14 ${stateModalTicket} max-md:w-full max-lg:py-10 max-md:gap-14`}
          >
            <section className="flex gap-3  max-md:scale-75">
              <span>
                <img
                  className="w-32 rounded-xl"
                  src={`../../foto-funcionarios/${ticketDados.nome}.png`}
                  alt="foto do colaborador"
                />
              </span>
              <section className="flex flex-col gap-2">
                <span>Nome: {ticketDados.nome}</span>
                <span>Setor: {ticketDados.setor}</span>
                <span>Data e Hora: {ticketDados.dataHora}</span>
                <span>Status: {ticketDados.status}</span>
              </section>
            </section>
            <section className="w-4/5 text-center">
              <span>{ticketDados.os}</span>
            </section>
            <section className="flex gap-5">
              <button
                onClick={() => {
                  DeletarTicket(ticketDados.id);
                  setStateModalTicket("hiddenModal");
                }}
                className="bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 border border-blue-950 hover:border-blue-800 rounded active:scale-90"
              >
                Excluir
              </button>
            </section>
          </section>
        </section>
      )}
      <section className="bg p-7">
        <span className="text-xl font-semibold">ANDAMENTO</span>
      </section>
      <hr className="" />
      <section className="w-full max-h-96 px-2 py-3 rounded-b-xl overflow-auto">
        <table className="justify-center items-center max-lg:items-start flex flex-col overflow-x-auto">
          <tbody className="text-sm">
            <tr>
              <th className="px-36 py-1">
                <span className="font-semibold">Informações</span>
              </th>
              <th className="  px-12 py-1">
                <span className="font-semibold">Setor</span>
              </th>
              <th className="  px-12 py-1">
                <span className="font-semibold">Responsavel</span>
              </th>
              <th className="  px-12 py-1">
                <span className="font-semibold">Data e Hora</span>
              </th>
              <th className="  px-12 py-1">
                <span className="font-semibold">Ação</span>
              </th>
            </tr>
            {andamento.map((ticket) => {
              return (
                <tr
                  key={ticket.id}
                  className="hover:bg-stone-200 cursor-pointer"
                >
                  <td
                    onClick={() => {
                      setTicketDados(ticket);
                      setStateModalTicket("spawnModalTicket");
                    }}
                    className="px-3 py-1"
                  >
                    <section className="gap-5 flex justify-center items-center">
                      <img
                        className="w-14 rounded-full"
                        src={`../../foto-funcionarios/${ticket.nome}.png`}
                        alt="foto do colaborador"
                      />
                      <section className="flex flex-col overflow-hidden w-60">
                        <span className="font-semibold">{ticket.nome}</span>
                        <span className="font-semibold whitespace-nowrap text-ellipsis">
                          {ticket.os}
                        </span>
                      </section>
                    </section>
                  </td>
                  <td
                    onClick={() => {
                      setTicketDados(ticket);
                      setStateModalTicket("spawnModalTicket");
                    }}
                    className="  py-1"
                  >
                    <section className="flex justify-center items-center">
                      <span className="font-semibold">{ticket.setor}</span>
                    </section>
                  </td>
                  <td
                    onClick={() => {
                      setTicketDados(ticket);
                      setStateModalTicket("spawnModalTicket");
                    }}
                    className="  py-1"
                  >
                    <section className="flex justify-center items-center">
                      <span className="font-semibold">
                        {ticket.responsavel}
                      </span>
                    </section>
                  </td>
                  <td
                    onClick={() => {
                      setTicketDados(ticket);
                      setStateModalTicket("spawnModalTicket");
                    }}
                    className="  py-1"
                  >
                    <section className="flex justify-center items-center">
                      <span className="font-semibold">{ticket.dataHora}</span>
                    </section>
                  </td>
                  <td className="  py-1">
                    {user.roleSecondary === "MASTER" ? (
                      <section className="flex gap-2 justify-center items-center">
                        <span className="font-semibold">
                          <button
                            onClick={() => {
                              EnviarParaPendente(
                                ticket.id,
                                `${user.nome} ${user.sobrenome}`
                              );
                            }}
                            className="bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 border border-blue-950 hover:border-blue-800 rounded active:scale-90"
                          >
                            <img
                              className="invert w-4"
                              src="../../icon/tickets.png"
                              alt=""
                            />
                          </button>
                        </span>
                        <span className="font-semibold">
                          <button
                            onClick={() => {
                              EnviarParaFinalizado(
                                ticket.id,
                                `${user.nome} ${user.sobrenome}`
                              );
                            }}
                            className="bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 border border-blue-950 hover:border-blue-800 rounded active:scale-90"
                          >
                            <img
                              className="invert w-4"
                              src="../../icon/check.png"
                              alt=""
                            />
                          </button>
                        </span>
                      </section>
                    ) : (
                      <section className="flex gap-2 justify-center items-center">
                        <span className="font-semibold">
                          <button
                            onClick={() => {
                              DeletarTicket(ticket.id);
                            }}
                            className="bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 border border-blue-950 hover:border-blue-800 rounded active:scale-90"
                          >
                            <span>&#x274c;</span>
                          </button>
                        </span>
                      </section>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}
