import axios from "axios";
import { formatarData } from "../../Anotacoes/Constant/AnotacoesConstant";
import { RequisicaoAnotacao } from "../../Anotacoes/Classes/RequisicaoAnotacao";

export class RelatoriosController {
  requireAnotacao = new RequisicaoAnotacao();

  getAllColabordoresNome(obj) {
    axios
      .post("https://localhost:8081/rh/colaboradores/contratados/ativos")
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
          `https://localhost:8081/rh/colaborador/soma?id=${colaborador.idColaborador}&inicio=${dataIncial}&fim=${dataFinal}`
        )
        .then((response) => {
          let cal = response.data;
          colaboradorReg.nomeCompleto = colaborador.nomeCompleto;
          colaboradorReg.dataAdmissao = colaborador.dataAdmissao;
          colaboradorReg.dataInicial = dataIncial;
          colaboradorReg.dataFinal = dataFinal;
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
      .post(`https://localhost:8081/rh/colaboradores/id?id=${idColaborador}`)
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
          colaborador: JSON.parse(localStorage.getItem("colaborador")),
        });

        this.getAnotacao(
          obj,
          colaboradorResponse.idColaborador,
          obj.state.dataInicial,
          obj.state.dataFinal,
          colaboradorResponse.tipo
        );

        const dadosRelatorio = {
          nomeCompleto: "",
          dataInicial: "",
          dataFinal: "",
          bancoHoras: 0,
          bancoPositivo: 0,
          bancoNegativo: 0,
          dataAdmissao: "",
        };
        setTimeout(() => {
          dadosRelatorio.nomeCompleto = colaboradorResponse.nomeCompleto;
          dadosRelatorio.dataInicial = obj.state.dataInicial;
          dadosRelatorio.dataFinal = obj.state.dataFinal;
          dadosRelatorio.bancoHoras = obj.state.bancoHoras;
          dadosRelatorio.bancoPositivo = obj.state.bancoPositivo;
          dadosRelatorio.bancoNegativo = obj.state.bancoNegativo;
          dadosRelatorio.dataAdmissao = colaboradorResponse.dataAdmissao;

          localStorage.setItem(
            "relatorioIdividual",
            JSON.stringify(dadosRelatorio)
          );
        }, 500);
      })
      .catch(() => {
        console.log("Error colaborador null");
        localStorage.setItem("colaborador", null);
        obj.setState({
          colaborador: "",
        });
        return;
      });
  }

  getDadosIndividual(obj) {
   
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
    const colaborador = obj.state.colaborador;

    axios
      .get(
        `https://localhost:8081/rh/colaborador/soma?id=${colaborador.idColaborador}&inicio=${obj.state.dataInicial}&fim=${obj.state.dataFinal}`
      )
      .then((response) => {
        let cal = response.data;
        colaboradorReg.nomeCompleto = colaborador.nomeCompleto;
        colaboradorReg.dataAdmissao = colaborador.dataAdmissao;
        colaboradorReg.dataInicial = obj.state.dataInicial;
        colaboradorReg.dataFinal = obj.state.dataFinal;
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
      localStorage.setItem("listAllRelatorio", JSON.stringify(list));
    }, 400);
  }

  getAnotacao(obj, idColaborador, dataIncio, dataFinal, tipoColaborador) {
    axios
      .post(
        `https://localhost:8081/rh/anotacao/id?id=${idColaborador}&inicio=${dataIncio}&fim=${dataFinal}&tipo=${tipoColaborador}`
      )
      .then((response) => {
        if (response.data === []) {
          obj.setState({
            anotacoesList: [],
          });
        }

        const listaOrdenada = response.data.sort(
          (a, b) => b.idAnotacao - a.idAnotacao
        );

        const anotacoes = listaOrdenada.map((anotacao) => {
          let dataFinalFormatada = formatarData(anotacao.dataFinal);
          let dataInicioFormatada = formatarData(anotacao.dataInicio);
          anotacao.dataFinal = dataFinalFormatada;
          anotacao.dataInicio = dataInicioFormatada;
          return anotacao;
        });

        obj.setState({
          anotacoesList: anotacoes,
        });
        localStorage.setItem("anotacoesList", JSON.stringify(anotacoes));
        this.calcularAnotacoes(obj, anotacoes);
        return;
      })
      .catch((err) => {
        console.log("error em puxar as anotaçoes do colaborador referente");
      });
  }

  calcularAnotacoes = (obj, anotacoes) => {
    anotacoes.map((anotacao) => {
      if (anotacao.status === false) {
        return;
      }
      obj.setState({
        bancoHoras: (obj.state.bancoHoras +=
          anotacao.bancoPositivo - anotacao.bancoNegativo),
        horaExtra: (obj.state.horaExtra += anotacao.horaExtra),
        bancoPositivo: (obj.state.bancoPositivo += anotacao.bancoPositivo),
        bancoNegativo: (obj.state.bancoNegativo += anotacao.bancoNegativo),
      });
    });
  };
}
