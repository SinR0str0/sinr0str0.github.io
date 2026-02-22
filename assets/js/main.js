// Efecto de Escritura
const textElement = document.getElementById('typing-text');

if (textElement) {
    const phrases = [
        "Estudiante de Matemáticas Aplicadas y Computación",
        "Programador Competitivo",
        "Futuro Ingeniero de Software",
        "Entusiasta de la Ciberseguridad"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    type();
}

// Desplazamiento Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Cargar Proyectos de JSON
const projectsContainer = document.getElementById('projects-container');

if (projectsContainer) {
    fetch('./data/projects.json')
        .then(response => response.json())
        .then(projects => {
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';

                projectCard.innerHTML = `
                    <img src="${project.image}" alt="${project.title}" class="project-image">
                    <div class="project-content">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-tech">
                            ${project.technologies.map(tech => 
                                `<span class="tech-tag">${tech}</span>`
                            ).join('')}
                        </div>
                        <div class="project-links">
                            ${project.github ? 
                                `<a href="${project.github}" target="_blank">
                                    <i class="fa-brands fa-github"></i> Código
                                </a>` : ''}
                            ${project.demo ? 
                                `<a href="${project.demo}" target="_blank">
                                    <i class="fa-solid fa-external-link"></i> Demo
                                </a>` : ''}
                        </div>
                    </div>
                `;

                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            projectsContainer.innerHTML = `
                <p style="text-align: center; color: var(--text-muted);">
                    Cargando proyectos...
                </p>
            `;
        });
}

// Animación de Desplazamiento
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .education-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
