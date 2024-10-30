// Get elements
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const companyNameImg = document.getElementById('companyNameImg');
const modeIconSidebar = document.getElementById('modeIconSidebar');
const logo = document.getElementById('logo');
const lightModeBtn = document.getElementById('lightModeBtn');
const darkModeBtn = document.getElementById('darkModeBtn');
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

// Add hover effect to sidebar links
const sidebarLinks = document.querySelectorAll('.sidebar a');

sidebarLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        document.body.classList.add('blur');
        sidebarLinks.forEach(sibling => {
            if (sibling !== link) {
                sibling.style.filter = 'blur(2px)';
            }
        });
    });

    link.addEventListener('mouseleave', () => {
        document.body.classList.remove('blur');
        sidebarLinks.forEach(sibling => {
            sibling.style.filter = '';
        });
    });
});

// Toggle dark mode function
function toggleMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.navbar-custom').classList.toggle('dark-mode');
    document.querySelector('.sidebar').classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        companyNameImg.src = 'assets/svgs/whitenexteranametop.svg';
        hamburger.querySelector('img').src = 'assets/svgs/existhamburger.svg';
        modeIconSidebar.src = 'assets/svgs/lightmode.svg';
        logo.src = 'assets/svgs/logo-white.svg';
        document.body.style.backgroundColor = '#2C3135'; // Dark background color
        sidebar.style.backgroundColor = '#2C3135'; // Dark sidebar background color
        document.querySelector('.navbar-custom').style.backgroundColor = '#2C3135'; // Dark navbar background color
    } else {
        companyNameImg.src = 'assets/svgs/nexteranametop.svg';
        hamburger.querySelector('img').src = 'assets/svgs/hamburger.svg';
        modeIconSidebar.src = 'assets/svgs/darkmode.svg';
        logo.src = 'assets/svgs/logo.svg';
        document.body.style.backgroundColor = '#BEABE0'; // Light background color
        sidebar.style.backgroundColor = '#BEABE0'; // Light sidebar background color
        document.querySelector('.navbar-custom').style.backgroundColor = '#564CC0'; // Light navbar background color
    }
}

// Add event listeners to light and dark mode buttons
lightModeBtn.addEventListener('click', function() {
    // Keep everything as default (light mode)
    if (document.body.classList.contains('dark-mode')) {
        toggleMode();
    }
    // Close the popup
    document.getElementById('modeModal').style.display = 'none';
});

darkModeBtn.addEventListener('click', function() {
    // Activate dark mode
    if (!document.body.classList.contains('dark-mode')) {
        toggleMode();
    }
    // Close the popup
    document.getElementById('modeModal').style.display = 'none';
});