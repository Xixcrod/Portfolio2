function initCarrusel() {
    const projectImageContainers = document.querySelectorAll('.project-image-container');

    projectImageContainers.forEach(container => {
        const sliderInner = container.querySelector('.slider-inner');
        const slideImages = container.querySelectorAll('.slide-image');
        const prevButton = container.querySelector('.prev-slide');
        const nextButton = container.querySelector('.next-slide');
        const indicatorsContainer = container.querySelector('.slider-indicators');

        // Limpiar indicadores por si se vuelve a ejecutar la función
        if (indicatorsContainer) {
            indicatorsContainer.innerHTML = '';
        }

        let currentIndex = 0;
        const totalImages = slideImages.length;
        let autoplayInterval;

        // Si no hay imágenes o solo hay una, ocultar controles y salir
        if (totalImages <= 1) {
            if (prevButton) prevButton.style.display = 'none';
            if (nextButton) nextButton.style.display = 'none';
            if (indicatorsContainer) indicatorsContainer.style.display = 'none';
            return;
        }

        // Asegurar que los botones estén visibles si hay más de 1 imagen
        if (prevButton) prevButton.style.display = 'block';
        if (nextButton) nextButton.style.display = 'block';
        if (indicatorsContainer) indicatorsContainer.style.display = 'flex';

        // Función para mostrar la imagen actual
        function showSlide(index) {
            if (index >= totalImages) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = totalImages - 1;
            } else {
                currentIndex = index;
            }

            const offset = -currentIndex * 100;
            sliderInner.style.transform = `translateX(${offset}%)`;

            // Actualizar indicadores (dots)
            if (indicatorsContainer) {
                const dots = indicatorsContainer.querySelectorAll('.indicator-dot');
                dots.forEach((dot, i) => {
                    if (i === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }

        // Generar puntos indicadores
        if (indicatorsContainer) {
            for (let i = 0; i < totalImages; i++) {
                const dot = document.createElement('span');
                dot.classList.add('indicator-dot');
                dot.addEventListener('click', () => {
                    showSlide(i);
                    resetAutoplay();
                });
                indicatorsContainer.appendChild(dot);
            }
        }

        // Event listeners para las flechas
        if (prevButton) {
            const newPrev = prevButton.cloneNode(true);
            prevButton.parentNode.replaceChild(newPrev, prevButton);
            newPrev.addEventListener('click', () => {
                showSlide(currentIndex - 1);
                resetAutoplay();
            });
        }

        if (nextButton) {
            const newNext = nextButton.cloneNode(true);
            nextButton.parentNode.replaceChild(newNext, nextButton);
            newNext.addEventListener('click', () => {
                showSlide(currentIndex + 1);
                resetAutoplay();
            });
        }

        // --- AUTOPLAY (Carrusel Automático) ---
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                showSlide(currentIndex + 1);
            }, 4000); // Cambia de imagen cada 4 segundos (ajusta si prefieres otro tiempo)
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        function resetAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        // Pausar al pasar el mouse por encima (PC)
        container.addEventListener('mouseenter', stopAutoplay);
        container.addEventListener('mouseleave', startAutoplay);

        // --- SOPORTE TÁCTIL (Swipe en Teléfonos) ---
        let touchStartX = 0;
        let touchEndX = 0;

        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay(); // Pausar mientras el usuario interactúa
        }, { passive: true });

        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoplay(); // Reanudar autoplay al soltar
        }, { passive: true });

        function handleSwipe() {
            const minSwipeDistance = 50; // Mínimo de píxeles para registrar el gesto
            if (touchEndX < touchStartX - minSwipeDistance) {
                // Deslizar a la izquierda -> Siguiente imagen
                showSlide(currentIndex + 1);
            }
            if (touchEndX > touchStartX + minSwipeDistance) {
                // Deslizar a la derecha -> Imagen anterior
                showSlide(currentIndex - 1);
            }
        }

        // Mostrar primera imagen e iniciar autoplay
        showSlide(0);
        startAutoplay();
    });
}

// Ejecutar en DOMContentLoaded por si hay proyectos estáticos en el HTML
document.addEventListener('DOMContentLoaded', initCarrusel);