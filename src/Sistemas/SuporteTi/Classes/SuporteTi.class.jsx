import axios from "axios";
import Cookies from "js-cookie";
import { ticket, requestFile } from "../Constant/SuporteTiConst";
import { data, hoje, hora, ontem, dataAnterior } from "../../../Constant/Constantes";

export class RequestsSuporteTi {

  AbrirChamada = async (e, obj) => {
    e.preventDefault();
    const url = `https://localhost:8081/chamadas/pedido`;
    axios.post(url, ticket(obj)).then((response) => {
      obj.setState({
        mensagem: response.data,
        modalMensagemIsOpen: true,
      });
    }).catch((e) => {
      switch (e.code) {
        case "ERR_NETWORK":
          obj.setState({
            mensagem: "Erro de Conexão, motivos -> Certificado ou Servidor Back-end, contate ao TI.",
            modalMensageIsOpen: true,
          });
          break;
        default:
          break;
      }
    })
    await axios.post("https://localhost:8081/chamadas/update/file", requestFile(obj, "padrao"), {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).catch((e) => {
      // file da erro ERR_BAD_REQUEST
      return
    });
  }

  RequestChamadasAbertasMaster = (obj) => {
    axios.post("https://localhost:8081/chamadas/abertas", {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      const dadosOrdenados = response.data.sort((a, b) => b.id - a.id);
      const dezPrimeiros = dadosOrdenados.slice(0, 10);
      const tamanhoNovo = dezPrimeiros.length;
      if (tamanhoNovo > Cookies.get("tamanhoPendente")) {
        this.mostrarNotificacao(`${dezPrimeiros[0].nome}: ${dezPrimeiros[0].os}`);
        obj.setState({ pendentes: dezPrimeiros });
        Cookies.set("tamanhoPendente", tamanhoNovo);
        return
      } else {
        obj.setState({ pendentes: dezPrimeiros });
        Cookies.set("tamanhoPendente", tamanhoNovo);
        return
      }
    })
      .catch((error) => {
        console.error(error);
      });
  }

  RequestChamadasMusicasMaster = (obj) => {
    axios.post("https://localhost:8081/chamadas/getmusica", {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      const dadosOrdenados = response.data.sort((a, b) => b.id - a.id);
      const dezPrimeiros = dadosOrdenados.slice(0, 50);
      const tamanhoNovo = dezPrimeiros.length;
      if (tamanhoNovo > Cookies.get("tamanhoMusica")) {
        obj.setState({ pendentes: dezPrimeiros });
        Cookies.set("tamanhoMusica", tamanhoNovo);
        return
      } else {
        obj.setState({ pendentes: dezPrimeiros });
        Cookies.set("tamanhoMusica", tamanhoNovo);
        return
      }
    })
      .catch((error) => {
        console.error(error);
      });
  }

  RequestChamadasFechadasMaster = (obj) => {
    axios
      .post("https://localhost:8081/chamadas/fechadas", hoje, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        const dadosOrdenados = response.data.sort((a, b) => b.id - a.id);
        axios
          .post("https://localhost:8081/chamadas/fechadas", ontem)
          .then((response) => {
            const dadosOrdenadosOntem = response.data.sort((a, b) => b.id - a.id);
            dadosOrdenadosOntem.map((p) => {
              dadosOrdenados.push(p)
            })
            obj.setState({ finalizado: dadosOrdenados })
            Cookies.set('tamanhoFinalizado', dadosOrdenados.length)
          })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  RequestChamadasAndamentoMaster = (obj) => {
    axios
      .post("https://localhost:8081/chamadas/andamento", {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        const dadosOrdenados = response.data.sort((a, b) => b.id - a.id);
        const dezPrimeiros = dadosOrdenados.slice(0, 10);
        const tamanhoNovo = dezPrimeiros.length;
        if (tamanhoNovo > Cookies.get("tamanhoAndamento")) {
          obj.setState({ andamento: dezPrimeiros });
          Cookies.set("tamanhoAndamento", tamanhoNovo);
        } else {
          obj.setState({ andamento: dezPrimeiros });
          Cookies.set("tamanhoAndamento", tamanhoNovo);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  RequestChamadasAbertasComum = (obj) => {
    const funcionario = JSON.parse(Cookies.get("user"));
    axios
      .post("https://localhost:8081/chamadas/abertas/nome", {
        nome: `${funcionario.nome} ${funcionario.sobrenome}`,
      }, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          'Content-Type': 'application/json'
        },

      })
      .then((response) => {
        const dadosOrdenados = response.data.sort((a, b) => b.id - a.id);
        const dezPrimeiros = dadosOrdenados.slice(0, 10);
        const tamanhoNovo = dezPrimeiros.length;
        if (tamanhoNovo > Cookies.get("tamanhoPendente")) {
          obj.setState({ pendentes: dezPrimeiros });
          Cookies.set("tamanhoPendente", tamanhoNovo);
        } else {
          obj.setState({ pendentes: dezPrimeiros });
          Cookies.set("tamanhoPendente", tamanhoNovo);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  RequestChamadasAndamentoComum = (obj) => {
    const funcionario = JSON.parse(Cookies.get("user"));
    axios
      .post("https://localhost:8081/chamadas/andamento/nome", {
        nome: `${funcionario.nome} ${funcionario.sobrenome}`,
      }, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'application/json'
        },

      })
      .then((response) => {
        const dadosOrdenados = response.data.sort((a, b) => b.id - a.id);
        const dezPrimeiros = dadosOrdenados.slice(0, 10);
        const tamanhoNovo = dezPrimeiros.length;
        if (tamanhoNovo > Cookies.get("tamanhoAndamento")) {
          this.mostrarNotificacao("Um pedido seu foi movido para andamento");
          obj.setState({ andamento: dezPrimeiros });
          Cookies.set("tamanhoAndamento", tamanhoNovo);
        } else {
          obj.setState({ andamento: dezPrimeiros });
          Cookies.set("tamanhoAndamento", tamanhoNovo);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  RequestChamadasFechadasComum = (obj) => {
    const funcionario = JSON.parse(Cookies.get("user"));
    const hoje = {
      dataHora: data,
      nome: `${funcionario.nome} ${funcionario.sobrenome}`,

    }
    const ontem = {
      dataHora: dataAnterior,
      nome: `${funcionario.nome} ${funcionario.sobrenome}`,
    }
    axios
      .post("https://localhost:8081/chamadas/fechadas/nome", hoje)
      .then((response) => {
        const dadosOrdenados = response.data.sort((a, b) => b.id - a.id);
        axios
          .post("https://localhost:8081/chamadas/fechadas/nome", ontem, {
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Content-Type': 'application/json'
            },

          })
          .then((response) => {
            const dadosOrdenadosOntem = response.data.sort((a, b) => b.id - a.id);
            dadosOrdenadosOntem.map((p) => {
              dadosOrdenados.push(p)
            })
            const tamanhoNovo = dadosOrdenados.length;
            if (tamanhoNovo > Cookies.get("tamanhoFinalizado")) {
              this.mostrarNotificacao("Um pedido seu foi Finalizado");
              obj.setState({ finalizado: dadosOrdenados });
              Cookies.set("tamanhoFinalizado", tamanhoNovo);
            } else {
              obj.setState({ finalizado: dadosOrdenados });
              Cookies.set("tamanhoFinalizado", tamanhoNovo);
            }
          })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  mostrarNotificacao = (mensagem) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(mensagem);
    } else if (
      "Notification" in window &&
      Notification.permission !== "denied"
    ) {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          new Notification(mensagem);
        }
      });
    }
  };
}

export class UpdateSuporteTi {

  enviarParaFechado = async (item, obj, role) => {
    const funcionario = JSON.parse(Cookies.get("user"));
    await axios.post("https://localhost:8081/chamadas/update/file", requestFile(obj, role), {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).catch(err => {
      console.log(err);
    });

    const dados = {
      id: item.id,
      status: "FECHADO",
      responsavel: `${funcionario.nome} ${funcionario.sobrenome}`
    };
    const url = "https://localhost:8081/chamadas/atualizar/responsavel";
    axios.put(url, dados);
  };

  enviarParaAndamento = (item) => {
    const funcionario = JSON.parse(Cookies.get("user"));
    const dados = {
      id: item.id,
      status: "ANDAMENTO",
      responsavel: `${funcionario.nome} ${funcionario.sobrenome}`
    };
    const url = "https://localhost:8081/chamadas/atualizar/responsavel";
    axios.put(url, dados);
  };

  enviarParaInativo = (item) => {
    const funcionario = JSON.parse(Cookies.get("user"));
    const dados = {
      id: item.id,
      status: "INATIVO",
    };
    const url = "https://localhost:8081/chamadas/apagar";
    axios.put(url, dados);
  };

  enviarParaPendente = (item) => {
    const dados = {
      id: item.id,
      status: "ABERTO",
    };
    const url = "https://localhost:8081/chamadas/atualizar";
    axios.put(url, dados);
  };

}