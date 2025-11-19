const URL = "https://ifsp.ddns.net/webservices/clinicaMedica/pacientes";

async function fetchPacientes(url) {
    const resposta = await fetch(url);

    if (!resposta.ok) throw new Error("Erro ao buscar.");

    const dados = await resposta.json();
    return dados;
}

async function removerPaciente(id) {
    try {
        const resposta = await fetch(`${URL}/${id}`, { method: "DELETE", });
        if (!resposta.ok) throw new Error("Erro ao excluir.");

        console.log("Paciente excluído com sucesso!");
    }
    catch (erro) {
        console.log("Erro de rede:", erro);
    }
}

// async function removerPaciente(id) {
// https://ifsp.ddns.net/webservices/clinicaMedica/pacientes/${id}

//   try {
//     const resposta = await fetch(url, {
//       method: "DELETE",
//     });

//     if (!resposta.ok) {
//       console.log("Erro ao excluir:", resposta.status, resposta.statusText);
//       mostrarNotificacao("Erro ao excluir:", "erro");
//       return;
//     }

//     console.log("Paciente excluído com sucesso!");
//     mostrarNotificacao("Paciente excluído com sucesso!", "sucesso");
//   } catch (erro) {
//     console.log("Erro de rede:", erro);
//   }
// }
