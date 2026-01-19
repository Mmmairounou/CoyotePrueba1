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

function update() {
    const wrapper = document.querySelector('.horizontal-wrapper');
    const maxScroll = wrapper.offsetWidth - window.innerWidth;
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
    currentScroll += (targetScroll - currentScroll) * ease;
    wrapper.style.transform = `translateX(-${currentScroll}px)`;
    requestAnimationFrame(update);
}
update();