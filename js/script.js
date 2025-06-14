// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Particle animation
function createParticles() {
    const particleCount = 50;
    const particles = document.getElementById('particles');
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        particles.appendChild(particle);
    }
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (target === 99.9) {
                    counter.textContent = current.toFixed(1) + '%';
                } else if (target === 24) {
                    counter.textContent = Math.ceil(current) + '/7';
                } else {
                    counter.textContent = Math.ceil(current).toLocaleString();
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (target === 99.9) {
                    counter.textContent = target + '%';
                } else if (target === 24) {
                    counter.textContent = target + '/7';
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }
        };
        updateCounter();
    });
}

// Stats section observer
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Button interactions
document.addEventListener('DOMContentLoaded', () => {
    // Start Trial Button
    const startTrialBtn = document.getElementById('startTrial');
    if (startTrialBtn) {
        startTrialBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Add ripple effect
            const button = e.target;
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Simulate trial start
            setTimeout(() => {
                alert('🎉 Welcome to your free trial! Check your email for setup instructions.');
            }, 300);
        });
    }

    // Watch Demo Button
    const watchDemoBtn = document.getElementById('watchDemo');
    if (watchDemoBtn) {
        watchDemoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Simulate demo modal
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const content = document.createElement('div');
            content.style.cssText = `
                background: linear-gradient(135deg, #1a1a2e, #16213e);
                padding: 2rem;
                border-radius: 20px;
                text-align: center;
                max-width: 400px;
                border: 1px solid rgba(0, 191, 255, 0.3);
            `;
            
            content.innerHTML = `
                <h3 style="color: #00bfff; margin-bottom: 1rem;">🎬 Demo Video</h3>
                <p style="color: #fff; margin-bottom: 1.5rem;">Experience NeuralSync Pro in action with our interactive demo.</p>
                <button onclick="this.closest('[style*=\"position: fixed\"]').remove()" style="
                    background: linear-gradient(45deg, #00bfff, #4ecdc4);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: 600;
                ">Close Demo</button>
            `;
            
            modal.appendChild(content);
            document.body.appendChild(modal);
            
            setTimeout(() => modal.style.opacity = '1', 10);
        });
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // Observe fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Observe stats section
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});