const URL = "https://ifsp.ddns.net/webservices/clinicaMedica/pacientes";
const URLConsultas = "https://ifsp.ddns.net/webservices/clinicaMedica/consultas/";

async function fetchPacientes(url) {
    try {
        const resposta = await fetch(url);
    
        if (!resposta.ok) {
            throw new Error("Erro ao buscar.");
        }    
    
        return await resposta.json();
    }
    catch {
        console.log("Falha no fetch:", erro);
        throw erro;
    }
}

async function removerPaciente(id) {
    try {
        const resposta = await fetch(`${URL}/${id}`, { method: "DELETE", });
        if (!resposta.ok) throw new Error("Erro ao excluir.");

        console.log("Paciente excluído com sucesso!");
    }
    catch (erro) {
        console.log("Falha no fetch:", erro);
        throw erro;
    }
}

async function buscarConsultasPorPaciente(p_idPaciente) {

    try {
        const resposta = await fetch(URLConsultas);
        if (!resposta.ok) throw new Error("Erro ao buscar consultas.");
    
        const dados = await resposta.json();
    
        return dados.filter(c => c.idPaciente === p_idPaciente);
    }
    catch (erro) {
        console.log("Falha no fetch:", erro);
        throw erro;
    }
}

console.log(buscarConsultasPorPaciente(1571));