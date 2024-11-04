// Get elements
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const companyNameImg = document.getElementById('companyNameImg');
const modeIconSidebar = document.getElementById('modeIconSidebar');
const logo = document.getElementById('logo');
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
    document.querySelector('.footer').classList.toggle('dark-mode'); // Toggle footer dark mode

    if (document.body.classList.contains('dark-mode')) {
        companyNameImg.src = 'assets/svgs/whitenexteranametop.svg';
        hamburger.querySelector('img').src = 'assets/svgs/existhamburger.svg';
        modeIconSidebar.src = 'assets/svgs/lightmode.svg';
        modeIconSidebar.setAttribute('data-text', 'Default');
        logo.src = 'assets/svgs/logo-white.svg';
        document.body.style.backgroundColor = '#2C3135'; // Dark background color
        sidebar.style.backgroundColor = '#2C3135'; // Dark sidebar background color
        document.querySelector('.navbar-custom').style.backgroundColor = '#2C3135'; // Dark navbar background color
        localStorage.setItem('theme', 'dark'); // Save preference
    } else {
        companyNameImg.src = 'assets/svgs/nexteranametop.svg';
        hamburger.querySelector('img').src = 'assets/svgs/hamburger.svg';
        modeIconSidebar.src = 'assets/svgs/darkmode.svg';
        modeIconSidebar.setAttribute('data-text', 'Night');
        logo.src = 'assets/svgs/logo.svg';
        document.body.style.backgroundColor = '#BEABE0'; // Light background color
        sidebar.style.backgroundColor = '#BEABE0'; // Light sidebar background color
        document.querySelector('.navbar-custom').style.backgroundColor = '#564CC0'; // Light navbar background color
        localStorage.setItem('theme', 'light'); // Save preference
    }
}

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('.navbar-custom').classList.add('dark-mode');
        document.querySelector('.sidebar').classList.add('dark-mode');
        document.querySelector('.footer').classList.add('dark-mode'); // Apply footer dark mode
        companyNameImg.src = 'assets/svgs/whitenexteranametop.svg';
        hamburger.querySelector('img').src = 'assets/svgs/existhamburger.svg';
        modeIconSidebar.src = 'assets/svgs/lightmode.svg';
        modeIconSidebar.setAttribute('data-text', 'Default');
        logo.src = 'assets/svgs/logo-white.svg';
        document.body.style.backgroundColor = '#2C3135'; // Dark background color
        sidebar.style.backgroundColor = '#2C3135'; // Dark sidebar background color
        document.querySelector('.navbar-custom').style.backgroundColor = '#2C3135'; // Dark navbar background color
    }
});

// Select the tooltip element
const tooltip = document.getElementById('tooltip');
let tooltipTimeout;

// Function to show the tooltip
function showTooltip(event) {
    const tooltipText = event.target.getAttribute('data-text');
    if (tooltipText && !sidebar.contains(event.target)) { // Check if the target is not inside the sidebar
        tooltip.textContent = tooltipText;
        tooltip.style.left = `${event.pageX - tooltip.offsetWidth - 10}px`; // Position to the left of the cursor
        tooltip.style.top = `${event.pageY + 10}px`; // Position slightly below the cursor
        tooltip.classList.add('show');
        tooltip.style.opacity = '1'; // Ensure tooltip is fully visible
        clearTimeout(tooltipTimeout); // Clear any existing timeout
    }
}

// Function to hide the tooltip
function hideTooltip() {
    tooltipTimeout = setTimeout(() => {
        tooltip.style.opacity = '0'; // Start fading out
        tooltip.classList.remove('show');
    }
    , 200); // Hide after 200ms
}

// Add event listeners to elements with tooltips
document.querySelectorAll('[data-text]').forEach(element => {
    element.addEventListener('mousemove', showTooltip);
    element.addEventListener('mouseout', hideTooltip);
});