import axios from "axios";
import TicketMovimentarDTO from "../../dto/TicketMovimentarDTO";
import Cookies from "js-cookie";
import ChamadasEntitysistemaos from "../../Entity/sistemaos/ChamadasEntitySistemaos";
import AbrirTicketDTO from "../../dto/AbrirTicketDTO";

export async function EnviarParaFinalizado(id, responsavel) {
  const ticket = new TicketMovimentarDTO(id, responsavel);
  const url = "https://qualityserver12:8081/ticket/enviar/finalizado";
  await axios
    .post(url, ticket, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
      },
    })
    .catch((err) => console.log(err));
}

export async function EnviarParaAndamento(id, responsavel) {
  const ticket = new TicketMovimentarDTO(id, responsavel);
  const url = "https://qualityserver12:8081/ticket/enviar/andamento";
  await axios
    .post(url, ticket, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
      },
    })
    .catch((err) => console.log(err));
}
export async function EnviarParaPendente(id, responsavel) {
  const ticket = new TicketMovimentarDTO(id, responsavel);
  const url = "https://qualityserver12:8081/ticket/enviar/pendente";
  await axios
    .post(url, ticket, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
      },
    })
    .catch((err) => console.log(err));
}

export async function EnviarTicket(
  event,
  mensagem,
  setAbrirTicketState,
  setMensagemResponse,
  setColorFeedbackResponse
) {
  event.preventDefault();
  const user = JSON.parse(Cookies.get("user"));
  const dateHora = new Date().toLocaleString();
  const ticketDTO = new AbrirTicketDTO(user, dateHora, mensagem);
  const url = `https://qualityserver12:8081/ticket/abrir`;
  axios
    .post(url, ticketDTO, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
      },
    })
    .then((response) => {
      setAbrirTicketState(false);
      setMensagemResponse(response.data);
      setColorFeedbackResponse("bg-green-500");
    })
    .catch((e) => {
      switch (e.code) {
        case "ERR_NETWORK":
          break;
        case "BAD_REQUEST":
          setAbrirTicketState(false);
          setMensagemResponse(e.response.data);
          setColorFeedbackResponse("bg-red-500");
          break;
        default:
          break;
      }
    });
}

export function DeletarTicket(id) {
  const url = `https://qualityserver12:8081/ticket/deletar?id=${id}`;
  axios
  .delete(url, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
      },
    })
  .then((response) => {
      return
    })
  .catch((e) => {
      switch (e.code) {
        case "ERR_NETWORK":
          break;
        case "BAD_REQUEST":
          break;
        default:
          break;
      }
    });
}