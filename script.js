// ==========================================
// TEXTOS PARA MODALES
// ==========================================
const textoContacto = [
    "Si te interesa trabajar conmigo o querés charlar sobre un proyecto, podés escribirme por estos medios.",
    "Email: agustinabandelli@gmail.com",
    "Teléfono: +598 99 993 077"
];

const textoSobreMi = [
    "Nombre: Agustina Bandelli",
    "Descripción: Diseñadora interesada en ordenar ideas, encontrar sentido y transformar problemas en soluciones claras. Me caracteriza por combinar pensamiento estratégico con una mirada estética.",
    "Intereses: Historia, arte, cine, análisis visual, narrativa, música."
];

// ==========================================
// FUNCIÓN GENÉRICA PARA ESCRIBIR LÍNEAS
// ==========================================
function escribirLineas(contenedorId, lineas, indice = 0) {
    if (indice >= lineas.length) return;

    const contenedor = document.getElementById(contenedorId);
    const p = document.createElement('p');
    p.style.marginBottom = "15px";
    contenedor.appendChild(p);

    let charIndex = 0;
    const frase = lineas[indice];

    function type() {
        if (charIndex < frase.length) {
            p.textContent += frase.charAt(charIndex);
            charIndex++;
            setTimeout(type, 25);
        } else {
            setTimeout(() => escribirLineas(contenedorId, lineas, indice + 1), 300);
        }
    }
    type();
}

// ==========================================
// ABRIR / CERRAR MODALES
// ==========================================
function abrirModal(idModal, idContenedor, lineas) {
    const modal = document.getElementById(idModal);
    const contenedor = document.getElementById(idContenedor);
    modal.classList.add('active');
    contenedor.innerHTML = "";
    setTimeout(() => escribirLineas(idContenedor, lineas), 600);
}

function cerrarModal(idModal) {
    document.getElementById(idModal).classList.remove('active');
}

function abrirContacto() {
    abrirModal('modalContacto', 'typewriter-modal', textoContacto);
}
function cerrarContacto() {
    cerrarModal('modalContacto');
}

function abrirSobreMi() {
    abrirModal('modalSobreMi', 'typewriter-sobreMi', textoSobreMi);
}
function cerrarSobreMi() {
    cerrarModal('modalSobreMi');
}

// Cerrar modales haciendo clic fuera
window.addEventListener('click', function(e) {
    if (e.target === document.getElementById('modalContacto')) cerrarContacto();
    if (e.target === document.getElementById('modalSobreMi')) cerrarSobreMi();
});

// ==========================================
// DOM CARGADO
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    const nav = document.querySelector('.nav-principal');

    // Scroll: clase nav-scrolled
    window.addEventListener('scroll', () => {
        nav.classList.toggle('nav-scrolled', window.scrollY > 50);
    });

    // Menú hamburguesa
    const toggle = document.getElementById("menu-toggle");
    if (toggle) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("active");
            toggle.classList.toggle("open");
        });

        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target) && !toggle.contains(event.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                toggle.classList.remove('open');
            }
        });

        const mobileLinks = nav.querySelectorAll('.desktop-only a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                toggle.classList.remove('open');
            });
        });
    }

    // Animación frases con scroll
    const parrafo1 = document.getElementById('parrafo1');
    const parrafo2 = document.getElementById('parrafo2');

    if (parrafo1 && parrafo2) {
        function checkScroll() {
            const threshold = window.innerHeight * 0.75;
            [parrafo1, parrafo2].forEach(p => {
                const rect = p.getBoundingClientRect();
                if (rect.top < threshold && rect.bottom > 0) {
                    p.classList.add('visible');
                }
            });
        }
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        checkScroll();
    }
});
        

        