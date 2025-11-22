const BASE_URL = "https://ifsp.ddns.net/webservices/clinicaMedica/"

async function apiGET(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    return await response.json(); // Jsonficar a Promise recebida. Precisa do await antes.
}

// async function apiGETConsulta(endpoint, id) {
//     const response = await fetch(`${BASE_URL}${endpoint}/id`)
// }

async function apiPOST(endpoint, body) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error("Erro ao deletar");
    } else {
        return await response.json();
    }
}

async function apiPUT(endpoint, id, body) {
    const response = await fetch(`${BASE_URL}${endpoint}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar");
    } else {
        return await response.json();
    }
}

// Necessita de um try
async function apiDELETE(endpoint, id) {
    const response = await fetch(`${BASE_URL}${endpoint}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Erro ao deletar");
    } else {
        alert('Deletado com sucesso.');
    }
}