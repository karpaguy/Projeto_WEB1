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
function verConsultasPaciente(id) {

}

const listarPaciente = document.querySelector("#pacientes .submenu li");
listarPaciente.addEventListener("click", async () => {
    const dados = await fetchPacientes(`${URL}pacientes`);
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
        infoBtn.addEventListener("click", () => {
            console.log(`INFO! ${p.id}`)
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
        deleteBtn.addEventListener("click", () => {
            console.log(`DELETE! ${p.id}`)
        })

        actionsTd.append(infoBtn, editBtn, deleteBtn);
        tr.append(nomeTd, nascTd, cadTd, actionsTd)
        tbody.appendChild(tr);
    })
    setDisplayHTML(tbody);
})

