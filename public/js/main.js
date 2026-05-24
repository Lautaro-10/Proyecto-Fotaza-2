document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Tema Guardado o del Sistema
    const currentTheme = localStorage.getItem('theme') ||
        (prefersDarkScheme.matches ? 'dark' : 'light');

    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="ph ph-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="ph ph-moon"></i>';
    }

    // Cambio del Tema
    themeToggle.addEventListener('click', () => {
        let theme = document.body.getAttribute('data-theme');
        if (theme === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="ph ph-moon"></i>';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="ph ph-sun"></i>';
        }
    });
});

const boton_crear_cuenta = document.getElementById('btn-crear-cuenta');

boton_crear_cuenta.addEventListener('click', () =>{
alert('¡¡Recuerde que debe tener mas de 16 años para crear una cuenta..¡¡');
});


