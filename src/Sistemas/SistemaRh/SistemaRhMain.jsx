import { Component } from "react";
import iconAnotar from "../../img/icon/anotar.png"
import iconAddFuncionario from "../../img/icon/addFuncionario.png"
import iconAtualizar from "../../img/icon/atualizar.png"
import iconFiltro from "../../img/icon/filtro.png"

export default class SistemaRhMain extends Component {

    state = {
        foto: ""
    }

    render() {
        return (
            <section className="kanit flex h-full bg-slate-100">
                <section className=" coluna-nav h-full flex flex-col items-center gap-3">
                    <button className="mt-3 w-11 h-11 bg-slate-100 flex justify-start items-center rounded-xl overflow-hidden pl-2.5 gap-10 group/icons">
                        <img src={iconAnotar}
                            className="w-6" alt="anotação"
                            title="Adicionar uma anotação " />
                        <span className="absolute left-11 flex items-center rounded-e-xl px-10 h-11 bg-slate-100 font-bold scale-0 group-hover/icons:scale-100 transition-transform">Nova Anotação</span>
                    </button>
                    <button className=" w-11 h-11 bg-slate-100 flex justify-start items-center rounded-xl overflow-hidden pl-2.5 gap-10 group/icons">
                        <img src={iconAddFuncionario}
                            className="w-6" alt="anotação"
                            title="Adicionar uma anotação " />
                        <span className="absolute left-11 flex items-center rounded-e-xl px-10 h-11 bg-slate-100 font-bold scale-0 group-hover/icons:scale-100 transition-transform">Novo Colaborador</span>
                    </button>
                    <button className=" w-11 h-11 bg-slate-100 flex justify-start items-center rounded-xl overflow-hidden pl-2.5 gap-10 group/icons">
                        <img src={iconAtualizar}
                            className="w-6" alt="anotação"
                            title="Adicionar uma anotação " />
                        <span className="absolute left-11 flex items-center rounded-e-xl px-10 h-11 bg-slate-100 font-bold scale-0 group-hover/icons:scale-100 transition-transform">Atualizar</span>
                    </button>
                </section>
                <section className="p-5 flex w-full gap-28">
                    <section className="flex flex-col w-full">
                        <section className="bg-white flex justify-start gap-3 items-center p-5 rounded-2xl border-b-4 border-green-300">
                            <img className={`w-28 h-28 rounded-xl ${this.state.foto === "" ? "bg-slate-400" : ""}`} src={this.state.foto} alt="" />
                            <section className="flex flex-col text-sm">
                                <span className="font-semibold">Nome: José Lizandro Eufrasio de Melo</span>
                                <span className="font-semibold">Cargo: Técnico de Informática</span>
                                <span className="font-semibold">Empresa: Qualy Lab</span>
                                <span className="font-semibold">Contratado(a): 28/07/2023</span>
                                <span className="font-semibold">Estado: Ativo</span>
                            </section>
                        </section>
                        <section>
                            <section
                                className="flex flex-col mt-10"
                            >
                                <label htmlFor="Colaboradores" className="text-xs font-bold">Colaboradores</label>
                                <select
                                    className="border border-stone-400 w-80 bg-white h-9 text-sm"
                                >
                                    <option value="e">Colaboradores</option>
                                </select>
                            </section>
                            <section className="flex my-5">
                                <img src={iconFiltro} alt="filtro" />
                                <span className="font-bold">Filtro</span>
                            </section>
                            <section className="flex flex-col gap-4">
                                <section className="flex flex-col">
                                    <label htmlFor="Colaboradores" className="text-xs font-bold">Data de Inicio</label>
                                    <input
                                        type="date"
                                        className="border border-stone-400 w-80 bg-white h-9 text-sm"
                                    />
                                </section>
                                <section className="flex flex-col">
                                    <label htmlFor="Colaboradores" className="text-xs font-bold">Data de Inicio</label>
                                    <input
                                        type="date"
                                        className="border border-stone-400 w-80 bg-white h-9 text-sm"
                                    />
                                </section>
                                <section className="flex flex-col">
                                    <label htmlFor="Colaboradores" className="text-xs font-bold">Tipo de Ocorrência</label>
                                    <select
                                        className="border border-stone-400 w-80 bg-white h-9 text-sm"
                                    >
                                        <option value="e">Ocorrência</option>
                                    </select>
                                </section>
                                <section>
                                    <button className="bg-stone-100 transition-colors border border-stone-500 px-12 h-10 rounded-md cursor-pointer hover:bg-stone-200 flex justify-center items-center font-semibold">
                                        Procurar
                                    </button>
                                </section>
                            </section>
                        </section>
                    </section>
                    <section className="flex w-full h-full">
                        <section className="w-full h-full bg-white border rounded-xl border-stone-400 relative">
                            <span className="absolute top-4 left-5 text-slate-500 text-sm">Anotações</span>
                            <section>

                            </section>
                        </section>
                    </section>
                </section>
            </section>

        )
    }
}