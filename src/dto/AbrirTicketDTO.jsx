export default class AbrirTicketDTO {
  nome;
  setor;
  dataHora;
  os;
  status;

  constructor(user, dataHoje, mensagem) {
    this.nome = `${user.nome} ${user.sobrenome}`;
    this.setor = user.setor;
    this.dataHora = dataHoje;
    this.os = mensagem;
    this.status = "ABERTO";
  }
}