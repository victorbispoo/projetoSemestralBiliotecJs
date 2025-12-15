fetch('../FrontEnd/Header.html')
  .then(r => r.text())
  .then(html => {
    document.getElementById('header-placeholder').innerHTML = html;

    // mobile toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('is-open'));
    }

    // search form
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    if (searchForm && searchInput) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = searchInput.value.trim();
        if (!q) return;
        window.location.href = `../FrontEnd/resultados.html?q=${encodeURIComponent(q)}`;
      });
    }

    // --- Determina se é admin (robusto) ---
    const isAdminRaw = localStorage.getItem('isAdmin');
    const perfilRaw = localStorage.getItem('perfil');

    // normaliza: string "true" ou boolean-like, ou verifica perfil
    let isAdmin = String(isAdminRaw) === 'true';
    if (!isAdmin && perfilRaw) {
      isAdmin = String(perfilRaw).trim().toLowerCase() === 'admin';
    }

    console.log('[header] isAdminRaw=', isAdminRaw, 'perfilRaw=', perfilRaw, '=> isAdmin=', isAdmin);

    // --- Desktop: elemento com id 'gerir-menu' ---
    const gerirDesktop = document.getElementById('gerir-menu');
    if (gerirDesktop) {
      gerirDesktop.style.display = isAdmin ? '' : 'none';
    }

    // --- Mobile: encontra qualquer link que aponte para a página de admin e oculta o <li> pai ---
    const mobileAnchors = document.querySelectorAll('#mobile-menu a[href*="FrontDoADM/adm.html"], #mobile-menu a[href*="/FrontDoADM/adm.html"], #mobile-menu a[href*="adm.html"]');
    mobileAnchors.forEach(a => {
      const li = a.closest('li');
      if (li) li.style.display = isAdmin ? '' : 'none';
    });

    // --- Também cobre casos com classe .gerir-menu (se existir) ---
    document.querySelectorAll('.gerir-menu').forEach(el => {
      el.style.display = isAdmin ? '' : 'none';
    });

    // --- logout listener: botão dentro do header (se existir) ---
    const sairBtn = document.getElementById('sairPerfilBtn');
    if (sairBtn) {
      sairBtn.addEventListener('click', () => {
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('perfil');
        localStorage.removeItem('userId'); // padronize para userId
        // opcional: localStorage.clear(); // cuidado: remove tudo
        window.location.href = '../FrontEnd/telaLogin.html';
      });
    }
  })
  .catch(err => console.error('Erro ao carregar Header.html:', err));
