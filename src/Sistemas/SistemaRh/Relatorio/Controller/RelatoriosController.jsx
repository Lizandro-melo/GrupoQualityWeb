import axios from "axios";
import { formatarData } from "../../Anotacoes/Constant/AnotacoesConstant";
import { RequisicaoAnotacao } from "../../Anotacoes/Classes/RequisicaoAnotacao";

export class RelatoriosController {
  requireAnotacao = new RequisicaoAnotacao();

  getAllColabordoresNome(obj) {
    axios
      .post("https://qualityserver12:8081/rh/colaboradores/contratados/ativos")
      .then((response) => {
        const colaboradores = response.data;
        const ordenAlfabetica = colaboradores.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        obj.setState({
          colaboradoresList: ordenAlfabetica,
        });
        localStorage.setItem(
          "listColaboradoresRh",
          JSON.stringify(ordenAlfabetica)
        );
        return;
      })
      .catch(() => {
        console.log("error getColaboradoresAtivos");
        obj.setState({
          colaboradoresList: [],
        });
        return;
      });
  }

  getColaboradorDadosAll(obj, dataIncial, dataFinal) {
    obj.setState({
      colaborador: {
        nomeCompleto: "Todos os Colaboradores",
        foto: `foto-funcionarios/todos.png`,
      },
    });

    let list = [];
    let colaboradorReg = {
      nomeCompleto: "",
      dataAdmissao: "",
      dataInicial: "",
      dataFinal: "",
      bancoHoras: 0,
      bancoNegativo: 0,
      bancoPositivo: 0,
    };

    obj.state.colaboradoresList.map((colaborador) => {
      axios
        .get(
          `https://qualityserver12:8081/rh/colaborador/soma?id=${
            colaborador.idColaborador
          }&inicio=${localStorage.getItem(
            "dataInicio"
          )}&fim=${localStorage.getItem("dataFinal")}`
        )
        .then((response) => {
          let cal = response.data;
          colaboradorReg.nomeCompleto = colaborador.nomeCompleto;
          colaboradorReg.dataAdmissao = colaborador.dataAdmissao;
          colaboradorReg.dataInicial = localStorage.getItem("dataInicio");
          colaboradorReg.dataFinal = localStorage.getItem("dataFinal");
          colaboradorReg.bancoHoras = cal.bancoHoras;
          colaboradorReg.bancoNegativo = cal.bancoNegativo;
          colaboradorReg.bancoPositivo = cal.bancoPositivo;
          list.push(colaboradorReg);
          colaboradorReg = {
            nomeCompleto: "",
            dataAdmissao: "",
            dataInicial: "",
            dataFinal: "",
            bancoHoras: 0,
            bancoNegativo: 0,
            bancoPositivo: 0,
          };
        });
    });
    setTimeout(() => {
      localStorage.setItem("listAllRelatorio", JSON.stringify(list));
    }, 400);
  }

  getColaboradorDados(obj, idColaborador) {
    axios
      .post(`https://qualityserver12:8081/rh/colaboradores/id?id=${idColaborador}`)
      .then((response) => {
        const colaborador = response.data;
        let dataAdmissao = colaborador.dataAdmissao;
        let dataDemissao = colaborador.dataDemissao;
        let dataNascimento = colaborador.dataNascimento;
        let setor =
          colaborador.setor === null
            ? "Não registrado"
            : colaborador.setor.nome;

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

        localStorage.setItem(
          "colaborador",
          JSON.stringify(colaboradorResponse)
        );
        obj.setState({
          colaborador: colaboradorResponse,
        });

        this.getAnotacao(
          idColaborador,
          obj.state.dataInicial,
          obj.state.dataFinal
        );
        this.getDadosIndividual(obj);
      })
      .catch(() => {
        console.log("Error colaborador null");
        obj.setState({
          colaborador: "",
        });
        return;
      });
  }

  getDadosIndividual(obj) {
    let list = [];
    let colaboradorReg = {
      nomeCompleto: "",
      dataAdmissao: "",
      dataInicial: "",
      dataFinal: "",
      bancoHoras: 0,
      bancoNegativo: 0,
      bancoPositivo: 0,
    };
    const colaborador = JSON.parse(localStorage.getItem("colaborador"));

    axios
      .get(
        `https://qualityserver12:8081/rh/colaborador/soma?id=${
          colaborador.idColaborador
        }&inicio=${localStorage.getItem(
          "dataInicio"
        )}&fim=${localStorage.getItem("dataFinal")}`
      )
      .then((response) => {
        let cal = response.data;
        colaboradorReg.nomeCompleto = colaborador.nomeCompleto;
        colaboradorReg.dataAdmissao = colaborador.dataAdmissao;
        colaboradorReg.dataInicial = localStorage.getItem("dataInicio");
        colaboradorReg.dataFinal = localStorage.getItem("dataFinal");
        colaboradorReg.bancoHoras = cal.bancoHoras;
        colaboradorReg.bancoNegativo = cal.bancoNegativo;
        colaboradorReg.bancoPositivo = cal.bancoPositivo;
        list.push(colaboradorReg);
        colaboradorReg = {
          nomeCompleto: "",
          dataAdmissao: "",
          dataInicial: "",
          dataFinal: "",
          bancoHoras: 0,
          bancoNegativo: 0,
          bancoPositivo: 0,
        };
      });

    setTimeout(() => {
      localStorage.setItem("relatorioIdividual", JSON.stringify(list[0]));
    }, 400);
  }
  getAnotacao(idColaborador, dataIncio, dataFinal) {
    const colaborador = JSON.parse(localStorage.getItem("colaborador"));
    axios
      .post(
        `https://qualityserver12:8081/rh/anotacao/id?id=${idColaborador}&inicio=${dataIncio}&fim=${dataFinal}&tipo=${colaborador.tipo}`
      )
      .then((response) => {
        if (response.data === null) {
          localStorage.setItem("anotacoesList", null);
        }

        const anotacoes = response.data.map((anotacao) => {
          let dataFinalFormatada = formatarData(anotacao.dataFinal);
          let dataInicioFormatada = formatarData(anotacao.dataInicio);
          anotacao.dataFinal = dataFinalFormatada;
          anotacao.dataInicio = dataInicioFormatada;
          return anotacao;
        });
        localStorage.setItem("anotacoesList", JSON.stringify(anotacoes));
        this.calcularAnotacoes(anotacoes);
        return;
      })
      .catch((err) => {
        console.log("error em puxar as anotaçoes do colaborador referente");
      });
  }

  calcularAnotacoes = (anotacoes) => {
    let list = {
      bancoHoras: 0,
      horaExtra: 0,
      bancoPositivo: 0,
      bancoNegativo: 0,
      faltas: 0,
      licenca: 0,
      suspensao: 0,
      atestadoHora: 0,
      advsEscritas: 0,
      advsVerbais: 0,
      atrasoInt: 0,
      ferias: 0,
      atrasoQuan: 0,
    };
    anotacoes.map((anotacao) => {
      if (anotacao.status === false) {
        return;
      }
      list = {
        bancoHoras: (list.bancoHoras +=
          anotacao.bancoPositivo - anotacao.bancoNegativo),
        horaExtra: (list.horaExtra += anotacao.horaExtra),
        bancoPositivo: (list.bancoPositivo += anotacao.bancoPositivo),
        bancoNegativo: (list.bancoNegativo += anotacao.bancoNegativo),

        faltas: anotacao.faltou === true ? ++list.faltas : (list.faltas += 0),
        atestadoHora:
          anotacao.atestadoHora === true
            ? ++list.atestadoHora
            : (list.atestadoHora += 0),
        suspensao:
          anotacao.suspensao === true
            ? ++list.suspensao
            : (list.suspensao += 0),
        advsEscritas:
          anotacao.advertenciaEscrita === true
            ? ++list.advsEscritas
            : (list.advsEscritas += 0),
        advsVerbais:
          anotacao.advertenciaVerbal === true
            ? ++list.advsVerbais
            : (list.advsVerbais += 0),
        atrasoInt: (list.atrasoInt += anotacao.atrasoInt),
        ferias: anotacao.ferias === true ? ++list.ferias : (list.ferias += 0),
        atrasoQuan:
          anotacao.atraso === true ? ++list.atrasoQuan : (list.atrasoQuan += 0),
      };
    });
    localStorage.setItem("relatorioGeral", JSON.stringify(list))
  };
}
