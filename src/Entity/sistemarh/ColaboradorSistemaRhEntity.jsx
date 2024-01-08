export default class ColaboradorSistemaRhEntity {
  idColaborador;
  nome;
  dataNascimento;
  nomecompleto;
  tipo;
  dataDemissao;
  dataAdmissao;
  setor = {
    idSetor: "",
    nome: "",
  };
  empresa = {
    idEmpresa: "",
    nome: "",
  };
  estagiario = {
    dataAdmissao: "",
    dataDemissao: "",
    status: null,
  };
  status;
}
