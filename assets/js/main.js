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
    }
}


// ======== SETTERS
function setDropState(elem) {
    // if (elem.subMenuState != undefined) {}
    elem.button.addEventListener("click", () => {
        elem.subMenuState = !elem.subMenuState;

        elem.submenu.classList.toggle("hidden");
        elem.arrow.classList.toggle("rotate");
    })
}

// ========

Object.values(PAGE_ELEMENTS.menu_options).forEach( (value) => {
    if (value.subMenuState != undefined) {
        setDropState(value);
    }
})

// ========

const listarPaciente = document.querySelector("#pacientes .submenu li");
listarPaciente.addEventListener("click", () => {
    
})