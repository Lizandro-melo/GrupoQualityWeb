import { Component } from "react";
import { dataHoje } from "../Anotacoes/Constant/AnotacoesConstant";
import ReactModal from "react-modal";
import { RequisicaoAnotacao } from "../Anotacoes/Classes/RequisicaoAnotacao";
import Cookies from "js-cookie";
import { RequireAtualizar } from "./Classes/RequireAtualizar";


export default class AtualizarSistemaRh extends Component {

    state = {
        user: JSON.parse(Cookies.get("user")),
        colaboradoresList: [],
        filtroColaborador: Cookies.get("filtroRhColaborador") === null ? null : Cookies.get("filtroRhColaborador"),
        colaborador: JSON.parse(localStorage.getItem("colaborador")) === null ? "" : JSON.parse(localStorage.getItem("colaborador")),
        nomeCompleto: JSON.parse(localStorage.getItem("colaborador")) === null ? "" : JSON.parse(localStorage.getItem("colaborador")).nomeCompleto,
        dataNascimento: "",
        empresa: "",
        setor: "",
        dataInicio: dataHoje,
        dataDemissao: "",
        tipo: "",
        permissaoPrimaria: "",
        permissaoSecundaria: "",
        fotoColaborador: "",
        senha: "",
        comSenha: "",
        mensagemModal: "",
        modalState: false,
        situacao: "Situação",
        mensagemModalConfirmar: null,
        modalComfirmarState: false,
        acao: ""
    }

    require = new RequireAtualizar();
    requireAnotacao = new RequisicaoAnotacao();

    componentDidMount = () => {
        if (this.state.colaborador !== "") {
            this.require.getDadosColaborador(this, this.state.colaborador.idColaborador)
        }
        this.requireAnotacao.getAllNomesColaboradores(this);
    }

    fecharModalMensagem = () => {
        this.setState({
            mensagemModal: null,
            modalState: false
        })
    }

    fecharModalConfirmar = () => {
        this.setState({
            mensagemModalConfirmar: null,
            modalComfirmarState: false
        })
    }

    render() {
        return (
            <section className="w-full h-full heebo">
                <ReactModal
                    isOpen={this.state.modalComfirmarState}
                    className="outline-none w-full h-full flex justify-center items-center"
                    onRequestClose={this.fecharModalConfirmar}
                    style={{ overlay: { zIndex: 1000 }, content: { zIndex: 1001 } }}
                >
                    <section
                        className="w-3/5 flex flex-col h-2/5 kanit bg-stone-50 rounded-xl shadow-xl"
                    >
                        <header
                            className="w-full bg-blue-950 h-10 rounded-t-xl flex items-center justify-between px-10"
                        >
                            <span className="text-white kanit font-semibold">
                                Mensagem
                            </span>
                        </header>
                        <section className="flex flex-col gap-14 w-full h-full justify-center items-center">
                            <section >
                                <span className="font-semibold text-xl">
                                    {this.state.mensagemModalConfirmar}
                                </span>
                            </section>
                            <section className="flex gap-5">
                                <button className="bg-white transition-colors border border-stone-300 px-12 h-10 rounded-md cursor-pointer hover:bg-stone-200 flex justify-center items-center font-medium"
                                    onClick={() => {
                                        switch (this.state.acao) {
                                            case "contratar":
                                                this.require.contratarEstagiario(this, this.state.colaborador.idColaborador)
                                                break
                                            case "desligar":
                                                this.require.desligarColaborador(this, this.state.colaborador.idColaborador)
                                                break
                                            case "reativar":
                                                break
                                        }
                                        this.fecharModalConfirmar()
                                    }
                                    }
                                >
                                    Sim
                                </button>
                                <button className="bg-white transition-colors border border-stone-300 px-12 h-10 rounded-md cursor-pointer hover:bg-stone-200 flex justify-center items-center font-medium"
                                    onClick={() => {
                                        this.fecharModalConfirmar()
                                    }
                                    }
                                >
                                    Não
                                </button>
                            </section>
                        </section>
                    </section>
                </ReactModal>
                <ReactModal
                    isOpen={this.state.modalState}
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
                                Mensagem
                            </span>
                        </header>
                        <section className="flex flex-col gap-14 w-full h-full justify-center items-center">
                            <section >
                                <span className="font-semibold text-xl">
                                    {this.state.mensagemModal}
                                </span>
                            </section>
                            <section >
                                <button className="bg-white transition-colors border border-stone-300 px-12 h-10 rounded-md cursor-pointer hover:bg-stone-200 flex justify-center items-center font-medium"
                                    onClick={() => {
                                        this.fecharModalMensagem()
                                        window.location.reload()
                                    }
                                    }
                                >
                                    Ok
                                </button>
                            </section>
                        </section>
                    </section>
                </ReactModal>
                <form className="relative top-3 w-full px-20 flex gap-24 justify-center items-start h-full">
                    <section className="w-full flex flex-col gap-4">
                        <section className="flex flex-col">
                            <label className="text-sm" htmlFor="NomeCompleto">Nome do colaborador</label>
                            <select className="w-full h-10 px-2 rounded-lg border border-stone-300 text-sm" onChange={(e) => {
                                this.require.getDadosColaborador(this, e.target.value)
                            }}>
                                <option value="e" disabled selected>{this.state.colaborador === null ? "" : this.state.colaborador.nome}</option>
                                {
                                    this.state.colaboradoresList.map(colaborador => {
                                        return (
                                            <option key={colaborador.idColaborador} value={colaborador.idColaborador}>{colaborador.nomeCompleto}</option>
                                        )
                                    })
                                }
                            </select>
                        </section>
                        <section className="flex gap-4 max-lg:flex-wrap">
                            <section className="flex gap-1 items-center">
                                <legend className="text-xs">Contratados</legend>
                                <input onChange={() => {
                                    this.setState({
                                        filtroColaborador: "CONTRATADOS"
                                    })
                                    Cookies.set("filtroRhColaborador", "CONTRATADOS")
                                    this.requireAnotacao.getAllNomesColaboradores(this)
                                }} name="filtroColaborador" type="radio" checked={this.state.filtroColaborador === "CONTRATADOS" ? true : false} />
                            </section>
                            <section className="flex gap-1 items-center">
                                <legend className="text-xs">Estagiários</legend>
                                <input onChange={() => {
                                    this.setState({
                                        filtroColaborador: "ESTAGIARIOS"
                                    })
                                    Cookies.set("filtroRhColaborador", "ESTAGIARIOS")
                                    this.requireAnotacao.getAllNomesColaboradores(this)
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
                                    this.requireAnotacao.getAllNomesColaboradores(this)
                                }
                                } name="filtroColaborador" type="radio" checked={this.state.filtroColaborador === "DESLIGADOS" ? true : false} />
                            </section>
                            <section className={`h-5 border px-5 text-sm flex ${this.state.situacao === "Desligado" ? "border-red-500 text-red-700" : "border-green-500 text-green-700"}`}>
                                <span>{this.state.situacao}</span>
                            </section>
                        </section>
                        <section className="flex flex-col">
                            <label className="text-sm" htmlFor="DataNascimento">Data de Nascimento</label>
                            <input className="w-full h-10 px-2 rounded-lg border border-stone-300 text-sm" type="date" onChange={(e) => this.setState({ dataNascimento: e.target.value })} required value={this.state.dataNascimento} />
                        </section>
                        <section className="flex flex-col">
                            <label className="text-sm" htmlFor="Empresa">Empresa</label>
                            <select className="w-full h-10 px-2 rounded-lg border border-stone-300 text-sm" onChange={(e) => {
                                this.setState({ empresa: e.target.value });
                            }} value={this.state.empresa}>
                                <option value="x" selected disabled>{this.state.empresa === "" ? "Empresa" : this.state.empresa}</option>
                                <option value="1">C&M Serviços</option>
                                <option value="2">Qualylab</option>
                                <option value="6">C&M Soluçoes</option>
                                <option value="8">Grupo Quality</option>
                                <option value="9">Prime</option>
                            </select>
                        </section>
                        <section className="flex flex-col">
                            <label className="text-sm" htmlFor="">Setor</label>
                            <select className="w-full h-10 px-2 rounded-lg border border-stone-300 text-sm" onChange={(e) => {
                                this.setState({ setor: e.target.value })
                            }} value={this.state.setor}>
                                <option value="x" selected disabled>{this.state.setor === "" ? "Setor" : this.state.setor}</option>
                                <option value="1">Financeiro - Grupo Quality</option>
                                <option value="2">Compras - Qualylab</option>
                                <option value="3">Qualidade - Qualylab</option>
                                <option value="4">TI</option>
                                <option value="5">Laboratório - Qualylab</option>
                                <option value="6">RH - Grupo Quality</option>
                                <option value="7">Comercial - Qualylab</option>
                                <option value="8">Compras - Grupo Quality</option>
                                <option value="9">Comercial - Grupo Quality</option>
                                <option value="10">Manutenção - Prime</option>
                                <option value="11">Serviços Gerais - Prime</option>
                                <option value="12">SAC - Grupo Quality</option>
                                <option value="13">Operacional - C&M Serviços</option>
                                <option value="14">Qualidade - Qualy Lab</option>
                            </select>
                        </section>
                        <section className="flex flex-col">
                            <label className="text-sm" htmlFor="">Data de Inicio</label>
                            <input className="w-full h-10 px-2 rounded-lg border border-stone-300 text-sm" type="date" value={this.state.dataInicio} onChange={(e) => {
                                this.setState({ dataInicio: e.target.value })
                            }} />
                        </section>
                        <section className="flex flex-col">
                            <label className="text-sm" htmlFor="">Data de Demissão</label>
                            <input className="w-full h-10 px-2 rounded-lg border border-stone-300 text-sm" type="date" value={this.state.dataDemissao} onChange={(e) => {
                                this.setState({ dataDemissao: e.target.value })
                            }} disabled={this.state.dataDemissao === "" || this.state.dataDemissao === ""} />
                        </section>
                    </section>
                    <section className="w-full flex flex-col gap-4">
                        <section className="flex flex-col">
                            <label className="text-sm" htmlFor="">Tipo de Colaborador</label>
                            <select className="w-full h-10 px-2 rounded-lg border border-stone-300 text-sm" onChange={(e) => {
                                this.setState({ tipo: e.target.value })
                            }} disabled>
                                <option value="x" selected disabled>{this.state.tipo === "" ? "Tipo" : this.state.tipo}</option>
                                <option value="CONTRATADO">Contratado</option>
                                <option value="ESTAGIARIO">Estagiário</option>
                            </select>
                        </section>
                        <section className="flex flex-col">
                            <label className="text-sm" htmlFor="">Permissão Primaria</label>
                            <select className="w-full h-10 px-2 rounded-lg border border-stone-300 text-sm" onChange={(e) => {
                                this.setState({
                                    permissaoPrimaria: e.target.value
                                })
                            }}>
                                <option value="x" selected disabled>{this.state.permissaoPrimaria === "" ? "Permissão Primaria" : this.state.permissaoPrimaria}</option>
                                <option value="MASTER">MASTER</option>
                                <option value="RH">RH</option>
                                <option value="ESTOQUE">ESTOQUE</option>
                            </select>
                        </section>
                        <section className="flex flex-col">
                            <label className="text-sm" htmlFor="">Permissão Secundaria</label>
                            <select className="w-full h-10 px-2 rounded-lg border border-stone-300 text-sm" onChange={(e) => {
                                this.setState({ permissaoSecundaria: e.target.value })
                            }}>
                                <option value="x" selected disabled>{this.state.permissaoSecundaria === "" ? "Permissão Secundaria" : this.state.permissaoSecundaria}</option>
                                <option value="MASTER">MASTER</option>
                                <option value="COMUM">COMUM</option>
                            </select>
                        </section>
                        <section className="flex flex-col">
                            <label className="text-sm" htmlFor="">Foto do Colaborador</label>
                            <input className=" w-full h-10 px-2 rounded-lg  pt-2 text-sm file:mr-4 file:py-1 file:px-4
      file:rounded-full file:border
      file:text-sm file:font-semibold file:border-stone-300
      file:bg-white file:text-blue-950
      hover:file:bg-stone-200" type="file" accept="image/png, image/jpeg" onChange={(e) => {
                                    this.setState({ fotoColaborador: e.target.files[0] })
                                }} />
                        </section>
                        <section className="flex flex-col">
                            <label className="text-sm" htmlFor="">Senha</label>
                            <input className="w-full h-10 px-2 rounded-lg border border-stone-300 text-sm" type="password" placeholder="Digite uma senha" onChange={(e) => {
                                this.setState({ senha: e.target.value })
                            }} required value={this.state.senha} />
                        </section>
                        <section className="flex flex-col">
                            <label className="text-sm" htmlFor="">Confirmar Senha</label>
                            <input onChange={(e) => {
                                this.setState({ comSenha: e.target.value })
                            }} required className="w-full h-10 px-2 rounded-lg border border-stone-300 text-sm" type="password" placeholder="Confirme a senha" value={this.state.comSenha} />
                        </section>
                    </section>
                    <section className="absolute bottom-5 flex gap-2 flex-wrap ">
                        <button type="button" onClick={() => {
                            if (this.require.verificarCampos(this) === true) {
                                return
                            }
                            this.require.updateColaborador(this)
                        }} className="hover:bg-stone-200 active:scale-90  h-11 border w-56 bg-white font-semibold border-stone-400 rounded-lg">
                            Atualizar Colaborador
                        </button>
                        <button type="button" onClick={() => {
                            this.require.verificarCampos(this);
                            this.setState({
                                acao: "desligar",
                                mensagemModalConfirmar: `Tem certeza que deseja desligar o colaborador ${this.state.nomeCompleto}?`,
                                modalComfirmarState: true
                            })
                        }} className={`hover:bg-stone-200 active:scale-90 h-11 border px-10 bg-white font-semibold ${this.state.user.roleSecondary === "MASTER"} border-stone-400 rounded-lg`}>
                            Desligar
                        </button>
                        <button type="button" onClick={() => {
                            this.require.verificarCampos(this);
                            this.setState({
                                acao: "reativar",
                                mensagemModalConfirmar: `Tem certeza que deseja reativar o colaborador ${this.state.nomeCompleto}?`,
                                modalComfirmarState: true
                            })
                        }} className={`hover:bg-stone-200 active:scale-90 h-11 border px-10 bg-white font-semibold ${this.state.user.roleSecondary === "MASTER"} border-stone-400 rounded-lg`}>
                            Reativar
                        </button>
                        <button type="button" onClick={() => {
                            this.require.verificarCampos(this);
                            this.setState({
                                acao: "contratar",
                                mensagemModalConfirmar: `Tem certeza que deseja contratar o estagiário ${this.state.nomeCompleto}?`,
                                modalComfirmarState: true
                            })
                        }} className={`hover:bg-stone-200 active:scale-90 h-11 border px-10 bg-white font-semibold ${this.state.user.roleSecondary === "MASTER"} border-stone-400 rounded-lg`}>
                            Contratar
                        </button>
                    </section>
                </form>
            </section>
        )
    }
}