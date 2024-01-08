import axios from "axios";
import ColaboradorSistemaRhEntity from "../../Entity/sistemarh/ColaboradorSistemaRhEntity";

export async function getColaboradorById(idColaborador, setColaborador) {
  await axios
    .post(
      `https://localhost:8081/rh/puxar/dados?id=${idColaborador}`,
      {},
      {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      }
    )
    .then((response) => {
      const colaboradorNull = new ColaboradorSistemaRhEntity();
      setColaborador(colaboradorNull);
      setColaborador(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
