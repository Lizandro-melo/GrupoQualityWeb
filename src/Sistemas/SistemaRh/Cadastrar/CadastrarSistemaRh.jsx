import { Component } from "react";
import { dataHoje } from "../Anotacoes/Constant/AnotacoesConstant";
import { RequireCadastro } from "./Classes/RequireCadastrar";
import ReactModal from "react-modal";


export default class CadastrarSistemaRh extends Component {

    state = {
        nomeCompleto: "",
        dataNascimento: "",
        empresa: "",
        setor: "",
        dataInicio: dataHoje,
        tipo: "",
        permissaoPrimaria: "",
        permissaoSecundaria: "",
        fotoColaborador: "",
        senha: "",
        comSenha: "",
        mensagemModal: "",
        modalState: false
    }

    require = new RequireCadastro();

    fecharModalMensagem = () => {
        this.setState({
            mensagemModal: null,
            modalState: false
        })
    }

    render() {
        return (
            <section className="w-full">
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
                                    onClick={this.fecharModalMensagem}
                                >
                                    Ok
                                </button>
                            </section>
                        </section>
                    </section>
                </ReactModal>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.require.setColaborador(this)
                }} className="w-full px-20 flex gap-24 justify-center items-center h-full">
                    <section className="w-full flex flex-col gap-4">
                        <section className="flex flex-col">
                            <label className="text-sm" htmlFor="NomeCompleto">Nome Completo</label>
                            <input onChange={(e) => this.setState({ nomeCompleto: e.target.value })} className="w-full h-10 px-2 rounded-lg border border-stone-300 text-sm" type="text" required placeholder="Nome Completo do Colaborador" />
                        </section>
                        <section className="flex flex-col">
                            <label className="text-sm" htmlFor="DataNascimento">Data de Nascimento</label>
                            <input className="w-full h-10 px-2 rounded-lg border border-stone-300 text-sm" type="date" onChange={(e) => this.setState({ dataNascimento: e.target.value })} required />
                        </section>
                        <section className="flex flex-col">
                            <label className="text-sm" htmlFor="Empresa">Empresa</label>
                            <select className="w-full h-10 px-2 rounded-lg border border-stone-300 text-sm" onChange={(e) => {
                                this.setState({ empresa: e.target.value });
                            }}>
                                <option value="x" selected disabled>Empresa</option>
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
                            }}>
                                <option value="x" selected disabled>Setor</option>
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
                            <label className="text-sm" htmlFor="">Tipo de Colaborador</label>
                            <select className="w-full h-10 px-2 rounded-lg border border-stone-300 text-sm" onChange={(e) => {
                                this.setState({ tipo: e.target.value })
                            }}>
                                <option value="x" selected disabled>Tipos</option>
                                <option value="CONTRATADO">Contratado</option>
                                <option value="ESTAGIARIO">Estagiário</option>
                            </select>
                        </section>
                    </section>
                    <section className="w-full flex flex-col gap-4">
                        <section className="flex flex-col">
                            <label className="text-sm" htmlFor="">Permissão Primaria</label>
                            <select className="w-full h-10 px-2 rounded-lg border border-stone-300 text-sm" onChange={(e) => {
                                this.setState({
                                    permissaoPrimaria: e.target.value
                                })
                            }}>
                                <option value="x" selected disabled>Primeira Permissão</option>
                                <option value="MASTER">Master</option>
                                <option value="RH">RH</option>
                                <option value="ESTOQUE">Estoque</option>
                            </select>
                        </section>
                        <section className="flex flex-col">
                            <label className="text-sm" htmlFor="">Permissão Secundaria</label>
                            <select className="w-full h-10 px-2 rounded-lg border border-stone-300 text-sm" onChange={(e) => {
                                this.setState({ permissaoSecundaria: e.target.value })
                            }}>
                                <option value="x" selected disabled>Segunda Permissão</option>
                                <option value="MASTER">Master</option>
                                <option value="COMUM">Comum</option>
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
                            }} required />
                        </section>
                        <section className="flex flex-col">
                            <label className="text-sm" htmlFor="">Confirmar Senha</label>
                            <input onChange={(e) => {
                                this.setState({ comSenha: e.target.value })
                            }} required className="w-full h-10 px-2 rounded-lg border border-stone-300 text-sm" type="password" placeholder="Confirme a senha" />
                        </section>
                        <button type="submit" className="hover:bg-stone-100 active:scale-90 mt-5 h-11 border w-56 bg-white border-stone-400 rounded-lg">
                            Cadastrar Colaborador
                        </button>
                    </section>
                </form>
            </section>
        )
    }
}