// ===============================
//   Perfurmaria do site
// ================================ 
const btnPacientes = document.querySelector('#pacientes .opt');
const arrowPacientes = document.querySelector('#pacientes .arrow-short');
const submenuPacientes = document.querySelector('#pacientes .submenu');

const btnMedicos = document.querySelector('#medicos .opt');
const arrowMedicos = document.querySelector('#medicos .arrow-short');
const submenuMedicos = document.querySelector('#medicos .submenu');

// Função simples de toggle
function toggleSubmenu(button, arrow, submenu) {
    button.addEventListener("click", () => {
        submenu.classList.toggle("hidden");
        arrow.classList.toggle("rotate");
    });
}

// Ativar os dois menus
toggleSubmenu(btnPacientes, arrowPacientes, submenuPacientes);
toggleSubmenu(btnMedicos, arrowMedicos, submenuMedicos);

// ===============================
//   Section Principal do site
// ================================
const displayTitle = document.querySelector('.area-name');
const displayMain = document.querySelector('#content_display_main');

console.log(displayMain);

async function mostrarMedicos() {
    displayMain.innerHTML = "";

    const tabela = document.createElement("table");

    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th>Nome</th>
            <th>Cadastro</th>
            <th>Especialidade</th>
            <th>Ações</th>
    `

    const tbody = await carregarListaMedicos();

    tabela.appendChild(thead);
    tabela.appendChild(tbody);

    displayMain.appendChild(tabela);
}

async function mostrarCadastrarMedicos() {
    displayMain.innerHTML = "";
    const content = await carregarCadastroMedicos();

    displayMain.appendChild(content);
}

document.querySelector("#listar_medicos").addEventListener("click", () => {
    mostrarMedicos();
});

document.querySelector("#cadastrar_medicos").addEventListener("click", () => {
    console.log("Epa");
    mostrarCadastrarMedicos();
})