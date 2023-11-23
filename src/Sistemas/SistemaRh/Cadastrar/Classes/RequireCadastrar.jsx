import axios from "axios"
import { diaNascimneto, mesNascimento, primeiroUltimoNome, primeroNome, ultimoNome } from "../Constants"
import { formatarData } from "../../Anotacoes/Constant/AnotacoesConstant";


export class RequireCadastro {

    setColaborador(obj) {

        if (obj.state.senha !== obj.state.comSenha) {
            obj.setState({
                mensagemModal: "Senhas Diferentes",
                modalState: true
            })
            return
        } else if (obj.state.senha === "" || obj.state.comSenha === "" || obj.state.dataNascimento === "" || obj.state.empresa === "" || obj.state.setor === "" || obj.state.tipo === "" || obj.state.permissaoPrimaria === "" || obj.state.permissaoSecundaria === "") {
            obj.setState({
                mensagemModal: "Alguns Campos não foram Preenchidos",
                modalState: true
            })
            return
        }
        this.cadastrarIntranet(obj);
        if (obj.state.tipo === "CONTRATADO") {
            const colaboradorRh = {
                nome: primeiroUltimoNome(obj.state.nomeCompleto),
                nomeCompleto: obj.state.nomeCompleto,
                tipo: obj.state.tipo,
                status: true,
                dataNascimento: obj.state.dataNascimento
            }
            axios.post(`https://localhost:8081/rh/colaboradores/add?setor=${obj.state.setor}&empresa=${obj.state.empresa}&inicio=${obj.state.dataInicio}`, colaboradorRh);
        } else if (obj.state.tipo === "ESTAGIARIO") {
            const colaboradorRh = {
                nome: primeiroUltimoNome(obj.state.nomeCompleto),
                nomeCompleto: obj.state.nomeCompleto,
                tipo: obj.state.tipo,
                status: true,
                dataNascimento: obj.state.dataNascimento
            }
            axios.post(`https://localhost:8081/rh/colaboradores/estagiario/add?setor=${obj.state.setor}&empresa=${obj.state.empresa}&inicio=${obj.state.dataInicio}`, colaboradorRh);
        }
        try {
            if (obj.state.fotoColaborador === "") {
                return
            }
            this.enviarFotoColaborador(obj);
        } catch (e) {
            return;
        }
    }

    async cadastrarIntranet(obj) {
        const setor = await axios.get(`https://localhost:8081/rh/setor/id?id=${obj.state.setor}`).then(response => response.data.nome)
        const empresa = await axios.get(`https://localhost:8081/rh/empresas/id?id=${obj.state.empresa}`).then(response => response.data.nome);
        const colaboradorIntranet = {
            nome: primeroNome(obj.state.nomeCompleto),
            sobrenome: ultimoNome(obj.state.nomeCompleto),
            setor: setor,
            login: primeiroUltimoNome(obj.state.nomeCompleto).toLowerCase(),
            senha: obj.state.senha,
            status: 1,
            nivel: 1,
            foto: `/intranet/views/foto-funcionarios/${primeiroUltimoNome(obj.state.nomeCompleto)}.png`,
            empresa: empresa,
            dia: diaNascimneto(obj.state.dataNascimento),
            mes: mesNascimento(obj.state.dataNascimento),
            admissao: formatarData(obj.state.dataInicio),
            rolePrimary: obj.state.permissaoPrimaria,
            roleSecondary: obj.state.permissaoSecundaria,
            adm: false,
            tipo: obj.state.tipo
        }

        const colaboradorEstoque = {
            nome: primeiroUltimoNome(obj.state.nomeCompleto).toUpperCase(),
            setor: setor,
            login: primeiroUltimoNome(obj.state.nomeCompleto).toUpperCase(),
            senha: obj.state.senha,
            permissao: "USUARIO",
            habilitado: true,
        }

        axios.post(`https://localhost:8081/intranet/cadastrar`, colaboradorIntranet);
        axios.post(`https://localhost:8081/estoque/cadastrar`, colaboradorEstoque);
    }

    async enviarFotoColaborador(obj) {
        const regex = /\.[A-z]+/
        const nomeFile = obj.state.fotoColaborador.name
        const exten = regex.exec(nomeFile)
        const requestFile = {
            file: obj.state.fotoColaborador,
            ext: `${primeroNome(obj.state.nomeCompleto)} ${ultimoNome(obj.state.nomeCompleto)}${exten}`,
        }
        await axios.post(`https://localhost:8081/rh/colaborador/update/foto`, requestFile, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
}