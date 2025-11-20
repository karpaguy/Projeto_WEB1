// Gerenciar os elementos da página aqui dentro.
const PAGE_ELEMENTS = {
    menu_options: {
        pacientes: {
            button : document.querySelector('#pacientes .opt'),
            arrow : document.querySelector('#pacientes .arrow-short'),
            submenu: document.querySelector('#pacientes .submenu'),
            subMenuState: false
        },
        medicos: {
            button: document.querySelector('#medicos .opt'),
            arrow: document.querySelector('#medicos .arrow-short'),
            submenu: document.querySelector('#medicos .submenu'),
            subMenuState: false
        }
    },
    display_area: document.querySelector("#content_display_main")
}

// ======== SETTERS & RETURNS_HTML
function setDropState(elemHTML) {
    // if (elem.subMenuState != undefined) {}
    elemHTML.button.addEventListener("click", () => {
        elemHTML.subMenuState = !elemHTML.subMenuState;

        elemHTML.submenu.classList.toggle("hidden");
        elemHTML.arrow.classList.toggle("rotate");
    })
}
function setDisplayHTML(elemDOM) {
    PAGE_ELEMENTS.display_area.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Data de Nascimento</th>
                    <th>Data de Cadastro</th>
                    <th>Ações</th>
                </tr>
            </thead>
        </table>
    `;

    const table = PAGE_ELEMENTS.display_area.querySelector("table"); // Chamar ela mesma para poder dar append. Por InnerHTML os botões não funcionam.
    table.appendChild(elemDOM);
}
// ======== STYLING
Object.values(PAGE_ELEMENTS.menu_options).forEach( (value) => {
    if (value.subMenuState != undefined) {
        setDropState(value);
    }
})

// ======== SUBMENU_PACIENTES
// ======== LISTAR()
function chamarModalConsultas() {
    // Cria o container do modal
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal_container");
    modalContainer.id = "modal_container";

    // Cria o modal principal
    const modal = document.createElement("div");
    modal.classList.add("modal");

    // Título <h2>
    const titulo = document.createElement("h2");
    titulo.textContent = "Modals are cool!";

    // Conteúdo interno
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal_content");

    // Botão de fechar
    const btnClose = document.createElement("button");
    btnClose.classList.add("close_modal");
    btnClose.textContent = "Close Me!";

    // Monta a estrutura
    modal.appendChild(titulo);
    modal.appendChild(modalContent);
    modal.appendChild(btnClose);

    modalContainer.appendChild(modal);

    // Agora você pode inserir onde quiser na página
    document.body.appendChild(modalContainer);
}

const listarPaciente = document.querySelector("#pacientes .submenu li");
listarPaciente.addEventListener("click", async () => {
    const dados = await fetchPacientes(`${URL}`);
    const tbody = document.createElement("tbody");
    // p → paciente.
    dados.forEach(p => {
        const tr = document.createElement("tr");

        const nomeTd = document.createElement("td");
        nomeTd.textContent = p.nome;
        const nascTd = document.createElement("td");
        nascTd.textContent = p.dataNascimento;
        const cadTd = document.createElement("td");
        cadTd.textContent = p.dataCadastro;
        const actionsTd = document.createElement("td");

        // Transformar depois em functions o retorno dos botões, e só ir adicionando o eventListerner.
        const infoBtn = document.createElement("button");
        infoBtn.classList.add("btn", "btn-info");
        infoBtn.innerText = "👁 Ver consultas";
        infoBtn.addEventListener("click", async () => {
            const consultasPaciente = await buscarConsultasPorPaciente(p.id);


            console.log("Consultas: ", consultasPaciente);
            chamarModalConsultas();
        })

        const editBtn = document.createElement("button");
        editBtn.classList.add("btn", "btn-warning");
        editBtn.innerText = "✏ Editar";
        editBtn.addEventListener("click", () => {
            console.log(`EDIT! ${p.id}`)
        })

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn", "btn-danger");
        deleteBtn.innerText = "🗑 Deletar";
        deleteBtn.addEventListener("click", async () => {
            if (confirm(`Tem certeza que deseja excluir o paciente ${p.nome}?`)) {
                await removerPaciente(p.id);
                listarPaciente.click();
            }
        })

        actionsTd.append(infoBtn, editBtn, deleteBtn);
        tr.append(nomeTd, nascTd, cadTd, actionsTd)
        tbody.appendChild(tr);
    })
    setDisplayHTML(tbody);
})

