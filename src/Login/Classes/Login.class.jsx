import Cookies from "js-cookie";
import axios from "axios";

export class RequestsLogin {

    Autenticar = async (e, obj) => {
        e.preventDefault();
        const data = {
            login: obj.state.login.toLowerCase(),
            senha: obj.state.senha,
        };
        const url = `https://localhost:8081/login/autenticar`;
        await axios.post(url, data).then((data) => {
            const required = data.data
            const user = {
                idfuncionario: required[0].idfuncionario,
                nome: required[0].nome,
                sobrenome: required[0].sobrenome,
                setor: required[0].setor,
                master: required[0].master,
                cadastro: required[0].adm,
                sistema_estoque: required[0].sistema_estoque,
                sac: required[0].sac,
                status: required[0].status,
            };
            if (user.status === 0) {
                obj.setState({
                    mensagemError:
                        "Colaborador esta desabilitado, pedimos que comunique alguém do RH ou TI.",
                    modalMensageIsOpen: true,
                });
                return;
            }
            Cookies.set("user", JSON.stringify(user), { expires: 30 });
            window.location.reload();
        }).catch((e) => {
            switch (e.code) {
                case "ERR_NETWORK":
                    obj.setState({
                        mensagemError: "Erro de Conexão, motivos -> Certificado ou Servidor Back-end, Contate ao TI.",
                        modalMensageIsOpen: true,
                    });
                    break;
                case "ERR_BAD_REQUEST":
                    obj.setState({
                        mensagemError: "Login ou Senha não existe",
                        modalMensageIsOpen: true,
                        login: "",
                        senha: "",
                    });
                default:
                    break;
            }

        })

    }

    RedefinirSenha = (e, obj) => {
        e.preventDefault();
        const dataObj = new Date();
        const hora = `${dataObj.getHours()}:${dataObj.getMinutes()}:${dataObj.getSeconds()}`;
        const data = `${dataObj.getDate()}/${dataObj.getMonth() + 1
            }/${dataObj.getFullYear()}`;
        const date = {
            nome: obj.state.nome,
            setor: obj.state.setor,
            dataHora: `${data} - ${hora}`,
            os: `A funcionaria(o) ${obj.state.nome} do setor ${obj.state.setor} esqueceu a senha do sistema! RAMAL: ${obj.state.ramal}`,
            status: "ABERTO",
        };
        const url = `https://localhost:8081/chamadas/pedido`;
        axios.post(url, date).then(() => {
            obj.setState({
                mensagem:
                    "Pedido de redefinição enviado, espere e ligaremos para você com a senha padrão",
                modalMensageIsOpen: true,
            });
        }).catch((e) => {
            switch (e.code) {
                case "ERR_NETWORK":
                    obj.setState({
                        mensagem: "Erro de Conexão, motivos -> Certificado ou Servidor Back-end, contate ao TI.",
                        modalMensageIsOpen: true,
                    });
                    break;
                default:
                    break;
            }
            return
        })

    }
}