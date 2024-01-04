const dataObj = new Date();
const mes = dataObj.getMonth() + 1
const dia = dataObj.getDate()
const diaAnterior = dataObj.getDate() - 1
export const dataAnterior = `${diaAnterior.toString().length < 2 ? `0${diaAnterior}` : diaAnterior}/${mes}/${dataObj.getFullYear()}`;

export const hora = `${dataObj.getHours()}:${dataObj.getMinutes()}`;
export const data = `${dia.toString().length < 2 ? `0${dia}` : dia}/${mes.toString().length < 2 ? `0${mes}` : mes}/${dataObj.getFullYear()}`;

export const diaDaSemana = dataObj.toDateString().split(" ")[0]

export const hoje = data

export const ontem = dataAnterior


export function MostrarNotificacao (mensagem){
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(mensagem);
  } else if ("Notification" in window && Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        new Notification(mensagem);
      }
    });
  }
};