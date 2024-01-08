import axios from "axios";

export async function getColaboradorById(idColaborador, setColaborador) {
  await axios
    .post(
      `https://localhost:8081/rh/puxar/dados?id=${idColaborador}`,
      {},
      {
        headers: {
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      setColaborador(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
