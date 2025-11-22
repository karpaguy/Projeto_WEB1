

function getMedicos() {
    return apiGET("medicos");
}

function criarMedico(dados) {
    return apiPOST("medicos", dados);
}

function getEspecialidades() {
    return apiGET("especialidades");
}
function fecharModal() {
    document.getElementById("modal_container").style.display = "none";
}

// ==================================
//               AUXILIAR - ESP
// ==================================
async function carregarEspecialidades() {
    const especialidades = await getEspecialidades();

    const mapa = especialidades.reduce((acc, esp) => {
        acc[esp.id] = esp.nome;
        return acc;
    }, {});

    return mapa;
}

// Essa daqui é daora para caramba!
// Ou lit 🔥🔥, como diriam os jovens.
// tagHTML → a tag que deseja. Atributos → .textContent, .value, etc. ...children → quantidade indefinidade de 'filhos' que for passar pra tag HTML
function geraElemento(tagHTML, atributos = {}, ...children) {
    const elemento = document.createElement(tagHTML);
    Object.assign(elemento, atributos);
    children.forEach(c => elemento.append(c));
    return elemento;
}

// ==================================
//               CRUD
// ==================================
async function carregarListaMedicos() {
    const mapaEspecialidades = await carregarEspecialidades();

    const medicosLista = await getMedicos();
    const tbody = document.createElement("tbody");

    medicosLista.forEach(medico => {
        const tr = document.createElement("tr");

        const tdNome = geraElemento("td", {textContent: medico.nome})
        const tdCadastro = geraElemento("td", {textContent: medico.dataCadastro})
        const tdEspecialidade = geraElemento("td", {textContent: mapaEspecialidades[medico.idEspecialidade] || "Desconhecida"})
        const tdAcoes = document.createElement("td");
        
        //============ BTN INFO =============
        const btnInfo = geraElemento("button", {className: "info", textContent: "👁 Ver consultas"});
        btnInfo.addEventListener("click", async () => {
            console.log("A")
        })

        //============ BTN EDITAR =============
        const btnEditar = geraElemento("button", {className: "warning", textContent: "✏ Editar"});
        btnEditar.addEventListener("click", async () => {
            const div = geraElemento("div", { className: "modal_content" });
            const titulo = geraElemento("h2", { textContent: "Editar Médico" })

            const labelNome = geraElemento("label", { textContent: "Nome:" });
            const inputNome = geraElemento("input", {
                type: "text",
                value: medico.nome
            });

            const optionDefault = geraElemento("option", {
                value: "",
                textContent: "Selecione...",
                disabled: true
            });
            const selectEsp = geraElemento("select", { id: "select_esp" }, optionDefault);

            const especialidades = await getEspecialidades();
            especialidades.forEach(esp => {
                const option = geraElemento("option", {
                    value: esp.id,
                    textContent: esp.nome,
                    selected: esp.id === medico.idEspecialidade
                });
                selectEsp.append(option);
            });

            const labelEsp = geraElemento("label", { textContent: "Especialidade:" });

            const btnSalvar = geraElemento("button", {
                textContent: "Salvar",
                className: "info"
            });

            btnSalvar.addEventListener("click", async () => {
                if (inputNome.value.trim() == "") {
                    alert("Campo de nome não pode estar vazio.")
                } else {
                    const nomeFinal = inputNome.value.trim() || medico.nome;
                    const espFinal = selectEsp.value || medico.idEspecialidade;

                    await apiPUT("medicos", medico.id, {
                        nome: nomeFinal,
                        idEspecialidade: espFinal
                    });
                }

                fecharModal();
                await carregarListaMedicos();
            });
            div.append(titulo, labelNome, inputNome, labelEsp, selectEsp, btnSalvar);

            abrirModal(div);
        })
        
        //============ BTN DELETAR =============
        const btnDeletar = geraElemento("button", {className: "danger", textContent: "🗑 Deletar"});
        btnDeletar.addEventListener("click", async () => {
            if (confirm(`Tem certeza que deseja excluir o medico ${medico.nome}?`)) {
                await apiDELETE("medicos", medico.id);
                await carregarListaMedicos();
            }
        })

        tdAcoes.appendChild(btnInfo, btnEditar, btnDeletar);
        tr.appendChild(tdNome, tdCadastro, tdEspecialidade, tdAcoes);
        tbody.appendChild(tr);
    })
    return tbody;
}

async function carregarCadastroMedicos() {
    const title = geraElemento("h2", {textContent: "Cadastrar novo médico"});
    const container = geraElemento("div", {className: "cadastro_contaienr"}, title);

    // === NOME ===
    const labelNome = geraElemento("label", {textContent: "Nome", htmlFor: "input_nome"});
    const inputNome = geraElemento("input", {id: "input_nome", type: "text", placeholder: "Nome"});
    const grupoNome = geraElemento("div", {className: "form_group"}, labelNome, inputNome);

    // === ESPECIALIDADE ===
    const labelEsp = geraElemento("label", {textContent: "Especialidade", htmlFor: "select_esp"});
    
    const optionDefault = geraElemento("option", {value: "", textContent: "Selecione...", disabled: true, selected: true})
    const selectEsp = geraElemento("select", {id: "select_esp"}, optionDefault);

    const especialidades = await getEspecialidades();
    especialidades.forEach(esp => {
        const option = document.createElement("option"); geraElemento("option", {value: esp.id, textContent: esp.nome})
        selectEsp.appendChild(option);
    });
    const grupoEsp = geraElemento("div", {className: "form_group"}, labelEsp, selectEsp);

    // === BOTÃO ===
    const btnCadastrar = geraElemento("button", {className: "btn_cadastrar", textContent: "Cadastrar"})
    btnCadastrar.addEventListener("click", () => {
        const nomeMedico = inputNome.value;
        // .trim() vai remover espaços, mas não aqueles que estiverem entre algo escrito.
        if (nomeMedico.trim() === "") {
            alert("Campo de nome não pode estar vazio.")
        }
        else if(selectEsp.value == "") {
            alert("Nome não pode estar vazio.")
        } else {
            const body = {
                nome: nomeMedico,
                idEspecialidade: selectEsp.value
            }
            apiPOST("medicos", body);
        }
    })

    container.appendChild(grupoNome);
    container.appendChild(grupoEsp);
    container.appendChild(btnCadastrar);
    return container;
}

// ==================================
//               MODAL
// ==================================
function abrirModal(conteudoElemento) {
    const modal = document.getElementById("modal_container");
    const content = gerarElemento("modal_content", {innerHTML: ""},);

    content.innerHTML = "";
    content.appendChild(conteudoElemento);

    modal.style.display = "flex";
}
document.getElementById("close_modal").addEventListener("click", () => {
    document.getElementById("modal_container").style.display = "none";
});