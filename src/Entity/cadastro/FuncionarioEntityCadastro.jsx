export default class FuncionarioEntityCadastro{
    idFuncionario;
    nome;
    sobrenome;
    setor;
    login;
    senha;
    status;
    nivel;
    foto;
    empresa;
    dia;
    mes;
    admissao;
    rolePrimary
    roleSecundary
    adm
    tipo
    
    constructor(funcionarioEntityCadastro){
        this.idFuncionario = funcionarioEntityCadastro.idFuncionario;
        this.nome = funcionarioEntityCadastro.nome;
        this.sobrenome = funcionarioEntityCadastro.sobrenome;
        this.setor = funcionarioEntityCadastro.setor;
        this.login = funcionarioEntityCadastro.login;
        this.senha = funcionarioEntityCadastro.senha;
        this.status = funcionarioEntityCadastro.status;
        this.nivel = funcionarioEntityCadastro.nivel;
        this.foto = funcionarioEntityCadastro.foto;
        this.empresa = funcionarioEntityCadastro.empresa;
        this.dia = funcionarioEntityCadastro.dia;
        this.mes = funcionarioEntityCadastro.mes;
        this.admissao = funcionarioEntityCadastro.admissao;
        this.rolePrimary = funcionarioEntityCadastro.rolePrimary;
        this.roleSecundary = funcionarioEntityCadastro.roleSecundary;
        this.adm = funcionarioEntityCadastro.adm;
        this.tipo = funcionarioEntityCadastro.tipo;
    }
}


