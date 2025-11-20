// ===============================
//   Perfurmaria do site
// ================================ 
const btnPacientes  = document.querySelector('#pacientes .opt');
const arrowPacientes = document.querySelector('#pacientes .arrow-short');
const submenuPacientes = document.querySelector('#pacientes .submenu');

const btnMedicos  = document.querySelector('#medicos .opt');
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
