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
});
