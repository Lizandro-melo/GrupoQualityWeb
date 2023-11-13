import axios from "axios"
import { dataFinalDefault, dataInicialDefault, dataHoje, formatarData } from "../Constant/AnotacoesConstant";
import Cookies from "js-cookie";
import $ from "jquery";

export class RequisicaoAnotacao {


    getAllNomesColaboradores(obj) {

        switch (Cookies.get("filtroRhColaborador")) {
            case "ESTAGIARIOS":
                axios.post("https://qualityserver12:8081/rh/colaboradores/estagiarios/ativos").then(response => {
                    const colaboradores = response.data
                    const ordenAlfabetica = colaboradores.sort((a, b) => a.nome.localeCompare(b.nome));
                    obj.setState({
                        colaboradoresList: ordenAlfabetica
                    })
                    return
                }).catch(() => {
                    console.log("error getEstagiariosAtivos");
                    obj.setState({
                        colaboradoresList: []
                    })
                    return
                })
                break

            case "DESLIGADOS":
                axios.post("https://qualityserver12:8081/rh/colaboradores/contratados/desligados").then(response => {
                    const colaboradores = response.data
                    const ordenAlfabetica = colaboradores.sort((a, b) => a.nome.localeCompare(b.nome));
                    obj.setState({
                        colaboradoresList: ordenAlfabetica
                    })
                    return
                }).catch(() => {
                    console.log("error getColaboradoresDesligados");
                    obj.setState({
                        colaboradoresList: []
                    })
                    return
                })
                break

            case "CONTRATADOS":
                axios.post("https://qualityserver12:8081/rh/colaboradores/contratados/ativos").then(response => {
                    const colaboradores = response.data
                    const ordenAlfabetica = colaboradores.sort((a, b) => a.nome.localeCompare(b.nome));
                    obj.setState({
                        colaboradoresList: ordenAlfabetica
                    })
                    return
                }).catch(() => {
                    console.log("error getColaboradoresAtivos");
                    obj.setState({
                        colaboradoresList: []
                    })
                    return
                })
                break

        }
    }

    getColaboradorDados(obj, idColaborador) {
        axios.post(`https://qualityserver12:8081/rh/colaboradores/id?id=${idColaborador}`).then(response => {
            const colaborador = response.data;
            let dataAdmissao = colaborador.dataAdmissao;
            let dataDemissao = colaborador.dataDemissao
            let setor = colaborador.setor === null ? "Não registrado" : colaborador.setor.nome;

            switch (dataAdmissao) {
                case null:
                    dataAdmissao = colaborador.estagiario.dataAdmissao
                    dataAdmissao = dataAdmissao.split("-");
                    dataAdmissao = `${dataAdmissao[2]}/${dataAdmissao[1]}/${dataAdmissao[0]}`;
                    break;

                default:
                    dataAdmissao = dataAdmissao.split("-");
                    dataAdmissao = `${dataAdmissao[2]}/${dataAdmissao[1]}/${dataAdmissao[0]}`;
                    break;
            }

            switch (dataDemissao) {
                case null:
                    dataDemissao = "Não registrado"
                    break;

                default:
                    dataDemissao = colaborador.dataDemissao
                    dataDemissao = dataDemissao.split("-")
                    dataDemissao = `${dataDemissao[2]}/${dataDemissao[1]}/${dataDemissao[0]}`;
                    break;
            }

            const colaboradorResponse = {
                idColaborador: colaborador.idColaborador,
                nome: colaborador.nome,
                nomeCompleto: colaborador.nomeCompleto,
                dataAdmissao: dataAdmissao,
                dataDemissao: dataDemissao,
                setor: setor,
                empresa: colaborador.empresa.nome,
                tipo: colaborador.tipo,
                foto: `foto-funcionarios/${colaborador.nome}.png`
            }

            localStorage.setItem("colaborador", JSON.stringify(colaboradorResponse))
            obj.setState({
                colaborador: JSON.parse(localStorage.getItem("colaborador")),

            })

            this.getAnotacao(obj, colaboradorResponse.idColaborador, obj.state.dataInicial, obj.state.dataFinal, colaboradorResponse.tipo)

        }).catch(() => {
            console.log("Error colaborador null");
            localStorage.setItem("colaborador", null)
            obj.setState({
                colaborador: ""
            })
            return
        })
    }

    getAnotacao(obj, idColaborador, dataIncio, dataFinal, tipoColaborador) {
        if (tipoColaborador === "TODOS") {
            axios.post(`https://qualityserver12:8081/rh/anotacao/all?id=${idColaborador}&inicio=${dataIncio}&fim=${dataFinal}`).then(response => {
                if (response.data === []) {
                    obj.setState({
                        anotacoesList: [],
                    })
                }

                const listaOrdenada = response.data.sort((a, b) => b.idAnotacao - a.idAnotacao);

                const anotacoes = listaOrdenada.map((anotacao) => {
                    let dataFinalFormatada = formatarData(anotacao.dataFinal)
                    let dataInicioFormatada = formatarData(anotacao.dataInicio)
                    anotacao.dataFinal = dataFinalFormatada
                    anotacao.dataInicio = dataInicioFormatada
                    return anotacao;
                })

                obj.setState({
                    anotacoesList: anotacoes,
                })
                localStorage.setItem('anotacoesList', JSON.stringify(anotacoes))
                this.calcularAnotacoes(obj, anotacoes)
                return
            }).catch((err) => {
                console.log("error em puxar as anotaçoes do colaborador referente");
            })
        } else {

            axios.post(`https://qualityserver12:8081/rh/anotacao/id?id=${idColaborador}&inicio=${dataIncio}&fim=${dataFinal}&tipo=${tipoColaborador}`).then(response => {
                if (response.data === []) {
                    obj.setState({
                        anotacoesList: [],
                    })
                }

                const listaOrdenada = response.data.sort((a, b) => b.idAnotacao - a.idAnotacao);

                const anotacoes = listaOrdenada.map((anotacao) => {
                    let dataFinalFormatada = formatarData(anotacao.dataFinal)
                    let dataInicioFormatada = formatarData(anotacao.dataInicio)
                    anotacao.dataFinal = dataFinalFormatada
                    anotacao.dataInicio = dataInicioFormatada
                    return anotacao;
                })

                obj.setState({
                    anotacoesList: anotacoes,
                })
                localStorage.setItem('anotacoesList', JSON.stringify(anotacoes))
                this.calcularAnotacoes(obj, anotacoes)
                return
            }).catch((err) => {
                console.log("error em puxar as anotaçoes do colaborador referente");
            })
        }
    }

    calcularAnotacoes = (obj, anotacoes) => {
        const dados = null;

        anotacoes.map((anotacao) => {
            if (anotacao.status === false) {
                return
            }
            const dados = {
                bancoHoras: obj.state.bancoHoras += anotacao.bancoPositivo - anotacao.bancoNegativo,
                horaExtra: obj.state.horaExtra += anotacao.horaExtra,
                faltas: anotacao.faltou === true ? ++obj.state.faltas : obj.state.faltas += 0,
                atestadoHora: anotacao.atestadoHora === true ? ++obj.state.atestadoHora : obj.state.atestadoHora += 0,
                atestadoDias: anotacao.atestado === true ? ++obj.state.atestadoDias : obj.state.atestadoDias += 0,
                licenca: anotacao.licenca === true ? ++obj.state.licenca : obj.state.licenca += 0,
                suspensao: anotacao.suspensao === true ? ++obj.state.suspensao : obj.state.suspensao += 0,
                advsEscritas: anotacao.advertenciaEscrita === true ? ++obj.state.advsEscritas : obj.state.advsEscritas += 0,
                advsVerbais: anotacao.advertenciaVerbal === true ? ++obj.state.advsVerbais : obj.state.advsVerbais += 0,
                atraso: anotacao.atraso === true ? ++obj.state.atraso : obj.state.atraso += 0,
                ferias: anotacao.ferias === true ? ++obj.state.ferias : obj.state.ferias += 0
            }
        })
        localStorage.setItem("dados", JSON.stringify(dados))
        obj.setItem(dados)
    }

    criarAnotacao = (obj) => {
        const form = obj.state
        const anotação = {
            responsavel: `${form.responsavel.nome} ${form.responsavel.sobrenome}`,
            anotacao: form.anotacaoInput,
            atestado: form.atestadoCheckBox,
            ferias: form.feriasCheckbox,
            faltou: form.faltouCheckbox,
            suspensao: form.suspensaoCheckbox,
            licenca: form.licencaCheckbox,
            atestadoHora: form.atestadoHoraCheckbox,
            advertenciaEscrita: form.advEscritaCheckbox,
            advertenciaVerbal: form.advVerbalCheckbox,
            horaExtra: form.horaExtra,
            dataAdvEscrita: form.dataAdvEscritaModalAnotacao,
            bancoPositivo: form.bancoPositivo,
            bancoNegativo: form.bancoNegativo,
            colaborador: form.colaborador.idColaborador,
            tipo: form.colaborador.tipo,
            motivo: form.motivo,
            atraso: form.atrasoCheckbox
        }
        axios.put(`https://qualityserver12:8081/rh/anotacao/add?inicio=${form.dataInicialModalAnotacao}&fim=${form.dataFinalModalAnotacao}`, anotação)
    }
    EditarAnotacao = (obj) => {
        const form = obj.state
        const anotação = {
            idAnotacao: form.idAnotacao,
            responsavel: `${form.responsavel.nome} ${form.responsavel.sobrenome}`,
            anotacao: form.anotacaoInput,
            atestado: form.atestadoCheckBox,
            ferias: form.feriasCheckbox,
            faltou: form.faltouCheckbox,
            suspensao: form.suspensaoCheckbox,
            licenca: form.licencaCheckbox,
            atestadoHora: form.atestadoHoraCheckbox,
            advertenciaEscrita: form.advEscritaCheckbox,
            advertenciaVerbal: form.advVerbalCheckbox,
            horaExtra: form.horaExtra,
            dataInicio: form.dataInicialModalAnotacao,
            dataFinal: form.dataFinalModalAnotacao,
            dataAdvEscrita: form.dataAdvEscritaModalAnotacao,
            bancoPositivo: form.bancoPositivo,
            bancoNegativo: form.bancoNegativo,
            colaborador: form.colaborador.idColaborador,
            tipo: form.tipo,
            motivo: form.motivo,
            atraso: form.atrasoCheckbox
        }

        axios.put("https://qualityserver12:8081/rh/anotacao/edit", anotação)
    }
    desabilitarAnotacao(obj) {
        if (obj.state.responsavel.roleSecondary === "MASTER") {
            const form = obj.state
            const anotação = {
                idAnotacao: form.idAnotacao,
            }

            axios.put("https://qualityserver12:8081/rh/anotacao/delete", anotação)
            window.location.reload()
        } else {

        }
    }
    reativarAnotacao(obj) {
        if (obj.state.responsavel.roleSecondary === "MASTER") {
            const form = obj.state
            const anotação = {
                idAnotacao: form.idAnotacao,
            }

            axios.put("https://qualityserver12:8081/rh/anotacao/active", anotação)
            window.location.reload()
        } else {

        }
    }
}



