// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initPortfolioFilters();
    initPortfolioModal();
    initForms();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger lines
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Handle focus trapping for accessibility
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                navToggle.focus();
            }
        });
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add stagger delay for grid items
                if (entry.target.parentElement && entry.target.parentElement.classList.contains('preview-grid')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach(el => {
        observer.observe(el);
    });
}

// Portfolio Filters
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards with animation
            portfolioCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    }, 200);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Portfolio Modal
function initPortfolioModal() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const modal = document.getElementById('project-modal');
    
    if (!modal) return;
    
    const modalTitle = document.getElementById('modal-title');
    const modalLocation = document.getElementById('modal-location');
    const modalDescription = document.getElementById('modal-description');
    const modalServices = document.getElementById('modal-services');
    const modalClose = modal.querySelector('.modal-close');
    const modalBackdrop = modal.querySelector('.modal-backdrop');
    
    // Project data
    const projectData = {
        'mayfair-penthouse': {
            title: 'Mayfair Penthouse',
            location: 'Mayfair, London',
            description: 'A stunning contemporary penthouse transformation overlooking Hyde Park. This project seamlessly blends modern luxury with classical proportions, featuring floor-to-ceiling windows that flood the space with natural light. The design emphasises clean lines and premium materials, creating an atmosphere of refined sophistication that complements the prestigious Mayfair location.',
            services: ['Architectural CGI Visualisation', '360° Virtual Reality Tours', 'Bespoke Joinery Design', 'Premium Material Selection', 'Full Project Management', 'Interior Styling']
        },
        'chelsea-townhouse': {
            title: 'Chelsea Townhouse',
            location: 'Chelsea, London',
            description: 'A carefully curated restoration of a Victorian townhouse that celebrates its heritage whilst embracing contemporary living. Period features have been lovingly restored and complemented by modern interventions that enhance functionality. The design strikes a perfect balance between preserving character and creating spaces that serve modern family life.',
            services: ['Heritage Building Consultation', 'Custom Furniture Design', 'Period Feature Restoration', 'Modern Kitchen Integration', 'Full Project Management', 'Sustainable Design Solutions']
        },
        'canary-wharf-office': {
            title: 'Canary Wharf Executive Office',
            location: 'Canary Wharf, London',
            description: 'An executive workspace designed to inspire productivity and reflect corporate success. The design leverages spectacular city views whilst creating intimate meeting spaces and collaborative zones. Premium materials and cutting-edge technology integration ensure this office environment supports both focused work and impressive client entertainment.',
            services: ['Commercial Space Planning', 'Executive Furniture Selection', 'Technology Integration', 'Custom Millwork Design', 'Lighting Design', 'Brand Environment Creation']
        },
        'kensington-residence': {
            title: 'Kensington Family Residence',
            location: 'Kensington, London',
            description: 'A thoughtfully designed family home that balances elegance with the practical needs of daily life. Child-friendly materials and safety considerations are seamlessly integrated without compromising on style. The design creates distinct zones for family gatherings, quiet retreat, and entertaining, all unified by a cohesive material palette.',
            services: ['Family-Focused Design', 'Bespoke Storage Solutions', 'Child-Safe Material Selection', '360° Design Visualisation', 'Custom Furniture Creation', 'Interior Architecture']
        },
        'shoreditch-showroom': {
            title: 'Shoreditch Design Showroom',
            location: 'Shoreditch, London',
            description: 'An industrial-chic showroom that celebrates raw materials whilst providing the perfect backdrop for contemporary furniture collections. Exposed brick, steel beams, and polished concrete create an authentic urban aesthetic that allows products to take centre stage whilst creating an inspiring shopping environment.',
            services: ['Retail Space Design', 'Display System Creation', 'Industrial Aesthetic Development', 'Customer Journey Planning', 'Brand Environment Design', 'Lighting Strategy']
        },
        'notting-hill-flat': {
            title: 'Notting Hill Garden Flat',
            location: 'Notting Hill, London',
            description: 'A bright and airy garden flat maximising every square foot through clever design and custom storage solutions. The connection to the private garden is enhanced through material choices and sight lines that blur interior and exterior boundaries. Light colours and reflective surfaces amplify the natural illumination throughout the day.',
            services: ['Small Space Optimisation', 'Custom Storage Design', 'Garden Integration', 'Natural Light Enhancement', 'Space Planning', 'Sustainable Material Selection']
        },
        'covent-garden-restaurant': {
            title: 'Covent Garden Restaurant',
            location: 'Covent Garden, London',
            description: 'A sophisticated dining environment that balances intimacy with operational efficiency. Acoustic solutions ensure comfortable conversation levels whilst the design creates distinct dining zones. The material palette references the historic Covent Garden location whilst feeling thoroughly contemporary and inviting.',
            services: ['Restaurant Design', 'Acoustic Engineering', 'Custom Lighting Systems', 'Operational Flow Planning', 'Brand Integration', 'Heritage-Sensitive Design']
        },
        'richmond-townhouse': {
            title: 'Richmond Family Townhouse',
            location: 'Richmond, London',
            description: 'A Victorian townhouse reimagined for modern family living with seamless integration between interior and garden spaces. Sustainable design principles guide material selection and energy efficiency improvements. The design celebrates the property\'s period character whilst introducing contemporary elements that enhance daily life.',
            services: ['Victorian Renovation', 'Garden Integration Design', 'Sustainable Systems', 'Energy Efficiency Upgrades', 'Family Space Planning', 'Heritage Conservation']
        }
    };
    
    portfolioCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.dataset.project;
            const project = projectData[projectId];
            
            if (project) {
                modalTitle.textContent = project.title;
                modalLocation.textContent = project.location;
                modalDescription.innerHTML = `<p>${project.description}</p>`;
                modalServices.innerHTML = '';
                project.services.forEach(service => {
                    const li = document.createElement('li');
                    li.textContent = service;
                    modalServices.appendChild(li);
                });
                
                openModal(modal);
            }
        });
    });
    
    // Close modal events
    modalClose.addEventListener('click', () => closeModal(modal));
    modalBackdrop.addEventListener('click', () => closeModal(modal));
    
    // Keyboard accessibility
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModal(modal);
        }
    });
}

// Modal utility functions
function openModal(modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus first focusable element in modal
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
}

function closeModal(modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Form Handling
function initForms() {
    // Brochure form
    const brochureForm = document.getElementById('brochure-form');
    if (brochureForm) {
        brochureForm.addEventListener('submit', handleBrochureSubmit);
    }
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Form validation on input
    document.querySelectorAll('input[required], select[required], textarea[required]').forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('input', clearFieldError);
    });
}

function handleBrochureSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const isValid = validateForm(form);
    
    if (isValid) {
        // Simulate form submission
        showSuccessModal();
        form.reset();
    }
}

function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const isValid = validateForm(form);
    
    if (isValid) {
        // Simulate form submission
        showContactSuccessModal();
        form.reset();
    }
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(`${field.id}-error`) || document.getElementById(`${fieldName}-error`);
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${getFieldLabel(field)} is required.`;
    }
    // Email validation
    else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
    }
    
    // Display error
    if (errorElement) {
        errorElement.textContent = errorMessage;
        field.classList.toggle('error', !isValid);
    }
    
    return isValid;
}

function clearFieldError(event) {
    const field = event.target;
    const fieldName = field.name;
    const errorElement = document.getElementById(`${field.id}-error`) || document.getElementById(`${fieldName}-error`);
    
    if (errorElement) {
        errorElement.textContent = '';
        field.classList.remove('error');
    }
}

function getFieldLabel(field) {
    const label = document.querySelector(`label[for="${field.id}"]`);
    return label ? label.textContent.replace('*', '').trim() : field.name;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        openModal(modal);
    }
}

function showContactSuccessModal() {
    const modal = document.getElementById('contact-success-modal');
    if (modal) {
        openModal(modal);
    }
}

// Global functions for modal closing (called from HTML)
function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        closeModal(modal);
    }
}

function closeContactSuccessModal() {
    const modal = document.getElementById('contact-success-modal');
    if (modal) {
        closeModal(modal);
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
let ticking = false;
function requestTick(callback) {
    if (!ticking) {
        requestAnimationFrame(callback);
        ticking = true;
    }
}

// Header scroll effect (optional enhancement)
window.addEventListener('scroll', () => {
    requestTick(() => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        ticking = false;
    });
});
