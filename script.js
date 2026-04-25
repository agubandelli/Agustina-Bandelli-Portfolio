// ==========================================
// 1. FUNCIONES DEL MODAL DE sobre mi
// ==========================================

const textoSobreMi = [
    "Nombre: Agustina Bandelli",
    "Descripción: Diseñadora interesada en ordenar ideas, encontrar sentido y transformar problemas en soluciones claras. Me caracteriza por combinar pensamiento estratégico con una mirada estética.",
    "Intereses: Historia, arte, cine, análisis visual, narrativa, música.",
    "Estado: En constante desarrollo."
];

function abrirSobreMi() {
    const modal = document.getElementById('modalSobreMi');
    const contenedor = document.getElementById('typewriter-sobreMi');
    
    modal.classList.add('active');
    contenedor.innerHTML = ""; 

    setTimeout(() => {
        escribirLineaSobreMi(0);
    }, 600);
}

function escribirLineaSobreMi(indice) {
    if (indice >= textoSobreMi.length) return;

    const contenedor = document.getElementById('typewriter-sobreMi');
    const p = document.createElement('p');
    p.style.marginBottom = "15px";
    contenedor.appendChild(p);

    let charIndex = 0;
    const frase = textoSobreMi[indice];

    function type() {
        if (charIndex < frase.length) {
            p.textContent += frase.charAt(charIndex);
            charIndex++;
            setTimeout(type, 25); // Un poquito más rápido porque es más texto
        } else {
            setTimeout(() => escribirLineaSobreMi(indice + 1), 300);
        }
    }
    type();
}

function cerrarSobreMi() {
    document.getElementById('modalSobreMi').classList.remove('active');
}

// Actualizar el evento de cerrar al hacer clic fuera para que incluya este modal
window.addEventListener('click', function(e) {
    const modalContacto = document.getElementById('modalContacto');
    const modalSobreMi = document.getElementById('modalSobreMi');
    
    if (e.target == modalContacto) cerrarContacto();
    if (e.target == modalSobreMi) cerrarSobreMi();
});





// ==========================================
// 1. FUNCIONES DEL MODAL DE CONTACTO
// ==========================================
const textoContacto = [
    "Si te interesa trabajar conmigo o querés charlar sobre un proyecto, podés escribirme por estos medios.",
    "Email: agustinabandelli@gmail.com",
    "Teléfono: +598 99 993 077"
];

function abrirContacto() {
    const modal = document.getElementById('modalContacto');
    const contenedor = document.getElementById('typewriter-modal');
    
    modal.classList.add('active'); // Muestra el modal
    contenedor.innerHTML = "";     // Limpia el texto
    
    // Inicia la escritura después de que el papel termine de aparecer
    setTimeout(() => {
        escribirLinea(0);
    }, 600);
}

function escribirLinea(indice) {
    if (indice >= textoContacto.length) return;
    
    const contenedor = document.getElementById('typewriter-modal');
    const p = document.createElement('p');
    p.style.marginBottom = "15px";
    contenedor.appendChild(p);
    
    let charIndex = 0;
    const frase = textoContacto[indice];
    
    function type() {
        if (charIndex < frase.length) {
            p.textContent += frase.charAt(charIndex);
            charIndex++;
            setTimeout(type, 35); // Velocidad de las letras
        } else {
            setTimeout(() => escribirLinea(indice + 1), 400); // Pausa entre líneas
        }
    }
    type();
}

function cerrarContacto() {
    document.getElementById('modalContacto').classList.remove('active');
}

// Cerrar al hacer clic fuera del papel del modal
window.addEventListener('click', function(e) {
    const modal = document.getElementById('modalContacto');
    if (e.target == modal) {
        cerrarContacto();
    }
});

// ==========================================
// 2. FUNCIONES GENERALES DE LA PÁGINA
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    
    // NAVEGACIÓN: SCROLL EFECTO
    const nav = document.querySelector('.nav-principal');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });

    // MENÚ HAMBURGUESA
    const toggle = document.getElementById("menu-toggle");
    if (toggle) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("active");
            toggle.classList.toggle("open");
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target) && !toggle.contains(event.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                toggle.classList.remove('open');
            }
        });
        
        // Cerrar al hacer clic en un enlace del menú móvil
        const mobileLinks = nav.querySelectorAll('.desktop-only a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                toggle.classList.remove('open');
            });
        });
    }

    // ANIMACIÓN FRASES CON SCROLL
    const parrafo1 = document.getElementById('parrafo1');
    const parrafo2 = document.getElementById('parrafo2');
    
    if (parrafo1 && parrafo2) {
        function checkScroll() {
            const windowHeight = window.innerHeight;
            const threshold = windowHeight * 0.75;
            
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

    // SLIDER AUTOMÁTICO (si existe en alguna de las páginas de proyectos)
    const slider = document.querySelector('.slider');
    if (slider) {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        const dotsContainer = document.querySelector('.dots');
        let currentIndex = 0;
        let slideInterval;
        const intervalTime = 3000;

        // Crear dots
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
        const dots = document.querySelectorAll('.dot');

        function updateDots() {
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
        }

        function goToSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            currentIndex = index;
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateDots();
        }

        function nextSlide() { goToSlide(currentIndex + 1); }
        function prevSlide() { goToSlide(currentIndex - 1); }

        function startAutoSlide() {
            if (slideInterval) clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
        }
        function stopAutoSlide() { clearInterval(slideInterval); }

        if(prevBtn && nextBtn){
             prevBtn.addEventListener('click', () => { prevSlide(); startAutoSlide(); });
             nextBtn.addEventListener('click', () => { nextSlide(); startAutoSlide(); });
        }
        
        const sliderContainer = document.querySelector('.slider-container');
        if(sliderContainer){
             sliderContainer.addEventListener('mouseenter', stopAutoSlide);
             sliderContainer.addEventListener('mouseleave', startAutoSlide);
        }
        
        startAutoSlide();
    }
});
        

        