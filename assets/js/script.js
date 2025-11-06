// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('nav-menu-open');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('nav-menu-open');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Skill section - no longer using progress bars
// The skills are displayed as simple list items

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // In a real application, you would send this data to a server
        // For now, we'll just show an alert
        alert(`Thank you ${name}! Your message has been sent. We'll get back to you soon.`);
        
        // Reset form
        this.reset();
    });
}

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.padding = '1rem 0';
    }
});

// Add animation to sections when they come into view
const animateOnScroll = () => {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
};

// Initialize scroll animations
animateOnScroll();





// Dark mode is now default - remove theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Always set to dark mode
    document.body.classList.add('dark-mode');
    
    // Hide the theme toggle button since we're always in dark mode
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.style.display = 'none';
    }
});

// Project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryCards = document.querySelectorAll('.category-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Handle category card filtering (for home page)
    if (categoryCards.length > 0 && projectCards.length > 0) {
        // Set default active state on page load
        const allProjectsCard = document.querySelector('.category-card[data-category="all"]');
        if (allProjectsCard) {
            allProjectsCard.classList.add('active');
        }
        
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                // Remove active class from all cards
                categoryCards.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked card
                card.classList.add('active');
                
                const filter = card.getAttribute('data-category');
                
                // Update filter buttons to match (on projects page)
                filterBtns.forEach(btn => {
                    if (btn && btn.getAttribute('data-category') === filter) {
                        btn.classList.add('active');
                    } else if (btn) {
                        btn.classList.remove('active');
                    }
                });
                
                projectCards.forEach(project => {
                    if (filter === 'all' || project.getAttribute('data-category') === filter) {
                        project.classList.remove('hidden');
                    } else {
                        project.classList.add('hidden');
                    }
                });
            });
        });
    }
    
    // Handle filter button filtering (for projects page)
    if (filterBtns.length > 0 && projectCards.length > 0) {
        // Set default active state on page load
        const allProjectsBtn = document.querySelector('.filter-btn[data-category="all"]');
        if (allProjectsBtn) {
            allProjectsBtn.classList.add('active');
        }
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-category');
                
                // Update category cards to match (on home page)
                if (categoryCards.length > 0) {
                    categoryCards.forEach(card => {
                        if (card.getAttribute('data-category') === filter) {
                            card.classList.add('active');
                        } else {
                            card.classList.remove('active');
                        }
                    });
                }
                
                projectCards.forEach(project => {
                    if (filter === 'all' || project.getAttribute('data-category') === filter) {
                        project.classList.remove('hidden');
                    } else {
                        project.classList.add('hidden');
                    }
                });
            });
        });
    }
});