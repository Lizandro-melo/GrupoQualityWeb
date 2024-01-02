import axios, { Axios } from "axios";
import {
  dataHoje,
  formatarData,
} from "../../Anotacoes/Constant/AnotacoesConstant";
import {
  diaNascimneto,
  mesNascimento,
  primeiroUltimoNome,
} from "../../Cadastrar/Constants";
import Cookies from "js-cookie";

export class RequireAtualizar {
  getDadosColaborador(obj, idColaborador) {
    axios
      .post(`https://qualityserver12:8081/rh/colaboradores/id?id=${idColaborador}`)
      .then((element) => {
        const colaborador = element.data;
        this.salvarColaborador(colaborador);
        let dataInicio = null;
        let dataDemissao = null;
        switch (colaborador.tipo) {
          case "CONTRATADO":
            dataInicio = colaborador.dataAdmissao;
            if (colaborador.dataDemissao === null) {
              dataDemissao = "";
            } else {
              dataDemissao = colaborador.dataDemissao;
            }
            break;
          case "ESTAGIARIO":
            dataInicio = colaborador.estagiario.dataAdmissao;
            if (colaborador.estagiario.dataDemissao === null) {
              dataDemissao = "";
            } else {
              dataDemissao = colaborador.estagiario.dataDemissao;
            }
            break;
          default:
            dataDemissao = colaborador.dataDemissao;
            dataInicio = colaborador.dataAdmissao;
        }

        obj.setState({
          nomeCompleto: colaborador.nomeCompleto,
          empresa: colaborador.empresa.idEmpresa,
          setor: colaborador.setor === null ? "" : colaborador.setor.idSetor,
          tipo: colaborador.tipo,
          dataInicio: dataInicio,
          dataDemissao: dataDemissao,
          dataNascimento: colaborador.dataNascimento,
          situacao: colaborador.status === false ? "Desligado" : "Ativo",
        });
        axios
          .post(
            `https://qualityserver12:8081/intranet/colaborador/nome?nome=${colaborador.nome.toLowerCase()}`
          )
          .then((element) => {
            const colaborador = element.data[0];
            if (colaborador === undefined) {
              return;
            }
            obj.setState({
              permissaoPrimaria:
                colaborador.rolePrimary === undefined
                  ? null
                  : colaborador.rolePrimary,
              permissaoSecundaria:
                colaborador.roleSecondary === undefined
                  ? null
                  : colaborador.roleSecondary,
              senha: colaborador.senha,
              comSenha: colaborador.senha,
            });
          });
      });
  }

  verificarCampos(obj) {
    const reactObj = obj.state;
    let estado = false;
    if (reactObj.colaborador === "") {
      obj.setState({
        mensagemModal: "Selecione um Colaborador",
        modalState: true,
      });
      estado = true;
    }
    if (reactObj.senha !== reactObj.comSenha) {
      obj.setState({
        mensagemModal: "Senhas Diferentes",
        modalState: true,
      });
      estado = true;
    }
    if (
      obj.state.senha === "" ||
      obj.state.comSenha === "" ||
      obj.state.dataNascimento === "" ||
      obj.state.empresa === "" ||
      obj.state.setor === "" ||
      obj.state.tipo === "" ||
      obj.state.permissaoPrimaria === "" ||
      obj.state.permissaoSecundaria === ""
    ) {
      obj.setState({
        mensagemModal: "Há campos não preenchidos",
        modalState: true,
      });
      estado = true;
    }
    return estado;
  }

  async contratarEstagiario(obj) {
    const colaborador = JSON.parse(localStorage.getItem("colaborador"));
    const reactObj = obj.state;
    if (reactObj.tipo === "CONTRATADO") {
      obj.setState({
        mensagemModal: "Colaborador já está Contratado",
        modalState: true,
      });
      return;
    }

    axios
      .put(
        `https://qualityserver12:8081/rh/contratar/estagiario?id=${colaborador.idColaborador}&data=${dataHoje}`
      )
      .then((response) => response.data.nome);
    obj.setState({
      mensagemModal: "Colaborador contratado com sucesso!",
      modalState: true,
    });
  }

  async desligarColaborador(obj) {
    const colaborador = JSON.parse(localStorage.getItem("colaborador"));
    const user = JSON.parse(Cookies.get("user"));
    const reactObj = obj.state;
    if (reactObj.situacao === "Desligado") {
      obj.setState({
        mensagemModal: "Colaborador já está Desligado",
        modalState: true,
      });
      return;
    }
    axios
      .put(
        `https://qualityserver12:8081/rh/colaborador/desligar?id=${
          colaborador.idColaborador
        }&data=${dataHoje}&responsavel=${user.nome} ${
          user.sobrenome
        }&demissaoString=${formatarData(
          dataHoje
        )}&nomeintra=${colaborador.nome.toLowerCase()}`
      )
      .then((response) => response.data.nome);
    obj.setState({
      mensagemModal: "Colaborador Desligado com sucesso!",
      modalState: true,
    });
  }

  async reativarColaborador(obj) {
    const colaborador = JSON.parse(localStorage.getItem("colaborador"));
    const user = JSON.parse(Cookies.get("user"));
    const reactObj = obj.state;
    if (reactObj.situacao !== "Desligado") {
      obj.setState({
        mensagemModal: "Colaborador já está Ativado",
        modalState: true,
      });
      return;
    }
    axios
      .put(
        `https://qualityserver12:8081/rh/colaborador/reativar?id=${
          colaborador.idColaborador
        }&responsavel=${user.nome} ${
          user.sobrenome
        }&nomeintra=${colaborador.nome.toLowerCase()}`
      )
      .then((response) => response.data.nome);
    obj.setState({
      mensagemModal: "Colaborador Ativado com sucesso!",
      modalState: true,
    });
  }

  async updateColaborador(obj) {
    const colaborador = JSON.parse(localStorage.getItem("colaborador"));
    const user = JSON.parse(Cookies.get("user"));

    const setor = await axios
      .get(`https://qualityserver12:8081/rh/setor/id?id=${obj.state.setor}`)
      .then((response) => response.data.nome);

    const empresa = await axios
      .get(`https://qualityserver12:8081/rh/empresas/id?id=${obj.state.empresa}`)
      .then((response) => response.data.nome);

    const colaboradorIntra = {
      login: primeiroUltimoNome(obj.state.nomeCompleto).toLowerCase(),
      senha: obj.state.senha,
      foto: `/intranet/views/foto-funcionarios/${primeiroUltimoNome(
        obj.state.nomeCompleto
      )}.png`,
      empresa: empresa,
      dia: diaNascimneto(obj.state.dataNascimento),
      mes: mesNascimento(obj.state.dataNascimento),
      rolePrimary: obj.state.permissaoPrimaria,
      roleSecondary: obj.state.permissaoSecundaria,
      tipo: obj.state.tipo,
      setor: setor,
    };

    const colaboradorRh = {
      idColaborador: colaborador.idColaborador,
      tipo: colaborador.tipo,
    };

    switch (obj.state.tipo) {
      case "CONTRATADO":
        axios.put(
          `https://qualityserver12:8081/rh/colaboradores/update/contratado?setor=${
            obj.state.setor
          }&empresa=${obj.state.empresa}&dataNascimento=${
            obj.state.dataNascimento
          }&dataInicio=${obj.state.dataInicio}&dataDemissao=${
            obj.state.dataDemissao
          }&demissaostring=${formatarData(
            obj.state.dataDemissao
          )}&responsavel=${user.nome} ${user.sobrenome}`,
          colaboradorRh
        );
        break;
      case "ESTAGIARIO":
        axios.put(
          `https://qualityserver12:8081/rh/colaboradores/update/estagiario?setor=${
            obj.state.setor
          }&empresa=${obj.state.empresa}&dataNascimento=${
            obj.state.dataNascimento
          }&dataInicio=${obj.state.dataInicio}&dataDemissao=${
            obj.state.dataDemissao
          }&demissaostring=${formatarData(
            obj.state.dataDemissao
          )}&responsavel=${user.nome} ${user.sobrenome}`,
          colaboradorRh
        );
        break;
      default:
        break;
    }

    axios.put(
      `https://qualityserver12:8081/rh/colaboradores/intranet/update?dataInicio=${formatarData(
        obj.state.dataInicio
      )}`,
      colaboradorIntra
    );
    obj.setState({
      mensagemModal: "Colaborador Atualizado!",
      modalState: true,
    });
  }

  salvarColaborador(colaborador) {
    let dataAdmissao = colaborador.dataAdmissao;
    let dataDemissao = colaborador.dataDemissao;
    let dataNascimento = colaborador.dataNascimento;
    let setor =
      colaborador.setor === null ? "Não registrado" : colaborador.setor.nome;

    switch (dataAdmissao) {
      case null:
        dataAdmissao = colaborador.estagiario.dataAdmissao;
        dataAdmissao = dataAdmissao.split("-");
        dataAdmissao = `${dataAdmissao[2]}/${dataAdmissao[1]}/${dataAdmissao[0]}`;
        break;

      default:
        dataAdmissao = dataAdmissao.split("-");
        dataAdmissao = `${dataAdmissao[2]}/${dataAdmissao[1]}/${dataAdmissao[0]}`;
        break;
    }

    switch (dataDemissao) {
      case null:
        dataDemissao = "Não registrado";
        break;

      default:
        dataDemissao = colaborador.dataDemissao;
        dataDemissao = dataDemissao.split("-");
        dataDemissao = `${dataDemissao[2]}/${dataDemissao[1]}/${dataDemissao[0]}`;
        break;
    }

    switch (dataNascimento) {
      case null:
        dataNascimento = "Não registrado";
        break;

      default:
        dataNascimento = formatarData(colaborador.dataNascimento);
        break;
    }

    const colaboradorResponse = {
      idColaborador: colaborador.idColaborador,
      nome: colaborador.nome,
      nomeCompleto: colaborador.nomeCompleto,
      dataAdmissao: dataAdmissao,
      dataDemissao: dataDemissao,
      setor: setor,
      empresa: colaborador.empresa.nome,
      tipo: colaborador.tipo,
      foto: `foto-funcionarios/${colaborador.nome}.png`,
      dataNascimento: dataNascimento,
    };

    localStorage.setItem("colaborador", JSON.stringify(colaboradorResponse));
  }
}
