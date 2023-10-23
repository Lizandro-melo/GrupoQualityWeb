import { data, hora } from "../../../Constant/Constantes";
import Cookies from "js-cookie";

export const ticket = (obj) => {
    const funcionario = JSON.parse(Cookies.get("user"));
    const ticket = {
        nome: `${funcionario.nome} ${funcionario.sobrenome}`,
        setor: funcionario.setor,
        dataHora: `${data} - ${hora}`,
        os: obj.state.pedido,
        status: "ABERTO",
    }
    return ticket;
};

export const requestFile = (obj, role) => {
    const funcionario = JSON.parse(Cookies.get("user"));
    const regex = /\.[A-z]+/
    const nomeFile = obj.state.file.name
    const exten = regex.exec(nomeFile)
    const requestFile = {
        file: obj.state.file,
        ext: `_${funcionario.nome}_${funcionario.sobrenome}_${exten}`,
        nome: `${funcionario.nome} ${funcionario.sobrenome}`,
        role: role
    }
    return requestFile
}


