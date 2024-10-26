// Get elements
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
document.querySelector('.company-name img');
let overlay;

// Create overlay element
function createOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Close sidebar when clicking overlay
    overlay.addEventListener('click', toggleSidebar);
}

// Call createOverlay when page loads
createOverlay();

// Toggle sidebar function
function toggleSidebar() {
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');

    // Prevent scrolling when sidebar is open
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
}

// Close sidebar when pressing ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && sidebar.classList.contains('active')) {
        toggleSidebar();
    }
});

// Close sidebar when clicking outside
document.addEventListener('click', function(event) {
    const isClickInside = sidebar.contains(event.target) || hamburger.contains(event.target);

    if (!isClickInside && sidebar.classList.contains('active')) {
        toggleSidebar();
    }
});

// Add event listener to hamburger
hamburger.addEventListener('click', toggleSidebar);

const sidebarLinks = document.querySelectorAll('.sidebar a');

sidebarLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.classList.add('hovered');
    });

    link.addEventListener('mouseleave', () => {
        link.classList.remove('hovered');
    });
});

function toggleMode() {
    const modeIconSidebar = document.getElementById('modeIconSidebar');
    const companyNameImg = document.getElementById('companyNameImg');
    const hamburger = document.getElementById('hamburger');

    document.body.classList.toggle('dark-mode');
    document.querySelector('.navbar-custom').classList.toggle('dark-mode');
    document.querySelector('.sidebar').classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        document.body.style.backgroundColor = '#2C3135';
        companyNameImg.src = 'assets/svgs/whitenexteranametop.svg';
        hamburger.querySelector('img').src = 'assets/svgs/existhamburger.svg';
        modeIconSidebar.src = 'assets/svgs/lightmode.svg';
        logo.src ='assets/svgs/logo-white.svg'
    } else {
        document.body.style.backgroundColor = 'rgba(190, 171, 224, 0.79)';
        companyNameImg.src = 'assets/svgs/nexteranametop.svg';
        hamburger.querySelector('img').src = 'assets/svgs/hamburger.svg';
        modeIconSidebar.src = 'assets/svgs/darkmode.svg';
        logo.src ='assets/svgs/logo.svg'
    }
}

