import { Component } from "react";
import { RelatoriosController } from "./Controller/RelatoriosController";
import {
  dataHoje,
  dataInicialDefault,
} from "../Anotacoes/Constant/AnotacoesConstant";
import Cookies from "js-cookie";

export default function Relatorios(){
  return(
    <>
      Relatorios
    </>
  )
}

// export default class RelatoriosMain extends Component {
//   dados = JSON.parse(localStorage.getItem("dados"));
//   state = {
//     colaboradoresList:
//       localStorage.getItem("listColaboradoresRh") === null
//         ? []
//         : JSON.parse(localStorage.getItem("listColaboradoresRh")),
//     filtroColaborador:
//       Cookies.get("filtroRhColaborador") === null
//         ? ""
//         : Cookies.get("filtroRhColaborador"),
//     dataFinal:
//       localStorage.getItem("dataFinal") === null
//         ? dataHoje
//         : localStorage.getItem("dataFinal"),
//     dataInicial:
//       localStorage.getItem("dataInicio") === null
//         ? dataHoje
//         : localStorage.getItem("dataInicio"),
//     foto: "",
//     colaborador:
//       localStorage.getItem("colaborador") === null
//         ? {
//             idColaborador: "",
//             nome: "",
//             nomeCompleto: "",
//             dataAdmissao: "",
//             dataDemissao: "",
//             setor: "",
//             empresa: "",
//             tipo: "",
//             foto: "",
//             dataNascimento: "",
//           }
//         : JSON.parse(localStorage.getItem("colaborador")),
//     bancoHoras: this.dados === null ? 0 : this.dados.bancoHoras,
//     bancoPositivo: this.dados === null ? 0 : this.dados.bancoPositivo,
//     bancoNegativo: this.dados === null ? 0 : this.dados.bancoNegativo,
//     selectCol: "",
//   };

//   require = new RelatoriosController();

//   componentDidMount = () => {
//     this.setState({
//       selectCol: this.state.colaborador.idColaborador,
//     });
//     this.require.getColaboradorDados(this, this.state.colaborador.idColaborador);
//     localStorage.setItem("dataFinal", dataHoje);
//     localStorage.setItem("dataInicio", dataHoje);
//     this.setState({
//       selectCol: this.state.colaborador.idColaborador
//     })
//   };

//   render() {
//     return (
//       <main className="p-10 h-full w-full flex justify-center items-center">
//         <section className=" bg-white rounded-lg shadow-xl flex flex-col justify-around h-full w-full items-center">
//           <section className="flex flex-col gap-4 justify-center items-center">
//             <section
//               className={`bg-white w-96 flex justify-center gap-3 items-center rounded-2xl`}
//             >
//               <img
//                 className={`w-20 h-20 rounded-xl ${
//                   this.state.colaborador.foto === "" ? "bg-slate-400" : ""
//                 }`}
//                 src={this.state.colaborador.foto}
//                 alt=""
//               />
//               <section className="flex flex-col text-xs">
//                 <span className="font-semibold">
//                   Nome: {this.state.colaborador.nomeCompleto}
//                 </span>
//                 <span className="font-semibold">
//                   Setor: {this.state.colaborador.setor}
//                 </span>
//                 <span className="font-semibold">
//                   Empresa: {this.state.colaborador.empresa}
//                 </span>
//                 <span className="font-semibold">
//                   Contratado(a): {this.state.colaborador.dataAdmissao}
//                 </span>
//                 {this.state.colaborador.tipo === "DESLIGADO" ? (
//                   <span className="font-semibold">
//                     Desligado: {this.state.colaborador.dataDemissao}
//                   </span>
//                 ) : null}
//                 <span className="font-semibold">
//                   Tipo: {this.state.colaborador.tipo}
//                 </span>
//               </section>
//             </section>
//             <section className="flex flex-col gap-2">
//               <label htmlFor="Colaboradores" className="text-xs font-bold">
//                 Colaboradores
//               </label>
//               <select
//                 value={this.state.selectCol}
//                 className="border border-stone-300 px-2 w-80 max-lg:w-52 bg-white h-8 text-sm"
//                 onChange={(e) => {
//                   this.setState({
//                     selectCol: e.target.value,
//                   });
//                   if (e.target.value === "Todos") {
//                     this.require.getColaboradorDadosAll(
//                       this,
//                       this.state.dataInicial,
//                       this.state.dataFinal
//                     );
//                     return;
//                   }
//                   this.require.getColaboradorDados(this, e.target.value);
//                 }}
//               >
//                 <option value="" disabled selected>
//                   {this.state.colaborador.nomeCompleto === undefined
//                     ? this.state.filtroColaborador
//                     : this.state.colaborador.nomeCompleto}
//                 </option>
//                 <option value="Todos">TODOS OS CONTRATADOS</option>
//                 {this.state.colaboradoresList.map((colaborador) => {
//                   return (
//                     <option
//                       key={colaborador.idColaborador}
//                       value={colaborador.idColaborador}
//                     >
//                       {colaborador.nomeCompleto}
//                     </option>
//                   );
//                 })}
//               </select>
//             </section>
//             <section className="flex flex-col gap-4">
//               <section className="flex flex-col gap-2">
//                 <label htmlFor="Colaboradores" className="text-xs font-bold">
//                   Data de Inicio
//                 </label>
//                 <input
//                   type="date"
//                   value={this.state.dataInicial}
//                   onChange={(e) => {
//                     localStorage.setItem("dataInicio", e.target.value);
//                     this.setState({
//                       dataInicial: e.target.value,
//                     });
//                     if (this.state.selectCol === "Todos") {
//                       this.require.getColaboradorDadosAll(
//                         this,
//                         this.state.dataInicial,
//                         this.state.dataFinal
//                       );
//                       return;
//                     }
//                     this.require.getColaboradorDados(
//                       this,
//                       this.state.selectCol
//                     );
//                   }}
//                   className="border border-stone-300 px-2 w-80 max-lg:w-52 bg-white h-8 text-sm"
//                 />
//               </section>
//               <section className="flex flex-col gap-2">
//                 <label htmlFor="Colaboradores" className="text-xs font-bold">
//                   Data de Final
//                 </label>
//                 <input
//                   type="date"
//                   value={this.state.dataFinal}
//                   onChange={(e) => {
//                     localStorage.setItem("dataFinal", e.target.value);
//                     this.setState({
//                       dataFinal: e.target.value,
//                     });
//                     if (this.state.selectCol === "Todos") {
//                       this.require.getColaboradorDadosAll(
//                         this,
//                         this.state.dataInicial,
//                         this.state.dataFinal
//                       );
//                       return;
//                     }
                    
//                     this.require.getColaboradorDados(
//                       this,
//                       this.state.selectCol
//                     );
//                   }}
//                   className="border border-stone-300  px-2 w-80 max-lg:w-52 bg-white h-8 text-sm"
//                 />
//               </section>
//             </section>
//           </section>
//           <section className="flex gap-4">
//             <button
//               onClick={() => {
//                 if (this.state.selectCol === "Todos") {
//                   window.location.href = "/relatorio/all";
//                   return;
//                 }
//                 window.location.href = "/relatorio/individual";
//               }}
//               className="bg-white transition-colors border border-stone-300 px-12 h-10 rounded-md cursor-pointer hover:bg-stone-200 flex justify-center items-center font-medium"
//             >
//               Relatório Banco de Horas
//             </button>
//             <button
//               onClick={() => {
//                 window.location.href = "/relatorio/geral";
//               }}
//               className="bg-white transition-colors border border-stone-300 px-12 h-10 rounded-md cursor-pointer hover:bg-stone-200 flex justify-center items-center font-medium"
//             >
//               Relatório Geral
//             </button>
//           </section>
//         </section>
//       </main>
//     );
//   }
// }
