import axios from "axios";
import Cookies from "js-cookie";
import { MostrarNotificacao } from "../../Constant/Constantes";
import GetTicketFechados from "../../dto/GetTicketsFechadosNome";

export function RequestAndamentoMaster(listaAndamento) {
  axios
    .post(
      "https://localhost:8081/ticket/andamento",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
        },
      }
    )
    .then((response) => {
      const pendentesOrdenados = response.data.sort((a, b) => b.id - a.id);
      const tamanhoNovo = pendentesOrdenados.length;
      if (tamanhoNovo > Cookies.get("Andamento")) {
        listaAndamento(pendentesOrdenados);
        Cookies.set("Andamento", tamanhoNovo);
        return;
      } else {
        listaAndamento(pendentesOrdenados);
        Cookies.set("Andamento", tamanhoNovo);
        return;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function RequestAndamentoComum(listaAndamento){
  const funcionario = JSON.parse(Cookies.get("user"));
  const ticket = new GetTicketFechados(funcionario)
  axios
    .post(
      "https://localhost:8081/ticket/andamento/nome", ticket,
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
        },
      }
    )
    .then((response) => {
      const dadosOrdenados = response.data.sort((a, b) => b.id - a.id);
      const tamanhoNovo = dadosOrdenados.length;
      if (tamanhoNovo > Cookies.get("Andamento")) {
        MostrarNotificacao("Um pedido seu foi movido para andamento");
        listaAndamento(dadosOrdenados);
        Cookies.set("Andamento", tamanhoNovo);
      } else {
        listaAndamento(dadosOrdenados);
        Cookies.set("Andamento", tamanhoNovo);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}