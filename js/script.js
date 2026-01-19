document.addEventListener('mousemove', (e) => {
    const chefCircle = document.querySelector('.chef-circle');
    const x = (window.innerWidth / 2 - e.pageX) / 30;
    const y = (window.innerHeight / 2 - e.pageY) / 30;
    
    chefCircle.style.transform = `translateX(${x}px) translateY(${y}px)`;
});

const scrollContainer = document.querySelector(".horizontal-scroll-wrapper");

window.addEventListener("wheel", (evt) => {
    // Solo si el usuario usa la rueda del mouse verticalmente
    if (evt.deltaY !== 0) {
        window.scrollBy({
            left: evt.deltaY * 4, // Multiplicador para velocidad de scroll
            behavior: 'smooth'
        });
    }
});

let currentScroll = 0;
let targetScroll = 0;
const ease = 0.05;

window.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    targetScroll += evt.deltaY * 1.2; 
}, { passive: false });

let isDown = false;
let startX;

window.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX;
    document.body.style.cursor = 'grabbing';
});

window.addEventListener('mouseup', () => {
    isDown = false;
    document.body.style.cursor = 'grab';
});

window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX;
    const walk = (x - startX) * 0.4; 
    targetScroll -= walk;
    startX = x;
});

// Detectar si es móvil
const isMobile = window.innerWidth <= 768;

function update() {
    // Si es móvil, no aplicamos la transformación horizontal
    if (window.innerWidth <= 768) {
        const wrapper = document.querySelector('.horizontal-wrapper');
        wrapper.style.transform = `none`; // Resetear transformación
        return; 
    }

    const wrapper = document.querySelector('.horizontal-wrapper');
    const maxScroll = wrapper.offsetWidth - window.innerWidth;
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
    currentScroll += (targetScroll - currentScroll) * ease;
    wrapper.style.transform = `translateX(-${currentScroll}px)`;
    requestAnimationFrame(update);
}

// Solo activar wheel y mouse events si NO es móvil
if (!isMobile) {
    window.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        targetScroll += evt.deltaY * 1.2; 
    }, { passive: false });

    // Aquí irían tus listeners de mousedown, mousemove existentes...
}

// Ejecutar update siempre, ella decidirá si animar o no
update();

// Re-evaluar si se cambia el tamaño de la ventana
window.addEventListener('resize', () => {
    location.reload(); // Recargar para recalcular anchos
});
