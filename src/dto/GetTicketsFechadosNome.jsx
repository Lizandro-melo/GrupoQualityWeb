export default class GetTicketFechados {
  nome;
  dataHora;

  constructor(user, dataHoje) {
    this.nome = `${user.nome} ${user.sobrenome}`;
    this.dataHora = dataHoje;
  }
}
