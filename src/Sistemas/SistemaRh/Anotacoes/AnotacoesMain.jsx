import { Component } from "react";
import iconFiltro from "../../../img/icon/filtro.png"

export default class AnotacoesMain extends Component {

    state = {
        foto: "",
        inputSelectColaborador: ""
    }

    render() {
        return (
            <section className="flex gap-5 w-full">
                <section className="flex  flex-col w-full">
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
                            className="flex flex-col mt-7"
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
        )
    }
}