// Set the launch date to a specific date
const launchDate = new Date("2025-05-15T00:00:00").getTime();

// Update countdown timer
function updateCountdown() {
    const currentDate = new Date().getTime();
    const difference = launchDate - currentDate;
    
    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Update DOM with animation
    updateTimeElement('days', days);
    updateTimeElement('hours', hours);
    updateTimeElement('minutes', minutes);
    updateTimeElement('seconds', seconds);
    
    // If launch date passed
    if (difference < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = '<h2 class="launched">We\'ve Launched!</h2>';
    }
}

// Update time element with animation
function updateTimeElement(id, value) {
    const element = document.getElementById(id);
    const currentValue = element.innerText;
    const newValue = value.toString().padStart(2, '0');
    
    if (currentValue !== newValue) {
        // Add flip animation
        element.classList.add('flip');
        
        // Update the value after a small delay
        setTimeout(() => {
            element.innerText = newValue;
            
            // Remove the animation class after the animation completes
            setTimeout(() => {
                element.classList.remove('flip');
            }, 300);
        }, 300);
    }
}

// Initial call
updateCountdown();

// Update every second
const countdownInterval = setInterval(updateCountdown, 1000);

// Handle form submission
document.getElementById('notify-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    // Here you would typically send this to your backend
    // For now, we'll just show a confirmation message
    this.innerHTML = `<p class="success">Thanks! We'll notify ${email} when we launch.</p>`;
    
    // Add confetti effect on successful submission
    createConfetti();
});

// Create animated background particles
function createStarryBackground() {
    const backgroundAnimation = document.querySelector('.background-animation');
    const starCount = 150; // Increased star count
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random positioning
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        
        // Random size
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Animation properties
        star.style.setProperty('--opacity', Math.random() * 0.8 + 0.2);
        star.style.setProperty('--duration', Math.random() * 6 + 3 + 's');
        star.style.setProperty('--delay', Math.random() * 5 + 's');
        
        // Add blue tint to some stars
        if (Math.random() > 0.6) { // Increased probability for blue stars
            star.style.background = '#00a2ff';
            star.style.boxShadow = '0 0 10px rgba(0, 162, 255, 0.8)';
        }
        
        backgroundAnimation.appendChild(star);
    }
}

// Create floating particles
function createFloatingParticles() {
    const backgroundAnimation = document.querySelector('.background-animation');
    const particleCount = 40; // Increased particle count
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random positioning
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        // Random size
        const size = Math.random() * 6 + 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Animation
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        
        particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
        
        backgroundAnimation.appendChild(particle);
    }
}

// Add hover effects to time blocks
function addTimeBlockInteractivity() {
    const timeBlocks = document.querySelectorAll('.time-block');
    
    timeBlocks.forEach(block => {
        block.addEventListener('mouseenter', () => {
            block.style.transform = 'translateZ(30px) rotateY(10deg)';
        });
        
        block.addEventListener('mouseleave', () => {
            block.style.transform = 'translateZ(0) rotateY(0)';
        });
    });
}

// Add parallax effect to content
function addParallaxEffect() {
    const content = document.querySelector('.content');
    
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 40; // Reduced divisor for stronger effect
        const y = (window.innerHeight / 2 - e.clientY) / 40;
        
        content.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}

// Create confetti effect for form submission
function createConfetti() {
    const container = document.querySelector('.container');
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random styling
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '0';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 5 + 3 + 'px';
        confetti.style.opacity = Math.random() * 0.8 + 0.2;
        
        // Random colors - blue theme
        const colors = ['#0066ff', '#00a2ff', '#0044cc', '#66b3ff', '#ffffff'];
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.position = 'absolute';
        
        // Animation
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 0.5;
        
        confetti.style.animation = `confettiFall ${duration}s ease-in ${delay}s forwards`;
        
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, (duration + delay) * 1000);
    }
}

// Add CSS for flip and confetti animations
function addAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flip {
            0% {
                transform: rotateX(0);
            }
            50% {
                transform: rotateX(90deg);
            }
            100% {
                transform: rotateX(0);
            }
        }
        
        .flip {
            animation: flip 0.6s ease;
        }
        
        .launched {
            font-size: 3.5rem;
            background: linear-gradient(to right, #0066ff, #00a2ff);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: pulse 2s infinite alternate;
            letter-spacing: 2px;
            margin-top: 20px;
        }
        
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: var(--opacity, 0.8);
            }
            50% {
                opacity: var(--opacity, 0.8);
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Add a subtle typing effect to the tagline
function addTypingEffect() {
    const tagline = document.querySelector('.tagline');
    const text = tagline.textContent;
    tagline.textContent = '';
    
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, 50);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createStarryBackground();
    createFloatingParticles();
    addTimeBlockInteractivity();
    addParallaxEffect();
    addAnimations();
    
    // Add a subtle entrance animation to the content
    const content = document.querySelector('.content');
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        content.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
        
        // Start typing effect after content appears
        setTimeout(() => {
            addTypingEffect();
        }, 500);
    }, 300);
});