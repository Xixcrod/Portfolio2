document.addEventListener('DOMContentLoaded', () => {
    // Carga los datos desde data.json
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderPerfil(data.perfil);
            renderProyectos(data.proyectos);
            renderSkills(data.skills);
            renderSoftSkills(data.habilidades_blandas || data.soft_skills);
            renderEducacion(data.educacion);
            renderContacto(data.perfil);
        })
        .catch(error => console.error('Error al cargar la información:', error));
});

// 1. Renderizar Perfil
function renderPerfil(perfil) {
    if (!perfil) return;
    
    const perfilCard = document.getElementById('about-me');
    if (!perfilCard) return;

    perfilCard.innerHTML = `
        <div class="perfil-content">
            <h2>Hola, soy ${perfil.nombre}</h2>
            <h3>${perfil.titulo}</h3>
        </div>
        ${perfil.foto ? `
        <div class="perfil-image">
            <img src="${perfil.foto}" alt="Foto de perfil de ${perfil.nombre}">
        </div>` : ''}
    `;
}

// 2. Renderizar Proyectos
function renderProyectos(proyectos) {
    const container = document.getElementById('projects-container');
    if (!container || !proyectos) return;

    container.innerHTML = proyectos.map(p => {
        // Imágenes del carrusel
        const imgsHtml = p.imagenes && p.imagenes.length > 0 
            ? p.imagenes.map(img => `<img src="${img}" alt="${p.titulo}" class="slide-image">`).join('')
            : `<div class="no-image-placeholder"><p>No hay imagen</p></div>`;

        // Controles de navegación del carrusel
        const controlsHtml = p.imagenes && p.imagenes.length > 1
            ? `<button class="prev-slide">&#10094;</button> 
               <button class="next-slide">&#10095;</button>
               <div class="slider-indicators"></div>`
            : '';

        // Badges de tecnologías
        const techHtml = p.tecnologias && p.tecnologias.length > 0
            ? p.tecnologias.map(t => `
                <div class="technology-item">
                    <img src="${t.icono}" alt="${t.nombre}" title="${t.nombre}">
                </div>`).join('')
            : `<p class="no-technologies">Sin tecnologías especificadas</p>`;

        // Botones de enlace
        const btnProyecto = p.url_proyecto 
            ? `<a href="${p.url_proyecto}" class="button primary-button" target="_blank">Ver Proyecto</a>` 
            : '';
        const btnCodigo = p.url_repositorio 
            ? `<a href="${p.url_repositorio}" class="button secondary-button" target="_blank">Ver Código</a>` 
            : '';

        return `
            <div class="project-card">
                <div class="project-image-container">
                    <div class="slider-inner">${imgsHtml}</div>
                    ${controlsHtml}
                </div>
                <div class="project-details">
                    <h3>${p.titulo}</h3>
                    <p class="project-description">${p.descripcion} - ${p.fecha}</p>
                    <div class="project-technologies">${techHtml}</div>
                    <div class="project-buttons">${btnProyecto}${btnCodigo}</div>
                </div>
            </div>
        `;
    }).join('');

    // Reinicializar el carrusel de imágenes si existe la función en carrusel_imagenes.js
    if (typeof initCarrusel === 'function') {
        initCarrusel();
    }
}

// 3. Renderizar Habilidades Técnicas
function renderSkills(skills) {
    const container = document.getElementById('skills-container');
    if (!container || !skills) return;

    container.innerHTML = skills.map(s => `
        <div class="skill-card">
            ${s.icono ? `
            <div class="skill-icon-container">
                <img src="${s.icono}" alt="Icono de ${s.nombre}" class="skill-icon">
            </div>` : ''}
            <h3 class="skill-title">${s.nombre}</h3>
            <p class="skill-nivel">${s.nivel}</p>
        </div>
    `).join('');
}

// 4. Renderizar Habilidades Blandas
function renderSoftSkills(softSkills) {
    const container = document.getElementById('soft-skills-container');
    if (!container || !softSkills) return;

    container.innerHTML = softSkills.map(s => `
        <div class="soft-skill-card">
            <h3 class="soft-skill-title">${s.nombre || s.titulo}</h3>
            <p class="soft-skill-description">${s.descripcion}</p>
        </div>
    `).join('');
}

// 5. Renderizar Educación / Certificados
function renderEducacion(educacion) {
    const container = document.getElementById('education-container');
    if (!container || !educacion) return;

    container.innerHTML = educacion.map(e => `
        <div class="educacion-card">
            <h3>${e.titulo}</h3>
            <p>${e.institucion} - ${e.fecha_inicio} a ${e.fecha_fin}</p>
            <p>${e.descripcion}</p>
            ${e.certificado_pdf ? `
            <a href="${e.certificado_pdf}" class="button primary-button" target="_blank">Ver Certificado</a>
            ` : ''}
        </div>
    `).join('');
}

// 6. Renderizar Contacto y Footer dinámicamente
function renderContacto(perfil) {
    if (!perfil) return;

    const footer = document.getElementById('contact');
    if (!footer) return;

    footer.innerHTML = `
        <div class="footer-content">
            <div class="footer-section about">
                <h3>Sobre Mí</h3>
                <p>${perfil.bio || ''}</p>
            </div>
            <div class="footer-section contact-info">
                <h3>Información de Contacto</h3>
                ${perfil.ubicacion ? `
                <p>
                    <svg class="icon icon-map" viewBox="0 0 384 512" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="vertical-align: -0.125em; margin-right: 6px;">
                        <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 186c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
                    </svg> ${perfil.ubicacion}
                </p>` : ''}
                ${perfil.email ? `
                <p>
                    <svg class="icon icon-envelope" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="vertical-align: -0.125em; margin-right: 6px;">
                        <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 153.4-113 4.2-3.3 6.6-8.3 6.6-13.6V112c0-26.5-21.5-48-48-48H48c-26.5 0-48 21.5-48 48v40c0 5.3 2.4 10.3 6.6 13.6 10.6 8.3 20.7 16.7 153.4 113 16.8 12.2 50.2 41.8 73.4 41.4z"/>
                    </svg> <a href="mailto:${perfil.email}" style="color: inherit; text-decoration: none;">${perfil.email}</a>
                </p>` : ''}
                ${perfil.telefono ? `
                <p>
                    <svg class="icon icon-phone" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" aria-hidden="true" style="vertical-align: -0.125em; margin-right: 6px;">
                        <path d="M493.4 345.6L384 281.4c-16.1-9.4-36.4-5.3-47.8 9.8l-37.1 49.3c-23.7-12.7-47-25.9-69.5-48.4s-35.8-45.9-48.4-69.5l49.3-37.1c15.1-11.4 19.3-31.7 9.8-47.8L166.4 18.6c-10-17-32.2-22.3-48.8-11.8L28.1 63.1C11.5 73.7 1.3 92.1.2 112c-4.4 78.4 20.9 157.4 72.1 208.6s130.2 76.5 208.6 72.1c19.9-1.1 38.3-11.3 48.8-28.1l56.3-89.5c10.5-16.6 5.2-38.8-11.8-48.8z"/>
                    </svg> <a href="tel:${perfil.telefono}" style="color: inherit; text-decoration: none;">${perfil.telefono}</a>
                </p>` : ''}
            </div>
            <div class="footer-section social-links">
                <h3>Sígueme</h3>
                <div class="social-icons">
                    ${perfil.github ? `
                    <a href="${perfil.github}" target="_blank" aria-label="GitHub" style="display: inline-flex; align-items: center; gap: 6px; text-decoration: none;">
                        <svg class="icon icon-github" viewBox="0 0 496 512" width="1.1em" height="1.1em" fill="currentColor" aria-hidden="true">
                            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-21.8-1.4c-.6 2 1.3 4.1 4.2 4.7 3.1.6 6-.7 6.6-2.8.6-2-1.3-4.2-4.2-4.7-3.2-.6-6 .7-6.6 2.8zm113.9-5.8c-1.6 2.2-1 4.8 1.3 5.8 2.2 1 4.8-.4 6.3-2.8 1.5-2.2 1-4.8-1.3-5.8-2.2-1-4.8.4-6.3 2.8zm-26-7.2c-2.3 1.3-3.2 3.9-2 6.2 1.3 2.3 4.1 3.2 6.2 2 2.3-1.3 3.2-3.9 2-6.2-1.3-2.3-4.1-3.2-6.2-2zm-35.3-4.3c-2.7.8-4.2 3.6-3.3 6.3 1.3 2.7 4.1 4.1 6.8 3.3 2.7-.8 4.2-3.6 3.3-6.3-1.3-2.7-4.1-4.1-6.8-3.3zm-7.6-9.1c-3.4 1.3-4.6 4.7-3 8 1.5 3.4 5.2 4.9 8.5 3.6 3.4-1.3 4.6-4.7 3-8-1.4-3.4-5.2-4.9-8.5-3.6zm-16.5-12.1c-2.5 2.7-1.9 6.6 1.3 8.8 3.3 2.2 7.4.9 9.8-1.8 2.5-2.7 1.9-6.6-1.3-8.8-3.3-2.2-7.4-.9-9.8 1.8zm383.9-118.1c0-48.4-19.4-82.6-19.4-82.6 0-3.3-13-33.3-3.3-73.4 0 0-10.3-3.3-33.7 13.1-9.9-2.7-20.7-4-31.1-4.2-10.4.2-21.2 1.5-31.1 4.2-23.4-16.4-33.7-13.1-33.7-13.1-9.7 40.1-3.3 70.1-3.3 73.4 0 0-19.4 34.2-19.4 82.6 0 74.6 45.4 91.9 88.5 96.7-6.1 5.3-11.6 15.6-11.6 31.5 0 22.8-.2 41.1-.2 46.8 0 4.6 3 9.9 11.7 8.3 68.6-22.8 117.2-87.5 117.2-164.2zm-123 189c-6.6 1.3-13.4-1.4-13.4-8.3V303c0-14-4.9-24.1-10.4-29 33.6-3.7 68.9-16.7 68.9-75.3 0-16.7-5.9-30.3-15.6-41 .1-3.9 6.8-19.4-1.5-40.5 0 0-12.8-4.1-42.2 15.8-12.2-3.4-25.2-5.1-38.3-5.2-13.1.1-26.1 1.8-38.3 5.2-29.4-19.9-42.2-15.8-42.2-15.8-8.3 21.1-1.6 36.6-1.5 40.5-9.7 10.7-15.6 24.3-15.6 41 0 58.4 35.2 71.4 68.8 75.2-4.3 3.8-8.2 10.7-9.6 20.6-8.6 3.9-30.6 10.6-44.1-12.6 0 0-8-14.5-23.2-15.5 0 0-14.7-.2-1 9.2 0 0 9.9 4.6 16.7 22 0 0 8.8 29.2 50.7 20v24.2c0 6.9-6.8 9.6-13.4 8.3-101.2-33.6-173.8-128.7-173.8-242C0 111.8 111.8 0 248 0s248 111.8 248 248c0 113.3-72.6 208.4-173.8 242z"/>
                        </svg> GitHub
                    </a>` : ''}
                    ${perfil.linkedin ? `
                    <a href="${perfil.linkedin}" target="_blank" aria-label="LinkedIn" style="display: inline-flex; align-items: center; gap: 6px; text-decoration: none;">
                        <svg class="icon icon-linkedin" viewBox="0 0 448 512" width="1.1em" height="1.1em" fill="currentColor" aria-hidden="true">
                            <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 1 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                        </svg> LinkedIn
                    </a>` : ''}
                    ${perfil.twitter ? `
                    <a href="${perfil.twitter}" target="_blank" aria-label="Twitter" style="display: inline-flex; align-items: center; gap: 6px; text-decoration: none;">
                        <svg class="icon icon-twitter" viewBox="0 0 512 512" width="1.1em" height="1.1em" fill="currentColor" aria-hidden="true">
                            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                        </svg> Twitter
                    </a>` : ''}
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} ${perfil.nombre}. Todos los derechos reservados.</p>
        </div>
    `;
}