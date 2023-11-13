import Cookies from "js-cookie";
import { Component } from "react";
import { RequisicaoAnotacao } from "./Classes/RequisicaoAnotacao";
import { dataHoje, formatarDataInput } from "./Constant/AnotacoesConstant";
import $ from "jquery";

export default class FormEditarAnotacao extends Component {

    state = {
        responsavel: JSON.parse(Cookies.get("user")),
        colaborador: JSON.parse(localStorage.getItem("colaborador")),
        idAnotacao: "",
        // Campos
        horaExtra: 0,
        bancoPositivo: 0,
        bancoNegativo: 0,
        dataInicialModalAnotacao: dataHoje,
        dataFinalModalAnotacao: dataHoje,
        dataAdvEscritaModalAnotacao: "",
        atestadoCheckBox: false,
        feriasCheckbox: false,
        faltouCheckbox: false,
        suspensaoCheckbox: false,
        licencaCheckbox: false,
        atestadoHoraCheckbox: false,
        advEscritaCheckbox: false,
        advVerbalCheckbox: false,
        atrasoCheckbox: false,
        anotacaoInput: "",
        motivo: "",
        tipo: "",
        status: null
    }

    componentDidMount = () => {
        const anotacao = JSON.parse(localStorage.getItem("anotacao"))
        const dataIncial = formatarDataInput(anotacao.dataInicio)
        const dataFinal = formatarDataInput(anotacao.dataFinal)
        this.setState({
            idAnotacao: anotacao.idAnotacao,
            horaExtra: anotacao.horaExtra,
            bancoPositivo: anotacao.bancoPositivo,
            bancoNegativo: anotacao.bancoNegativo,
            dataInicialModalAnotacao: dataIncial,
            dataFinalModalAnotacao: dataFinal,
            dataAdvEscritaModalAnotacao: anotacao.dataAdvEscrita,
            atestadoCheckBox: anotacao.atestado,
            feriasCheckbox: anotacao.ferias,
            faltouCheckbox: anotacao.faltou,
            suspensaoCheckbox: anotacao.suspensao,
            licencaCheckbox: anotacao.licenca,
            atestadoHoraCheckbox: anotacao.atestadoHora,
            advEscritaCheckbox: anotacao.advertenciaEscrita,
            advVerbalCheckbox: anotacao.advertenciaVerbal,
            atrasoCheckbox: anotacao.atraso,
            anotacaoInput: anotacao.anotacao,
            motivo: anotacao.motivo,
            tipo: anotacao.tipo,
            status: anotacao.status
        })
    }

    require = new RequisicaoAnotacao()

    render() {
        return (
            <form id="criar-anotacao" onSubmit={(e) => {
                e.preventDefault();
                this.require.EditarAnotacao(this);
                window.location.reload()
            }
            }
                className="flex p-5 h-full w-full justify-between ">
                <section className="flex flex-col gap-14 w-full max-lg:w-11/12 ">
                    <section className="flex gap-5">
                        <section className="flex flex-col gap-2">
                            <section className="bg-stone-300 w-fit p-0.5">
                                <span>
                                    Nome do Colaborador: {this.state.colaborador.nome}
                                </span>
                            </section>
                            <section className="bg-stone-300 w-fit p-1">
                                <span>
                                    Tipo: {this.state.colaborador.tipo}
                                </span>
                            </section>
                        </section>
                        <img className={`w-28 h-28 rounded-xl ${this.state.colaborador.foto === "" ? "bg-slate-400" : ""}`} src={this.state.colaborador.foto} alt="" />
                    </section>
                    <section>
                        <section className="flex gap-5 text-sm">
                            <section className="flex flex-col gap-2">
                                <section className="flex flex-col">
                                    <label htmlFor="">Hora Extra</label>
                                    <input className="h-7 border border-stone-300 w-40 pl-2" type="number" value={this.state.horaExtra} onChange={(e) => { this.setState({ horaExtra: e.target.value }) }} onFocus={() => this.setState({ horaExtra: "" })} />
                                </section>
                                <section className="flex flex-col">
                                    <label htmlFor="">Banco Positivo</label>
                                    <input className="h-7 border border-stone-300 w-40 pl-2" type="number" value={this.state.bancoPositivo} onChange={(e) => { this.setState({ bancoPositivo: e.target.value }) }} onFocus={() => this.setState({ bancoPositivo: "" })} />
                                </section>
                                <section className="flex flex-col">
                                    <label htmlFor="">Banco Negativo</label>
                                    <input className="h-7 border border-stone-300 w-40 pl-2" type="number" value={this.state.bancoNegativo} onChange={(e) => { this.setState({ bancoNegativo: e.target.value }) }} onFocus={() => this.setState({ bancoNegativo: "" })} />
                                </section>
                                <section className="flex flex-col">
                                    <label htmlFor="">Motivo</label>
                                    <select className="h-7 border border-stone-300 w-40 pl-2"
                                        onChange={(e) => this.setState({ motivo: e.target.value })}
                                    >
                                        <option value="">Motivos</option>
                                        <option value="Atraso">Atraso</option>
                                        <option value="Ferias">Ferias</option>
                                        <option value="Faltou">Faltou</option>
                                        <option value="Suspensão">Suspensão</option>
                                        <option value="Licença">Licença</option>
                                        <option value="Atestado H.">Atestado H.</option>
                                        <option value="Adv. Escrita">Adv. Escrita</option>
                                        <option value="Adv. Verbal">Adv. Verbal</option>
                                        <option value="Atestado">Atestado</option>
                                        <option value="Hora Extra">Hora Extra</option>
                                    </select>
                                </section>
                            </section>
                            <section className="flex flex-col gap-2">
                                <section className="flex flex-col">
                                    <label htmlFor="">Data Incio</label>
                                    <input className="h-7 border border-stone-300 w-40 pl-2" type="date" value={this.state.dataInicialModalAnotacao} onChange={(e) => {
                                        this.setState({
                                            dataInicialModalAnotacao: e.target.value
                                        })
                                    }
                                    } />
                                </section>
                                <section className="flex flex-col">
                                    <label htmlFor="">Data Final</label>
                                    <input className="h-7 border border-stone-300 w-40 pl-2" type="date" value={this.state.dataFinalModalAnotacao} onChange={(e) => {
                                        this.setState({
                                            dataFinalModalAnotacao: e.target.value
                                        })
                                    }
                                    } />
                                </section>
                                {this.state.advEscritaCheckbox === true ? <section className="flex flex-col">
                                    <label htmlFor="">Data Adv. Escrita</label>
                                    <input className="h-7 border border-stone-300 w-40 pl-2" type="date" value={this.state.dataAdvEscritaModalAnotacao} onChange={(e) => {
                                        this.setState({
                                            dataAdvEscritaModalAnotacao: e.target.value
                                        })
                                    }
                                    } />
                                </section> : ""}

                            </section>
                        </section>
                    </section>
                    <section>
                        <section className="flex gap-2">

                            <button type="submit" className="bg-white transition-colors border border-stone-300 px-12 h-10 rounded-md cursor-pointer hover:bg-stone-200 flex justify-center items-center font-medium"
                            >
                                Editar Anotação
                            </button>
                            {this.state.status === false ?
                                <button type="button" className={`bg-white transition-colors border border-stone-300 px-12 h-10 rounded-md cursor-pointer  flex justify-center items-center font-medium hover:text-green-400 hover:border-green-400 ${this.state.responsavel.roleSecondary === "COMUM" ? "hidden" : ""}`}
                                    onClick={() => {
                                        this.require.reativarAnotacao(this)
                                    }}
                                >
                                    Reativar
                                </button>
                                :
                                <button type="button" className={`bg-white transition-colors border border-stone-300 px-12 h-10 rounded-md cursor-pointer  flex justify-center items-center font-medium hover:text-red-400 hover:border-red-400 ${this.state.responsavel.roleSecondary === "COMUM" ? "hidden" : ""}`}
                                    onClick={() => {
                                        this.require.desabilitarAnotacao(this)
                                    }}
                                >
                                    Excluir
                                </button>
                            }

                        </section>
                    </section>
                </section>
                <section className="flex flex-col h-full gap-3  w-full">
                    <section className="flex items-center h-full gap-2">
                        <section className="flex flex-col items-end w-44">
                            <section className="flex gap-1">
                                <label>Atestado</label>
                                <input type="checkbox" onChange={() => this.setState({ atestadoCheckBox: this.state.atestadoCheckBox === false ? true : false })} checked={this.state.atestadoCheckBox} />
                            </section>
                            <section className="flex gap-1">
                                <label>Ferias</label>
                                <input type="checkbox" onChange={() => this.setState({ feriasCheckbox: this.state.feriasCheckbox === false ? true : false })} checked={this.state.feriasCheckbox} />
                            </section>
                            <section className="flex gap-1">
                                <label>Faltou</label>
                                <input type="checkbox" onChange={() => this.setState({ faltouCheckbox: this.state.faltouCheckbox === false ? true : false })} checked={this.state.faltouCheckbox} />
                            </section>
                            <section className="flex gap-1">
                                <label>Suspensão</label>
                                <input type="checkbox" onChange={() => this.setState({ suspensaoCheckbox: this.state.suspensaoCheckbox === false ? true : false })} checked={this.state.suspensaoCheckbox} />
                            </section>
                            <section className="flex gap-1">
                                <label>Licença</label>
                                <input type="checkbox" onChange={() => this.setState({ licencaCheckbox: this.state.licencaCheckbox === false ? true : false })} checked={this.state.licencaCheckbox} />
                            </section>
                            <section className="flex gap-1">
                                <label>Atestado Horas</label>
                                <input type="checkbox" onChange={() => this.setState({ atestadoHoraCheckbox: this.state.atestadoHoraCheckbox === false ? true : false })} checked={this.state.atestadoHoraCheckbox} />
                            </section>
                            <section className="flex gap-1">
                                <label>Adv. Escrita</label>
                                <input type="checkbox" onChange={() => this.setState({ advEscritaCheckbox: this.state.advEscritaCheckbox === false ? true : false })} checked={this.state.advEscritaCheckbox} />
                            </section>
                            <section className="flex gap-1">
                                <label>Adv. Verbal</label>
                                <input type="checkbox" onChange={() => this.setState({ advVerbalCheckbox: this.state.advVerbalCheckbox === false ? true : false })} checked={this.state.advVerbalCheckbox} />
                            </section>
                            <section className="flex gap-1">
                                <label>Atraso</label>
                                <input type="checkbox" onChange={() => this.setState({ atrasoCheckbox: this.state.atrasoCheckbox === false ? true : false })} checked={this.state.atrasoCheckbox} />
                            </section>
                        </section>
                        <section className="h-full w-full flex flex-col gap-2">
                            <section className="flex gap-2 w-full justify-evenly">
                                <section className="bg-stone-300 w-fit p-0.5">
                                    <span>
                                        Responsavel: {`${this.state.responsavel.nome} ${this.state.responsavel.sobrenome}`}
                                    </span>
                                </section>
                                <section className="bg-stone-300 w-fit p-1">
                                    <span>
                                        Motivo: {this.state.motivo}
                                    </span>
                                </section>
                            </section>
                            <textarea className="resize-none border border-stone-400 rounded-xl w-full h-5/6 p-3" placeholder="Anotação" value={this.state.anotacaoInput} onChange={(e) => this.setState({ anotacaoInput: e.target.value })}>

                            </textarea>
                        </section>
                    </section>

                </section>
            </form>
        )
    }
}