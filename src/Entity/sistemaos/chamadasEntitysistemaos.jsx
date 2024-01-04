export default class ChamadasEntitysistemaos {
    id;
    nome;
    setor;
    dataHora;
    os;
    status;
    responsavel;
    enderecoArquivo;
    enderecoArquivoFinalizado;

    constructor(ticket) {
        this.id = ticket.id;
        this.nome = ticket.nome;
        this.setor = ticket.setor;
        this.dataHora = ticket.dataHora;
        this.os = ticket.os;
        this.status = ticket.status;
        this.responsavel = ticket.responsavel;
        this.enderecoArquivo = ticket.enderecoArquivo;
        this.enderecoArquivoFinalizado = ticket.enderecoArquivoFinalizado;
    }
}
