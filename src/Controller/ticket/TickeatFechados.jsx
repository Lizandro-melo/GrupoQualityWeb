import axios from "axios";
import Cookies from "js-cookie";
import { MostrarNotificacao, hoje, ontem } from "../../Constant/Constantes";
import GetTicketFechados from "../../dto/GetTicketsFechadosNome";

export function RequestFechadosMaster(setFinalizados) {
  axios
    .get(`https://localhost:8081/ticket/fechadas?data=${hoje}`, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
      },
    })
    .then((response) => {
      const dadosOrdenados = response.data.sort((a, b) => b.id - a.id);
      axios
        .get(`https://localhost:8081/ticket/fechadas?data=${ontem}`, {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        })
        .then((response) => {
          const dadosOrdenadosOntem = response.data.sort((a, b) => b.id - a.id);
          dadosOrdenadosOntem.map((p) => {
            dadosOrdenados.push(p);
          });
          setFinalizados(dadosOrdenados);
          Cookies.set("Finalizados", dadosOrdenados.length);
        });
    })
    .catch((error) => {
      console.error(error);
    });
}

export function RequestFechadosComum(setFinalizados) {
  const funcionario = JSON.parse(Cookies.get("user"));
  const ticketHoje = new GetTicketFechados(funcionario, hoje)
  const ticketOntem = new GetTicketFechados(funcionario, ontem)
  axios
    .post("https://localhost:8081/ticket/fechadas/nome", ticketHoje, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
      },
    })
    .then((response) => {
      const dadosOrdenados = response.data.sort((a, b) => b.id - a.id);
      axios
        .post("https://localhost:8081/ticket/fechadas/nome", ticketOntem, {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache"
          },
        })
        .then((response) => {
          const dadosOrdenadosOntem = response.data.sort((a, b) => b.id - a.id);
          dadosOrdenadosOntem.map((p) => {
            dadosOrdenados.push(p);
          });
          const tamanhoNovo = dadosOrdenados.length;
          if (tamanhoNovo > Cookies.get("Finalizados")) {
            MostrarNotificacao("Um pedido seu foi Finalizado");
            setFinalizados(dadosOrdenados);
            Cookies.set("Finalizados", tamanhoNovo);
          } else {
            setFinalizados(dadosOrdenados);
            Cookies.set("Finalizados", tamanhoNovo);
          }
        });
    })
    .catch((error) => {
      console.error(error);
    });
}
