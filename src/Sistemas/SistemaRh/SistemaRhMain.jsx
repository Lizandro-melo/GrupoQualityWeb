import { Component } from "react";
import iconAnotar from "../../img/icon/anotar.png"
import iconAddFuncionario from "../../img/icon/addFuncionario.png"
import iconAtualizar from "../../img/icon/atualizar.png"

import AnotacoesMain from "./Anotacoes/AnotacoesMain";

export default class SistemaRhMain extends Component {

    

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
                <section className="p-5 h-full flex w-full">
                    <AnotacoesMain />
                </section>
            </section>

        )
    }
}