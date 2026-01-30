<<<<<<< HEAD
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initFAQ();
    initPackageButtons();
    initContactButton();
    initHoverEffects();
    initSmoothScrolling();
    console.log('Website initialized successfully');
});

// FAQ Toggle Functionality
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const toggle = this.querySelector('.faq-toggle');
            
            // Check if this FAQ is already active
            const isActive = answer.classList.contains('active');
            
            // Close all FAQs first
            closeAllFAQs();
            
            // If this wasn't active, open it
            if (!isActive) {
                answer.classList.add('active');
                toggle.classList.add('active');
                faqItem.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
            }
        });
    });
    
    function closeAllFAQs() {
        document.querySelectorAll('.faq-answer').forEach(answer => {
            answer.classList.remove('active');
        });
        
        document.querySelectorAll('.faq-toggle').forEach(toggle => {
            toggle.classList.remove('active');
        });
        
        document.querySelectorAll('.faq-item').forEach(item => {
            item.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        });
    }
}

// Package Button Interactions
function initPackageButtons() {
    const packageButtons = document.querySelectorAll('.btn-package');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.getAttribute('data-package');
            const price = this.parentElement.querySelector('.price').textContent;
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show confirmation message
            showPackageModal(packageName, price);
        });
    });
}

// Contact Button Functionality
function initContactButton() {
    const contactBtn = document.querySelector('.btn-contact');
    
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            // Scroll to contact section if not already there
            const contactSection = document.getElementById('contact');
            const currentScroll = window.scrollY;
            const contactTop = contactSection.offsetTop - 80;
            
            if (Math.abs(currentScroll - contactTop) > 100) {
                window.scrollTo({
                    top: contactTop,
                    behavior: 'smooth'
                });
                
                // Wait for scroll then show modal
                setTimeout(() => {
                    showContactModal();
                }, 800);
            } else {
                showContactModal();
            }
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Hover Effects for Interactive Elements
function initHoverEffects() {
    // Project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // Service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Addon cards
    const addonCards = document.querySelectorAll('.addon-card');
    
    addonCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    // Add click event to any anchor links that scroll to sections
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
}

// Modal Functions
function showPackageModal(packageName, price) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay" id="packageModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Interested in ${packageName} Package</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Thank you for your interest in the <strong>${packageName}</strong> package (${price})!</p>
                    <p>This is a demo website. In a real implementation, this would:</p>
                    <ul>
                        <li>Open a contact form</li>
                        <li>Pre-fill the package information</li>
                        <li>Connect to a backend service</li>
                        <li>Send an email notification</li>
                    </ul>
                    <div class="modal-actions">
                        <button class="btn btn-secondary" id="modalClose">Close</button>
                        <button class="btn btn-primary" id="modalContact">Contact Now</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    addModalStyles();
    
    // Add event listeners to modal buttons
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalContact').addEventListener('click', function() {
        closeModal();
        setTimeout(() => {
            showContactModal();
        }, 300);
    });
    
    // Close modal when clicking outside
    document.querySelector('.modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

function showContactModal() {
    // Create contact modal HTML
    const modalHTML = `
        <div class="modal-overlay" id="contactModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Get in Touch</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p><strong>Contact Information:</strong></p>
                    <p>Email: hello@gregwebsites.co.uk</p>
                    <p>Location: Middlesbrough, UK</p>
                    <p>Response Time: Typically within a few hours during business hours</p>
                    
                    <div class="demo-form">
                        <p><strong>Demo Contact Form:</strong></p>
                        <div class="form-group">
                            <input type="text" placeholder="Your Name" class="form-input" id="demoName">
                        </div>
                        <div class="form-group">
                            <input type="email" placeholder="Your Email" class="form-input" id="demoEmail">
                        </div>
                        <div class="form-group">
                            <textarea placeholder="Your Message" class="form-input" id="demoMessage" rows="3"></textarea>
                        </div>
                        <p class="form-note">Note: This is a demo form. In a real website, this would submit to a backend.</p>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn btn-secondary" id="contactModalClose">Close</button>
                        <button class="btn btn-primary" id="demoSubmit">Send Demo Message</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners
    document.querySelector('#contactModal .modal-close').addEventListener('click', closeModal);
    document.getElementById('contactModalClose').addEventListener('click', closeModal);
    document.getElementById('demoSubmit').addEventListener('click', submitDemoForm);
    
    // Close modal when clicking outside
    document.querySelector('#contactModal .modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

function closeModal() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.remove();
    });
}

function submitDemoForm() {
    const name = document.getElementById('demoName').value;
    const email = document.getElementById('demoEmail').value;
    const message = document.getElementById('demoMessage').value;
    
    if (!name || !email || !message) {
        alert('Please fill in all fields to see the demo submission.');
        return;
    }
    
    // Show submission feedback
    alert(`Demo submitted!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\nIn a real website, this would be sent to the website owner.`);
    
    // Close modal
    closeModal();
    
    // Clear form (for if we reopen it)
    document.getElementById('demoName').value = '';
    document.getElementById('demoEmail').value = '';
    document.getElementById('demoMessage').value = '';
}

function addModalStyles() {
    // Only add styles if they haven't been added yet
    if (!document.getElementById('modal-styles')) {
        const styleHTML = `
            <style id="modal-styles">
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    animation: fadeIn 0.3s ease;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .modal-content {
                    background-color: white;
                    border-radius: 12px;
                    width: 90%;
                    max-width: 500px;
                    max-height: 90vh;
                    overflow-y: auto;
                    animation: slideUp 0.3s ease;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                }
                
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .modal-header {
                    padding: 20px;
                    border-bottom: 1px solid #eaeaea;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .modal-header h3 {
                    margin: 0;
                    color: #111111;
                    font-size: 1.5rem;
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: #666;
                    line-height: 1;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal-close:hover {
                    color: #111;
                }
                
                .modal-body {
                    padding: 20px;
                }
                
                .modal-body p {
                    margin-bottom: 15px;
                    line-height: 1.6;
                    color: #666;
                }
                
                .modal-body ul {
                    margin-bottom: 20px;
                    padding-left: 20px;
                    color: #666;
                }
                
                .modal-body li {
                    margin-bottom: 8px;
                }
                
                .modal-actions {
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                    margin-top: 25px;
                }
                
                .btn-secondary {
                    background-color: #666;
                }
                
                .btn-secondary:hover {
                    background-color: #555;
                }
                
                .btn-primary {
                    background-color: #4a6cf7;
                }
                
                .btn-primary:hover {
                    background-color: #3a5ce5;
                }
                
                .demo-form {
                    margin: 25px 0;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    border: 1px solid #eaeaea;
                }
                
                .form-group {
                    margin-bottom: 15px;
                }
                
                .form-input {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 1rem;
                    font-family: inherit;
                }
                
                .form-input:focus {
                    outline: none;
                    border-color: #4a6cf7;
                    box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.2);
                }
                
                .form-note {
                    font-size: 0.9rem;
                    color: #888;
                    font-style: italic;
                    margin-top: 10px;
                }
                
                textarea.form-input {
                    resize: vertical;
                    min-height: 80px;
                }
            </style>
        `;
        
        // Add styles to document
        document.head.insertAdjacentHTML('beforeend', styleHTML);
    }
}

// Add scroll animation for elements
function initScrollAnimations() {
    // Create Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.project-card, .service-card, .pricing-card').forEach(card => {
        observer.observe(card);
    });
}

// Initialize scroll animations on load
window.addEventListener('load', initScrollAnimations);

// Add console message for developers
console.log('Greg - Web Designer & Developer website loaded');
=======
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initFAQ();
    initPackageButtons();
    initContactButton();
    initHoverEffects();
    initSmoothScrolling();
    console.log('Website initialized successfully');
});

// FAQ Toggle Functionality
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const toggle = this.querySelector('.faq-toggle');
            
            // Check if this FAQ is already active
            const isActive = answer.classList.contains('active');
            
            // Close all FAQs first
            closeAllFAQs();
            
            // If this wasn't active, open it
            if (!isActive) {
                answer.classList.add('active');
                toggle.classList.add('active');
                faqItem.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
            }
        });
    });
    
    function closeAllFAQs() {
        document.querySelectorAll('.faq-answer').forEach(answer => {
            answer.classList.remove('active');
        });
        
        document.querySelectorAll('.faq-toggle').forEach(toggle => {
            toggle.classList.remove('active');
        });
        
        document.querySelectorAll('.faq-item').forEach(item => {
            item.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        });
    }
}

// Package Button Interactions
function initPackageButtons() {
    const packageButtons = document.querySelectorAll('.btn-package');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.getAttribute('data-package');
            const price = this.parentElement.querySelector('.price').textContent;
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show confirmation message
            showPackageModal(packageName, price);
        });
    });
}

// Contact Button Functionality
function initContactButton() {
    const contactBtn = document.querySelector('.btn-contact');
    
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            // Scroll to contact section if not already there
            const contactSection = document.getElementById('contact');
            const currentScroll = window.scrollY;
            const contactTop = contactSection.offsetTop - 80;
            
            if (Math.abs(currentScroll - contactTop) > 100) {
                window.scrollTo({
                    top: contactTop,
                    behavior: 'smooth'
                });
                
                // Wait for scroll then show modal
                setTimeout(() => {
                    showContactModal();
                }, 800);
            } else {
                showContactModal();
            }
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Hover Effects for Interactive Elements
function initHoverEffects() {
    // Project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // Service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Addon cards
    const addonCards = document.querySelectorAll('.addon-card');
    
    addonCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    // Add click event to any anchor links that scroll to sections
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
}

// Modal Functions
function showPackageModal(packageName, price) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay" id="packageModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Interested in ${packageName} Package</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Thank you for your interest in the <strong>${packageName}</strong> package (${price})!</p>
                    <p>This is a demo website. In a real implementation, this would:</p>
                    <ul>
                        <li>Open a contact form</li>
                        <li>Pre-fill the package information</li>
                        <li>Connect to a backend service</li>
                        <li>Send an email notification</li>
                    </ul>
                    <div class="modal-actions">
                        <button class="btn btn-secondary" id="modalClose">Close</button>
                        <button class="btn btn-primary" id="modalContact">Contact Now</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    addModalStyles();
    
    // Add event listeners to modal buttons
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalContact').addEventListener('click', function() {
        closeModal();
        setTimeout(() => {
            showContactModal();
        }, 300);
    });
    
    // Close modal when clicking outside
    document.querySelector('.modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

function showContactModal() {
    // Create contact modal HTML
    const modalHTML = `
        <div class="modal-overlay" id="contactModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Get in Touch</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p><strong>Contact Information:</strong></p>
                    <p>Email: hello@gregwebsites.co.uk</p>
                    <p>Location: Middlesbrough, UK</p>
                    <p>Response Time: Typically within a few hours during business hours</p>
                    
                    <div class="demo-form">
                        <p><strong>Demo Contact Form:</strong></p>
                        <div class="form-group">
                            <input type="text" placeholder="Your Name" class="form-input" id="demoName">
                        </div>
                        <div class="form-group">
                            <input type="email" placeholder="Your Email" class="form-input" id="demoEmail">
                        </div>
                        <div class="form-group">
                            <textarea placeholder="Your Message" class="form-input" id="demoMessage" rows="3"></textarea>
                        </div>
                        <p class="form-note">Note: This is a demo form. In a real website, this would submit to a backend.</p>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn btn-secondary" id="contactModalClose">Close</button>
                        <button class="btn btn-primary" id="demoSubmit">Send Demo Message</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners
    document.querySelector('#contactModal .modal-close').addEventListener('click', closeModal);
    document.getElementById('contactModalClose').addEventListener('click', closeModal);
    document.getElementById('demoSubmit').addEventListener('click', submitDemoForm);
    
    // Close modal when clicking outside
    document.querySelector('#contactModal .modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

function closeModal() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.remove();
    });
}

function submitDemoForm() {
    const name = document.getElementById('demoName').value;
    const email = document.getElementById('demoEmail').value;
    const message = document.getElementById('demoMessage').value;
    
    if (!name || !email || !message) {
        alert('Please fill in all fields to see the demo submission.');
        return;
    }
    
    // Show submission feedback
    alert(`Demo submitted!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\nIn a real website, this would be sent to the website owner.`);
    
    // Close modal
    closeModal();
    
    // Clear form (for if we reopen it)
    document.getElementById('demoName').value = '';
    document.getElementById('demoEmail').value = '';
    document.getElementById('demoMessage').value = '';
}

function addModalStyles() {
    // Only add styles if they haven't been added yet
    if (!document.getElementById('modal-styles')) {
        const styleHTML = `
            <style id="modal-styles">
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    animation: fadeIn 0.3s ease;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .modal-content {
                    background-color: white;
                    border-radius: 12px;
                    width: 90%;
                    max-width: 500px;
                    max-height: 90vh;
                    overflow-y: auto;
                    animation: slideUp 0.3s ease;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                }
                
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .modal-header {
                    padding: 20px;
                    border-bottom: 1px solid #eaeaea;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .modal-header h3 {
                    margin: 0;
                    color: #111111;
                    font-size: 1.5rem;
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: #666;
                    line-height: 1;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal-close:hover {
                    color: #111;
                }
                
                .modal-body {
                    padding: 20px;
                }
                
                .modal-body p {
                    margin-bottom: 15px;
                    line-height: 1.6;
                    color: #666;
                }
                
                .modal-body ul {
                    margin-bottom: 20px;
                    padding-left: 20px;
                    color: #666;
                }
                
                .modal-body li {
                    margin-bottom: 8px;
                }
                
                .modal-actions {
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                    margin-top: 25px;
                }
                
                .btn-secondary {
                    background-color: #666;
                }
                
                .btn-secondary:hover {
                    background-color: #555;
                }
                
                .btn-primary {
                    background-color: #4a6cf7;
                }
                
                .btn-primary:hover {
                    background-color: #3a5ce5;
                }
                
                .demo-form {
                    margin: 25px 0;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    border: 1px solid #eaeaea;
                }
                
                .form-group {
                    margin-bottom: 15px;
                }
                
                .form-input {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 1rem;
                    font-family: inherit;
                }
                
                .form-input:focus {
                    outline: none;
                    border-color: #4a6cf7;
                    box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.2);
                }
                
                .form-note {
                    font-size: 0.9rem;
                    color: #888;
                    font-style: italic;
                    margin-top: 10px;
                }
                
                textarea.form-input {
                    resize: vertical;
                    min-height: 80px;
                }
            </style>
        `;
        
        // Add styles to document
        document.head.insertAdjacentHTML('beforeend', styleHTML);
    }
}

// Add scroll animation for elements
function initScrollAnimations() {
    // Create Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.project-card, .service-card, .pricing-card').forEach(card => {
        observer.observe(card);
    });
}

// Initialize scroll animations on load
window.addEventListener('load', initScrollAnimations);

// Add console message for developers
console.log('Greg - Web Designer & Developer website loaded');
>>>>>>> 05b5f62a4f357ae5490a7e4ff8a608c45608e995
console.log('Features: Interactive FAQ, Package Selection, Contact Modal, Smooth Scrolling');