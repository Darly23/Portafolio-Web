// Archivo principal de javascript

document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidad del Menú Hamburguesa
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navIcon = mobileMenu.querySelector('i');

    mobileMenu.addEventListener('click', () => {
        // Alterna la clase 'active' que hace visible el menú en CSS
        navLinks.classList.toggle('active');
        
        // Cambia el ícono de barras a una 'X' cuando se abre
        if (navLinks.classList.contains('active')) {
            navIcon.classList.remove('fa-bars');
            navIcon.classList.add('fa-times');
        } else {
            navIcon.classList.remove('fa-times');
            navIcon.classList.add('fa-bars');
        }
    });

    // Cerrar el menú automáticamente al hacer clic en un enlace (para móviles)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navIcon.classList.remove('fa-times');
            navIcon.classList.add('fa-bars');
        });
    });

    // 2. Validación de Formulario de Contacto
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Previene que la página se recargue
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const status = document.getElementById('formStatus');

            // Validar que no haya campos vacíos
            if(!name || !email || !message) {
                status.textContent = "Por favor, completa todos los campos.";
                status.style.color = "#ef4444"; // Color rojo error
                return;
            }

            // Validar formato de correo electrónico básico
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)) {
                status.textContent = "Por favor, introduce un correo electrónico válido.";
                status.style.color = "#ef4444";
                return;
            }

            // Simulación de envío exitoso
            status.textContent = "¡Mensaje enviado con éxito! Te contactaré pronto.";
            status.style.color = "var(--color-primary)";
            contactForm.reset();
            
            // Borrar el mensaje después de 5 segundos
            setTimeout(() => {
                status.textContent = "";
            }, 5000);
        });
    }
});
