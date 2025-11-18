const URL = "https://ifsp.ddns.net/webservices/clinicaMedica/";

async function fetchPacientes(url) {
    const resposta = await fetch(url);

    if (!resposta.ok) throw new Error("Erro ao buscar.");

    const dados = await resposta.json();
    return dados;
}

async function fetchConsultasEspecifica(url, id) {
    const resposta = await fetch(`${url}consultas/${id}`)

    if (!resposta.ok) throw new Error("Erro ao buscar.");

    const dados = await resposta.json();
    console.log(dados);
}

fetchConsultasEspecifica(URL, 899);
