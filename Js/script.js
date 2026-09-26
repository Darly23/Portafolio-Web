document.addEventListener('DOMContentLoaded', () => {
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 1. TEMA CLARO / OSCURO (CON PERSISTENCIA LOCALSTORAGE)
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem('theme-preference') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme-preference', theme);
  }

  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });

  // 2. MENÚ RESPONSIVE
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    mobileMenuBtn.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // 3. FILTRO DE PROYECTOS POR TECNOLOGÍA
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterCategory = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category') || '';
        if (filterCategory === 'all' || cardCategories.includes(filterCategory)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. BOTÓN VOLVER ARRIBA Y NAVEGACIÓN ACTIVA EN SCROLL
  const backToTopBtn = document.getElementById('backToTopBtn');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // FUNCIÓN PARA MOSTRAR NOTIFICACIÓN TOAST
  function showToast(message, isError = false) {
    let toast = document.getElementById('customToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'customToast';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    
    toast.innerHTML = isError 
      ? '<i class="fas fa-exclamation-circle"></i> ' + message
      : '<i class="fas fa-check-circle"></i> ' + message;
      
    toast.style.backgroundColor = isError ? '#ff4a4a' : 'var(--color-success)';
    
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // VALIDACIÓN DEL FORMULARIO
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userName = document.getElementById('userName').value.trim();
      const userEmail = document.getElementById('userEmail').value.trim();
      const userMessage = document.getElementById('userMessage').value.trim();

      if (!userName || !userEmail || !userMessage) {
        showToast('Por favor, completa todos los campos del formulario.', true);
        return;
      }

      if (!userEmail.includes('@') || !userEmail.includes('.')) {
        showToast('Por favor, ingresa un correo electrónico válido.', true);
        return;
      }

      showToast('¡Gracias, ' + userName + '! Tu mensaje ha sido enviado exitosamente.');
      contactForm.reset();
    });
  }
});
