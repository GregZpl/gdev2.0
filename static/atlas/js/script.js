document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.id = 'dark-mode-style';
    themeLink.href = '/static/css/dark-mode.css';
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            document.head.appendChild(themeLink);
            localStorage.setItem('theme', 'dark');
        } else {
            if (document.getElementById('dark-mode-style')) {
                document.getElementById('dark-mode-style').remove();
            }
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        document.head.appendChild(themeLink);
    }
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Send data to Flask backend
            fetch('/submit_contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                formMessage.innerHTML = `<p class="success">${data.message}</p>`;
                formMessage.style.color = '#4CAF50';
                contactForm.reset();
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    formMessage.innerHTML = '';
                }, 5000);
            })
            .catch(error => {
                formMessage.innerHTML = `<p class="error">There was an error sending your message. Please try again.</p>`;
                formMessage.style.color = '#f44336';
            });
        });
    }
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = document.body.classList.contains('dark-mode') 
                ? 'rgba(30, 30, 30, 0.95)' 
                : 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = document.body.classList.contains('dark-mode') 
                ? 'rgba(30, 30, 30, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Logo placeholder replacement instructions
    console.log("To add your logo: Replace /static/images/logo-placeholder.png with your logo file");
    console.log("Update the hero background: Replace /static/images/studio-bg.jpg with your studio image");
});