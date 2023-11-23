export function primeiroUltimoNome(nome) {
    let nomeSeparado = nome.split(" ");
    return `${nomeSeparado[0]} ${nomeSeparado[nomeSeparado.length - 1]}`
}

export function primeroNome(nome) {
    let nomeSeparado = nome.split(" ");
    return nomeSeparado[0]
}

export function ultimoNome(nome) {
    let nomeSeparado = nome.split(" ");
    return nomeSeparado[nomeSeparado.length - 1]
}

export function diaNascimneto (data) {
    if(data === null) return;
    let dataSeparada = data.split("-");
    return dataSeparada[2]
}

export function mesNascimento (data) {
    if(data === null) return;
    let dataSeparada = data.split("-");
    return dataSeparada[1]
}