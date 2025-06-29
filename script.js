// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const codeContent = document.getElementById('code-content');

// Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Mobile hamburger menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation based on scroll position
        updateActiveNavigation();
    });

    // Technology tabs functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Button click handlers
    setupButtonHandlers();
    
    // Initialize animations
    initializeAnimations();
});

// Update active navigation based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Button click handlers
function setupButtonHandlers() {
    // Start Learning button
    const startLearningBtn = document.getElementById('start-learning');
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', function() {
            showNotification('Welcome to Web Development! 🎉', 'success');
            document.querySelector('#features').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // View Demo button
    const viewDemoBtn = document.getElementById('view-demo');
    if (viewDemoBtn) {
        viewDemoBtn.addEventListener('click', function() {
            animateCodeWindow();
            showNotification('Demo activated! Check out the code animation.', 'info');
        });
    }

    // Get Started button
    const getStartedBtn = document.getElementById('get-started');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            showModal('Get Started', 'Ready to begin your web development journey? Choose your learning path:', [
                { text: 'HTML Basics', action: () => showNotification('HTML course coming soon!', 'info') },
                { text: 'CSS Fundamentals', action: () => showNotification('CSS course coming soon!', 'info') },
                { text: 'JavaScript Essentials', action: () => showNotification('JavaScript course coming soon!', 'info') }
            ]);
        });
    }

    // Learn More button
    const learnMoreBtn = document.getElementById('learn-more');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            document.querySelector('#technologies').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Code window animation
function animateCodeWindow() {
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            line.style.transition = 'all 0.5s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Dynamic code content for demo
const codeExamples = {
    html: [
        { line: 1, code: '&lt;<span class="tag">html</span>&gt;' },
        { line: 2, code: '  &lt;<span class="tag">head</span>&gt;' },
        { line: 3, code: '    &lt;<span class="tag">title</span>&gt;Hello World&lt;/<span class="tag">title</span>&gt;' },
        { line: 4, code: '  &lt;/<span class="tag">head</span>&gt;' },
        { line: 5, code: '  &lt;<span class="tag">body</span>&gt;' },
        { line: 6, code: '    &lt;<span class="tag">h1</span>&gt;Welcome to Web Dev!&lt;/<span class="tag">h1</span>&gt;' },
        { line: 7, code: '  &lt;/<span class="tag">body</span>&gt;' },
        { line: 8, code: '&lt;/<span class="tag">html</span>&gt;' }
    ],
    css: [
        { line: 1, code: '<span class="tag">body</span> {' },
        { line: 2, code: '  <span class="property">font-family</span>: <span class="value">Arial, sans-serif</span>;' },
        { line: 3, code: '  <span class="property">margin</span>: <span class="value">0</span>;' },
        { line: 4, code: '  <span class="property">padding</span>: <span class="value">0</span>;' },
        { line: 5, code: '}' },
        { line: 6, code: '' },
        { line: 7, code: '<span class="tag">.container</span> {' },
        { line: 8, code: '  <span class="property">max-width</span>: <span class="value">1200px</span>;' },
        { line: 9, code: '}' }
    ],
    javascript: [
        { line: 1, code: '<span class="keyword">const</span> <span class="variable">button</span> = <span class="method">document.querySelector</span>(<span class="string">\'#btn\'</span>);' },
        { line: 2, code: '' },
        { line: 3, code: '<span class="variable">button</span>.<span class="method">addEventListener</span>(<span class="string">\'click\'</span>, () => {' },
        { line: 4, code: '  <span class="method">console.log</span>(<span class="string">\'Button clicked!\'</span>);' },
        { line: 5, code: '  <span class="method">alert</span>(<span class="string">\'Hello World!\'</span>);' },
        { line: 6, code: '});' },
        { line: 7, code: '' },
        { line: 8, code: '<span class="comment">// Modern JavaScript is awesome!</span>' }
    ]
};

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '✗',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

// Modal system
function showModal(title, content, buttons = []) {
    // Remove existing modal
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1002;
        animation: fadeIn 0.3s ease;
    `;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        animation: slideInUp 0.3s ease;
    `;

    const buttonsHtml = buttons.map((btn, index) => 
        `<button class="modal-btn modal-btn-${index}" style="
            background: #3b82f6;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            margin: 0.25rem;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        " onmouseover="this.style.background='#2563eb'" onmouseout="this.style.background='#3b82f6'">${btn.text}</button>`
    ).join('');

    modal.innerHTML = `
        <div class="modal-header" style="margin-bottom: 1.5rem;">
            <h2 style="margin: 0; color: #1f2937; font-size: 1.5rem;">${title}</h2>
            <button class="modal-close" style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #6b7280;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='none'">×</button>
        </div>
        <div class="modal-content" style="margin-bottom: 2rem; color: #6b7280; line-height: 1.6;">
            ${content}
        </div>
        <div class="modal-footer" style="display: flex; justify-content: flex-end; gap: 0.5rem;">
            ${buttonsHtml}
            <button class="modal-cancel" style="
                background: #f3f4f6;
                color: #374151;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#f3f4f6'">Cancel</button>
        </div>
    `;

    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);

    // Event listeners
    modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modalOverlay));
    modal.querySelector('.modal-cancel').addEventListener('click', () => closeModal(modalOverlay));
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal(modalOverlay);
        }
    });

    // Button actions
    buttons.forEach((btn, index) => {
        const btnElement = modal.querySelector(`.modal-btn-${index}`);
        btnElement.addEventListener('click', () => {
            btn.action();
            closeModal(modalOverlay);
        });
    });

    // Escape key to close
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal(modalOverlay);
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

function closeModal(modalOverlay) {
    modalOverlay.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        if (modalOverlay.parentElement) {
            modalOverlay.remove();
        }
    }, 300);
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .project-card, .tech-feature');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Typing animation for code content
function startTypingAnimation() {
    const codeLines = document.querySelectorAll('.code-line');
    let currentLine = 0;

    function typeLine() {
        if (currentLine < codeLines.length) {
            const line = codeLines[currentLine];
            line.style.opacity = '0';
            line.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                line.style.transition = 'all 0.5s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
                currentLine++;
                setTimeout(typeLine, 200);
            }, 100);
        }
    }

    typeLine();
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Smooth reveal animation for sections
function revealSections() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = `all 0.8s ease ${index * 0.1}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(section);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    revealSections();
    setTimeout(startTypingAnimation, 1000);
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes slideInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        font-size: 1.25rem;
        padding: 0;
        margin-left: auto;
    }

    .modal {
        position: relative;
    }

    .tech-feature {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }

    .tech-feature.animate {
        opacity: 1;
        transform: translateY(0);
    }

    /* Code syntax highlighting */
    .keyword { color: #c792ea; }
    .variable { color: #82aaff; }
    .method { color: #82aaff; }
    .string { color: #c3e88d; }
    .comment { color: #546e7a; }
    .property { color: #c792ea; }
    .value { color: #f78c6c; }
`;
document.head.appendChild(style);

// Add resize handler for responsive behavior
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Preloader (optional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    updateActiveNavigation();
}, 100));

console.log('WebMaster - Web Development Learning Platform Initialized! 🚀');
