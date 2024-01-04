const dataObj = new Date();
let mes = dataObj.getMonth() + 1
let dia = dataObj.getDate() - 7
let diaAtual = dataObj.getDate()
let ano = dataObj.getFullYear()
dia = dia.toString().length < 2 ? `0${dia}` : dia
mes = mes.toString().length < 2 ? `0${mes}` : mes
diaAtual = diaAtual.toString().length < 2 ? `0${diaAtual}` : diaAtual
export const dataInicialDefault = dia <= 0 ? `${ano}-${dataObj.getMonth()}-23` : `${ano}-${mes}-${dia}`
console.log(dataInicialDefault);
export const dataFinalDefault = `${ano}-${mes}-${diaAtual}`;
export const dataHoje = `${ano}-${mes}-${diaAtual}`;

export const formatarData = (data) => {
    let dataFormatada
    if (data === undefined) {
        return null
    }

    dataFormatada = data.split("-");
    dataFormatada = `${dataFormatada[2]}/${dataFormatada[1]}/${dataFormatada[0]}`;
    return dataFormatada;

}

export const formatarDataInput = (data) => {
    let dataFormatada
    if (data === undefined) {
        return null
    }

    dataFormatada = data.split("/");
    dataFormatada = `${dataFormatada[2]}-${dataFormatada[1]}-${dataFormatada[0]}`;
    return dataFormatada;

}
