import axios from "axios";
import Cookies from "js-cookie";
import { MostrarNotificacao } from "../../Constant/Constantes";
import GetTicketFechados from "../../dto/GetTicketsFechadosNome";

export function RequestPendenteMaster(listaPendentes) {
    axios
      .post(
        "https://qualityserver12:8081/ticket/abertas",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache"
          },
        }
      )
      .then((response) => {
        const pendentesOrdenados = response.data.sort((a, b) => b.id - a.id);
        const tamanhoNovo = pendentesOrdenados.length;
        if (tamanhoNovo > Cookies.get("Pendentes")) {
          MostrarNotificacao(`${pendentesOrdenados[0].nome} \n${pendentesOrdenados[0].os}`);
          listaPendentes(pendentesOrdenados);
          Cookies.set("Pendentes", tamanhoNovo);
          return ;
        } else {
          listaPendentes(pendentesOrdenados);
          Cookies.set("Pendentes", tamanhoNovo);
          return;
        }
      })
      .catch((error) => {
        console.error(error);
      });
}

export function RequestPendenteComum(listaPendentes){
  const funcionario = JSON.parse(Cookies.get("user"));
  const ticket = new GetTicketFechados(funcionario);
  axios
    .post(
      "https://qualityserver12:8081/ticket/abertas/nome", ticket,
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
      if (tamanhoNovo > Cookies.get("Pendentes")) {
        listaPendentes(dadosOrdenados);
        Cookies.set("Pendentes", tamanhoNovo);
      } else {
        listaPendentes(dadosOrdenados);
        Cookies.set("Pendentes", tamanhoNovo);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}