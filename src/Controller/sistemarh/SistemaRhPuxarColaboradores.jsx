import axios from "axios";

export async function getContratados(setListaContratados) {
  await axios
    .post(
      "https://localhost:8081/rh/puxar/contratados",
      {},
      {
        headers: {
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
        },
      }
    )
    .then((response) => {
      const listaOrdenada = response.data.sort((a, b) =>
        a.nomeCompleto.localeCompare(b.nomeCompleto)
      );
      setListaContratados(listaOrdenada);
    });
}

export async function getDesligados(setListaDesligados) {
  await axios
    .post(
      "https://localhost:8081/rh/puxar/desligados",
      {},
      {
        headers: {
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
        },
      }
    )
    .then((response) => {
        const listaOrdenada = response.data.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
      setListaDesligados(listaOrdenada);
    });
}

export async function getEstagiarios(setListaEstagiarios) {
  await axios
    .post(
      "https://localhost:8081/rh/puxar/estagiarios",
      {},
      {
        headers: {
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
        },
      }
    )
    .then((response) => {
    
      const listaOrdenada = response.data.sort((a, b) =>
        a.nomeCompleto.localeCompare(b.nomeCompleto)
      );
      setListaEstagiarios(listaOrdenada);
    });
}
