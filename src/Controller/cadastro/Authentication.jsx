import axios from "axios";
import AuthDTO from "../../dto/AuthDTO";
import Cookies from "js-cookie";

export default async function EfetuarLogin(event, login, senha, modalState, modalMensagem) {
  event.preventDefault();
  const authDTO = new AuthDTO(login.toLocaleLowerCase(), senha);
  const url = "https://qualityserver12:8081/auth/login";
  await axios
    .post(url, authDTO, {
      headers: {
        "Connection": "close",
        "Cache-Control": "no-cache",
      },
    })
    .then((response) => {
      const funcionarioEntityCadastro = response.data;
      Cookies.set("user", JSON.stringify(funcionarioEntityCadastro), { expires: 30 });
      window.location = "/home"
    }).catch((e) => {
        switch (e.code) {
            case "ERR_NETWORK":
                modalState(true);
                modalMensagem("Error inesperado, comunicar o TI.");
                break;
            case "ERR_BAD_REQUEST":
                modalState(true);
                modalMensagem(e.response.data)
                break;
            default:
                break;
        }
    });
}
