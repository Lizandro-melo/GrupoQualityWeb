import { Component } from "react";
import iconFiltro from "../../../img/icon/filtro.png"
import { RequisicaoAnotacao } from "./Classes/RequisicaoAnotacao";
import { dataFinalDefault, dataHoje, dataInicialDefault } from "./Constant/AnotacoesConstant";
import ReactModal from "react-modal";
import Cookies from "js-cookie";
import $ from "jquery";
import FormCriarAnotacao from "./FormCriarAnotacao";
import FormEditarAnotacao from "./FormEditarAnotacao";

export default class AnotacoesMain extends Component {
    dados = JSON.parse(localStorage.getItem("dados"))
    state = {
        user: JSON.parse(Cookies.get("user")),
        colaborador: JSON.parse(localStorage.getItem("colaborador")) === null ? "" : JSON.parse(localStorage.getItem("colaborador")),
        colaboradoresList: [],
        anotacoesList: JSON.parse(localStorage.getItem('anotacoesList')) === null ? [] : JSON.parse(localStorage.getItem('anotacoesList')),
        //dados Calculados
        bancoHoras: this.dados === null ? 0 : this.dados.bancoHoras,

        horaExtra: this.dados === null ? 0 : this.dados.horaExtra,

        faltas: this.dados === null ? 0 : this.dados.faltas,

        atestadoHora: this.dados === null ? 0 : this.dados.atestadoHora,

        atestadoDias: this.dados === null ? 0 : this.dados.atestadoDias,

        licenca: this.dados === null ? 0 : this.dados.licenca,

        suspensao: this.dados === null ? 0 : this.dados.suspensao,

        advsEscritas: this.dados === null ? 0 : this.dados.advsEscritas,

        advsVerbais: this.dados === null ? 0 : this.dados.advsVerbais,

        atraso: this.dados === null ? 0 : this.dados.atraso,

        ferias: this.dados === null ? 0 : this.dados.ferias,
        // fim
        selectTipoColaborador: localStorage.getItem("selectTipoColaborador"),
        filtroColaborador: Cookies.get("filtroRhColaborador"),
        foto: "",
        dataFinal: dataFinalDefault,
        dataInicial: dataInicialDefault,
        modalIsOpenCriarAnotacao: false,
        modalIsOpenEditarAnotacao: false,
        modalIsOpenMensagem: false,
        msgModal: ""
    }


    require = new RequisicaoAnotacao();

    componentDidMount = () => {
        localStorage.setItem("selectTipoColaborador", "CONTRATADO")
        if (this.state.colaborador !== "") {
            this.require.getAnotacao(this, this.state.colaborador.idColaborador, this.state.dataInicial, this.state.dataFinal, this.state.selectTipoColaborador)
            this.setState({
                bancoHoras: 0,
                horaExtra: 0,
                faltas: 0,
                atestadoHora: 0,
                atestadoDias: 0,
                licenca: 0,
                suspensao: 0,
                advsEscritas: 0,
                advsVerbais: 0,
                atraso: 0,
                ferias: 0,
            })
        }
        this.require.getAllNomesColaboradores(this);
    }

    abrirModalCriarAnotacao = () => {
        if (this.state.colaborador !== "") {
            this.setState({ modalIsOpenCriarAnotacao: true })

        } else {
            this.abrirModalMensagem("Selecione um Colaborador antes de tentar criar uma anotação")
        }
    }
    fecharModalCriarAnotacao = () => {
        this.setState({ modalIsOpenCriarAnotacao: false })
    }
    abrirModalEditarAnotacao = () => {
        this.setState({ modalIsOpenEditarAnotacao: true })
    }
    fecharModalEditarAnotacao = () => {
        this.setState({ modalIsOpenEditarAnotacao: false })
    }

    abrirModalMensagem = (msg) => {
        this.setState({ modalIsOpenMensagem: true, msgModal: msg })
    }

    fecharModalMensagem = () => {
        this.setState({ modalIsOpenMensagem: false, msgModal: "" })
    }


    render() {
        return (
            <section className=" flex gap-5 w-full">
                <ReactModal
                    className="outline-none w-full h-full flex justify-center items-center"
                    isOpen={this.state.modalIsOpenCriarAnotacao}
                    onRequestClose={this.fecharModalCriarAnotacao}
                    style={{ overlay: { zIndex: 1000 }, content: { zIndex: 1001 } }}
                >
                    <section
                        className="w-5/6 max-lg:w-11/12 flex flex-col h-5/6 kanit bg-stone-50 rounded-xl shadow-xl"
                    >
                        <header
                            className="w-full bg-blue-950 h-10 rounded-t-xl flex items-center justify-between px-10"
                        >
                            <span className="text-white kanit font-semibold">
                                Criar Anotação
                            </span>
                            <button
                                className="w-4 h-4 bg-red-500 rounded-full"
                                onClick={this.fecharModalCriarAnotacao}
                            >
                            </button>
                        </header>
                        <FormCriarAnotacao />
                    </section>
                </ReactModal>
                <ReactModal
                    className="outline-none w-full h-full flex justify-center items-center"
                    isOpen={this.state.modalIsOpenEditarAnotacao}
                    onRequestClose={this.fecharModalEditarAnotacao}
                    style={{ overlay: { zIndex: 1000 }, content: { zIndex: 1001 } }}
                >
                    <section
                        className="w-5/6 max-lg:w-11/12 flex flex-col h-5/6  kanit bg-stone-50 rounded-xl shadow-xl"
                    >
                        <header
                            className="w-full bg-blue-950 h-10 rounded-t-xl flex items-center justify-between px-10"
                        >
                            <span className="text-white kanit font-semibold">
                                Editar Anotação
                            </span>
                            <button
                                className="w-4 h-4 bg-red-500 rounded-full"
                                onClick={this.fecharModalEditarAnotacao}
                            >
                            </button>
                        </header>
                        <FormEditarAnotacao />
                    </section>
                </ReactModal>
                <ReactModal
                    isOpen={this.state.modalIsOpenMensagem}
                    className="outline-none w-full h-full flex justify-center items-center"
                    onRequestClose={this.fecharModalMensagem}
                    style={{ overlay: { zIndex: 1000 }, content: { zIndex: 1001 } }}
                >
                    <section
                        className="w-3/5 flex flex-col h-2/5 kanit bg-stone-50 rounded-xl shadow-xl"
                    >
                        <header
                            className="w-full bg-blue-950 h-10 rounded-t-xl flex items-center justify-between px-10"
                        >
                            <span className="text-white kanit font-semibold">
                                Mensagem de Erro
                            </span>
                        </header>
                        <section className="flex flex-col gap-14 w-full h-full justify-center items-center">
                            <section >
                                <span className="font-semibold text-xl">
                                    {this.state.msgModal}
                                </span>
                            </section>
                            <section >
                                <button className="bg-white transition-colors border border-stone-300 px-12 h-10 rounded-md cursor-pointer hover:bg-stone-200 flex justify-center items-center font-medium"
                                    onClick={this.fecharModalMensagem}
                                >
                                    Ok
                                </button>
                            </section>
                        </section>
                    </section>
                </ReactModal>
                <section className="flex flex-col w-full">
                    <section className={`bg-white flex justify-start gap-3 items-center p-5 rounded-2xl border-b-4 ${this.state.colaborador.tipo === "DESLIGADO" ? "border-red-500" : "border-green-300"} border`}>
                        <img className={`w-20 h-20 rounded-xl ${this.state.colaborador.foto === "" ? "bg-slate-400" : ""}`} src={this.state.colaborador.foto} alt="" />
                        <section className="flex flex-col text-xs">
                            <span className="font-semibold">Nome: {this.state.colaborador.nomeCompleto}</span>
                            <span className="font-semibold">Setor: {this.state.colaborador.setor}</span>
                            <span className="font-semibold">Empresa: {this.state.colaborador.empresa}</span>
                            <span className="font-semibold">Contratado(a): {this.state.colaborador.dataAdmissao}</span>
                            {this.state.colaborador.tipo === "DESLIGADO" ? <span className="font-semibold">Desligado: {this.state.colaborador.dataDemissao}</span> : null}
                            <span className="font-semibold">Tipo: {this.state.colaborador.tipo}</span>
                        </section>
                    </section>
                    <section className="flex relative">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if (this.state.colaborador !== "") {
                                this.require.getAnotacao(this, this.state.colaborador.idColaborador, this.state.dataInicial, this.state.dataFinal, this.state.selectTipoColaborador)
                                this.setState({
                                    bancoHoras: 0,
                                    horaExtra: 0,
                                    faltas: 0,
                                    atestadoHora: 0,
                                    atestadoDias: 0,
                                    licenca: 0,
                                    suspensao: 0,
                                    advsEscritas: 0,
                                    advsVerbais: 0,
                                    atraso: 0,
                                    ferias: 0,
                                })
                            } else {
                                this.abrirModalMensagem("Selecione um Colaborador")
                            }
                        }} className="flex flex-col w-full">
                            <section className="flex relative items-center">
                                <section
                                    className="flex flex-col mt-4 gap-2"
                                >
                                    <label htmlFor="Colaboradores" className="text-xs font-bold">Colaboradores</label>
                                    <select
                                        className="border border-stone-300 px-2 w-80 max-lg:w-52 bg-white h-8 text-sm"
                                        onChange={(e) => {
                                            this.require.getColaboradorDados(this, e.target.value)
                                            this.setState({
                                                bancoHoras: 0,
                                                horaExtra: 0,
                                                faltas: 0,
                                                atestadoHora: 0,
                                                atestadoDias: 0,
                                                licenca: 0,
                                                suspensao: 0,
                                                advsEscritas: 0,
                                                advsVerbais: 0,
                                                atraso: 0,
                                                ferias: 0,
                                            })
                                        }}
                                    >
                                        <option value="" disabled selected>{this.state.colaborador.nome === undefined ? this.state.filtroColaborador : this.state.colaborador.nome}</option>
                                        {
                                            this.state.colaboradoresList.map(colaborador => {
                                                return (
                                                    <option key={colaborador.idColaborador} value={colaborador.idColaborador}>{colaborador.nome}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <section className="flex gap-4 max-lg:flex-wrap max-lg:w-52 max-lg:gap-2 max-lg:justify-end">
                                        <section className="flex gap-1 items-center">
                                            <legend className="text-xs">Contratados</legend>
                                            <input onChange={() => {
                                                this.setState({
                                                    filtroColaborador: "CONTRATADOS"
                                                })
                                                Cookies.set("filtroRhColaborador", "CONTRATADOS")
                                                this.require.getAllNomesColaboradores(this)
                                            }} name="filtroColaborador" type="radio" checked={this.state.filtroColaborador === "CONTRATADOS" ? true : false} />
                                        </section>
                                        <section className="flex gap-1 items-center">
                                            <legend className="text-xs">Estagiários</legend>
                                            <input onChange={() => {
                                                this.setState({
                                                    filtroColaborador: "ESTAGIARIOS"
                                                })
                                                Cookies.set("filtroRhColaborador", "ESTAGIARIOS")
                                                this.require.getAllNomesColaboradores(this)
                                            }
                                            } name="filtroColaborador" type="radio" checked={this.state.filtroColaborador === "ESTAGIARIOS" ? true : false} />
                                        </section>
                                        <section className="flex gap-1 items-center">
                                            <legend className="text-xs">Desligados</legend>
                                            <input onChange={() => {
                                                this.setState({
                                                    filtroColaborador: "DESLIGADOS"
                                                })
                                                Cookies.set("filtroRhColaborador", "DESLIGADOS")
                                                this.require.getAllNomesColaboradores(this)
                                            }
                                            } name="filtroColaborador" type="radio" checked={this.state.filtroColaborador === "DESLIGADOS" ? true : false} />
                                        </section>
                                    </section>
                                </section>

                                <button type="button" className="absolute top-10 right-14 bg-white transition-colors border border-stone-300 px-8 h-8 rounded-md cursor-pointer hover:bg-stone-200 flex justify-center items-center font-medium"
                                    onClick={this.abrirModalCriarAnotacao}
                                >
                                    Criar Anotação
                                </button>

                            </section>
                            <section className="flex my-5">
                                <img src={iconFiltro} alt="filtro" />
                                <span className="font-bold">Filtro</span>
                            </section>
                            <section className="flex flex-col gap-4">
                                <section className="flex flex-col gap-2">
                                    <label htmlFor="Colaboradores" className="text-xs font-bold">Data de Inicio</label>
                                    <input
                                        type="date"
                                        value={this.state.dataInicial}
                                        onChange={(e) => {
                                            this.setState({
                                                dataInicial: e.target.value
                                            })
                                        }
                                        }
                                        className="border border-stone-300 px-2 w-80 max-lg:w-52 bg-white h-8 text-sm"
                                    />
                                </section>
                                <section className="flex flex-col gap-2">
                                    <label htmlFor="Colaboradores" className="text-xs font-bold">Data de Final</label>
                                    <input
                                        type="date"
                                        value={this.state.dataFinal}
                                        onChange={(e) => {
                                            this.setState({
                                                dataFinal: e.target.value
                                            })
                                        }
                                        }
                                        className="border border-stone-300  px-2 w-80 max-lg:w-52 bg-white h-8 text-sm"
                                    />
                                </section>
                                <section className="flex flex-col gap-2">
                                    <label htmlFor="Colaboradores" className="text-xs font-bold">Tipo da Anotação</label>
                                    <select
                                        className="border border-stone-300 px-2 w-80 max-lg:w-52 bg-white h-8 text-sm"
                                        onChange={(e) => {
                                            this.setState({
                                                selectTipoColaborador: e.target.value
                                            })
                                            localStorage.setItem("selectTipoColaborador", e.target.value)
                                        }
                                        }
                                    >
                                        {this.state.filtroColaborador === "CONTRATADOS" ?
                                            <option value="CONTRATADO">Contratados</option>
                                            :
                                            <option value="ESTAGIARIO">Estagiarios</option>
                                        }
                                        {this.state.filtroColaborador === "CONTRATADOS" ?
                                            <option value="ESTAGIARIO">Estagiarios</option>
                                            :
                                            <option value="CONTRATADO">Contratados</option>
                                        }
                                        {this.state.user.rolePrimary === "MASTER" ?
                                            <option value="TODOS">Todos</option> :
                                            ""
                                        }
                                    </select>
                                </section>
                                <section className="flex">
                                    <button type="submit" className="bg-white transition-colors border border-stone-300 px-12 h-10 rounded-md cursor-pointer hover:bg-stone-200 flex justify-center items-center font-medium"

                                    >
                                        Procurar
                                    </button>
                                </section>
                            </section>
                        </form>
                        <section className="flex bottom-5 -right-5 absolute justify-end items-end">
                            <section className="flex border w-56 rounded-s-xl justify-center border-stone-300 border-r-white bg-white ">
                                <table className="w-52">
                                    <tr>
                                        <td>Banco de Horas:</td>
                                        <td>{this.state.bancoHoras}</td>
                                    </tr>
                                    <tr>
                                        <td>Hora Extra:</td>
                                        <td>{this.state.horaExtra}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Faltas:
                                        </td>
                                        <td>{this.state.faltas}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Atestado Hora:
                                        </td>
                                        <td>{this.state.atestadoHora}</td>
                                    </tr>
                                    <tr>
                                        Atestado Dias:
                                        <td>{this.state.atestadoDias}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Licença:
                                        </td>
                                        <td>{this.state.licenca}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Suspensão:
                                        </td>
                                        <td>{this.state.suspensao}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Advertências Escritas:
                                        </td>
                                        <td>{this.state.advsEscritas}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Advertências Verbais:
                                        </td>
                                        <td>{this.state.advsVerbais}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Atraso:
                                        </td>
                                        <td>{this.state.atraso}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Ferias:
                                        </td>
                                        <td>{this.state.ferias}</td>
                                    </tr>
                                </table>
                            </section>
                        </section>
                    </section>
                </section>
                <section className="flex w-full h-full">
                    <section className="p-4 w-full flex gap-3 flex-col justify-between bg-white border rounded-xl border-stone-300 overflow-auto max-h-96">
                        <section className=" w-full bg-white-800">
                            <span className="text-slate-500 text-sm">Anotações</span>
                        </section>
                        <section className="flex-col-reverse w-full  flex rounded-xl gap-3">
                            {this.state.anotacoesList.map(anotacao => {
                                return (
                                    <section className={`px-3 py-3 flex flex-col relative  rounded-xl border-b-4 border w-full cursor-pointer h-24 justify-between border-blue-400 ${anotacao.status === false ? "opacity-30" : ""}`} onClick={() => {
                                        localStorage.setItem("anotacao", JSON.stringify(anotacao))
                                        this.abrirModalEditarAnotacao()
                                    }} title={anotacao.status === false ? "Anotações Excluidas não são contabilizadas!" : ""}>
                                        <section className="flex justify-between font-semibold">
                                            <section className="text-start flex flex-col">
                                                <span className="text-xs">
                                                    Data de Incio: {anotacao.dataInicio}
                                                </span>
                                                <span className="text-xs">
                                                    Encerramento: {anotacao.dataFinal}
                                                </span>
                                            </section>
                                            <span className="text-xs">
                                                {anotacao.motivo} - {anotacao.responsavel}
                                            </span>
                                        </section>
                                        <section className="overflow-hidden max-w-sm text-ellipsis whitespace-nowrap font-bold ">
                                            <span className="text-sm ">
                                                {anotacao.anotacao}
                                            </span>
                                        </section>
                                    </section>
                                )
                            })}

                        </section>

                    </section>
                </section>
            </section >
        )
    }
}