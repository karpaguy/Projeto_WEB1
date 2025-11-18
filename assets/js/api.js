const URL = "https://ifsp.ddns.net/webservices/clinicaMedica/pacientes";
const DISPLAY = document.querySelector("#content_display_main");

async function fetchPacientes(url) {
    const resposta = await fetch(url);

    if (!resposta.ok) throw new Error("Erro ao buscar.");

    const dados = await resposta.json();
    return dados;
}

fetchPacientes(URL).then((dados) => {
    for (dado of dados) {
        DISPLAY.innerHTML += `<p>${dado.nome}
        <btn data-id=${dado.id}>EDITAR</btn>
        `;
    }

})
