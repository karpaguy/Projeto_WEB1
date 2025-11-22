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
//               CRUD
// ==================================
async function carregarListaMedicos() {
    const especialidades = await getEspecialidades();

    const mapaEspecialidades = especialidades.reduce((acc, esp) => {
        acc[esp.id] = esp.nome;
        return acc;
    }, {});

    const medicosLista = await getMedicos();
    const tbody = document.createElement("tbody");

    medicosLista.forEach(medico => {
        const tr = document.createElement("tr");

        const tdNome = document.createElement("td");
        tdNome.textContent = medico.nome;

        const tdCadastro = document.createElement("td");
        tdCadastro.textContent = medico.dataCadastro;

        const tdEspecialidade = document.createElement("td");
        tdEspecialidade.textContent = mapaEspecialidades[medico.idEspecialidade] || "Desconhecida";

        const tdAcoes = document.createElement("td");
        
        //============ BTN INFO =============
        const btnInfo = document.createElement("button");
        btnInfo.classList.add("info");
        btnInfo.textContent = "👁 Ver consultas";
        btnInfo.addEventListener("click", async () => {
            console.log("A")
        })

        //============ BTN EDITAR =============
        const btnEditar = document.createElement("button");
        btnEditar.classList.add("warning");
        btnEditar.textContent = "✏ Editar";
        btnEditar.addEventListener("click", async () => {
            const div = document.createElement("div");
            div.classList.add("modal_content");

            const titulo = document.createElement("h2");
            titulo.textContent = "Editar Médico";

            const labelNome = document.createElement("label");
            labelNome.textContent = "Nome:";

            const inputNome = document.createElement("input");
            inputNome.type = "text";
            inputNome.value = medico.nome;

            const selectEsp = document.createElement("select");
            selectEsp.id = "select_esp";

            const optionDefault = document.createElement("option");
            optionDefault.value = "";
            optionDefault.textContent = "Selecione...";
            optionDefault.disabled = true;
            selectEsp.appendChild(optionDefault);

            const especialidades = await getEspecialidades();
            especialidades.forEach(esp => {
                const option = document.createElement("option");
                option.value = esp.id;
                option.textContent = esp.nome;

                if (esp.id === medico.idEspecialidade) {
                    option.selected = true;
                }

                selectEsp.appendChild(option);
            });

            div.append(titulo);
            div.append(labelNome);
            div.append(inputNome);

            const labelEsp = document.createElement("label");
            labelEsp.textContent = "Especialidade:";
            div.append(labelEsp);

            div.append(selectEsp);

            const btnSalvar = document.createElement("button");
            btnSalvar.textContent = "Salvar";
            btnSalvar.classList.add("info");

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
            div.append(btnSalvar);

            abrirModal(div);
        })
        
        //============ BTN DELETAR =============
        const btnDeletar = document.createElement("button");
        btnDeletar.classList.add("danger");
        btnDeletar.textContent = "🗑 Deletar";
        btnDeletar.addEventListener("click", async () => {
            if (confirm(`Tem certeza que deseja excluir o medico ${medico.nome}?`)) {
                await apiDELETE("medicos", medico.id);
                await carregarListaMedicos();
            }
        })

        tdAcoes.appendChild(btnInfo);
        tdAcoes.appendChild(btnEditar);
        tdAcoes.appendChild(btnDeletar);

        tr.appendChild(tdNome);
        tr.appendChild(tdCadastro);
        tr.appendChild(tdEspecialidade);
        tr.appendChild(tdAcoes);

        tbody.appendChild(tr);
    })
    return tbody;
}

async function carregarCadastroMedicos() {
    const container = document.createElement("div");
    container.className = "cadastro_container";

    const title = document.createElement("h1");
    title.textContent = "Cadastrar novo médico";
    container.appendChild(title);

    // === NOME ===
    const grupoNome = document.createElement("div");
    grupoNome.className = "form_group";

    const labelNome = document.createElement("label");
    labelNome.textContent = "Nome";
    labelNome.setAttribute("for", "input_nome");

    const inputNome = document.createElement("input");
    inputNome.id = "input_nome";
    inputNome.type = "text";
    inputNome.placeholder = "Nome";

    const erroNome = document.createElement("span");
    erroNome.className = "erro";
    erroNome.textContent = "Nome inválido";
    erroNome.style.display = "none";

    grupoNome.appendChild(labelNome);
    grupoNome.appendChild(inputNome);
    grupoNome.appendChild(erroNome);

    // === ESPECIALIDADE ===
    const grupoEsp = document.createElement("div");
    grupoEsp.className = "form_group";

    const labelEsp = document.createElement("label");
    labelEsp.textContent = "Especialidade";
    labelEsp.setAttribute("for", "select_esp");

    const selectEsp = document.createElement("select");
    selectEsp.id = "select_esp";

    const optionDefault = document.createElement("option");
    optionDefault.value = "";
    optionDefault.textContent = "Selecione...";
    optionDefault.disabled = true;
    optionDefault.selected = true;
    selectEsp.appendChild(optionDefault);

    const especialidades = await getEspecialidades();
        especialidades.forEach(esp => {
        const option = document.createElement("option");
        option.value = esp.id;
        option.textContent = esp.nome;
        selectEsp.appendChild(option);
    });

    const erroEsp = document.createElement("span");
    erroEsp.className = "danger";
    erroEsp.textContent = "Especialização";
    erroEsp.style.display = "none";

    grupoEsp.appendChild(labelEsp);
    grupoEsp.appendChild(selectEsp);
    grupoEsp.appendChild(erroEsp);

    // === BOTÃO ===
    const btnCadastrar = document.createElement("button");
    btnCadastrar.className = "btn_cadastrar";
    btnCadastrar.textContent = "Cadastrar";

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
    const content = document.getElementById("modal_content");

    content.innerHTML = "";
    content.appendChild(conteudoElemento);

    modal.style.display = "flex";
}
document.getElementById("close_modal").addEventListener("click", () => {
    document.getElementById("modal_container").style.display = "none";
});