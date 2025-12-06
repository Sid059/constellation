// ===== CINEMATIC INTRODUCTION =====
const introMessages = {
    moon: "As you took your first breath at 1:30 AM, a gentle waning crescent moon watched over you. Its soft silver light was the universe's first lullaby, whispering promises of magic and wonder to come.",
    
    sky: "Above you stretched a canvas of infinite stars. Libra, your constellation, was setting in the western sky - a celestial signature written just for you. Venus, the evening star, shone with particular brilliance, blessing you with love and beauty.",
    
    meteor: "But the sky wasn't just watching - it was celebrating! The Geminids meteor shower was at its peak, painting streaks of light across the darkness. Each shooting star was a spark of joy, a celestial firework display welcoming you to the world."
};

let currentScreen = 0;
let isTyping = false;
let typeTimeout;

// DOM Elements for intro
const introElements = {
    introOverlay: document.getElementById('introOverlay'),
    playBtn: document.getElementById('playIntro'),
    beginGameBtn: document.getElementById('beginGame'),
    screens: document.querySelectorAll('.intro-screen'),
    progressDots: document.querySelectorAll('.progress-dot'),
    moonText: document.getElementById('moonText'),
    skyText: document.getElementById('skyText'),
    meteorText: document.getElementById('meteorText')
};

// Typewriter effect
function typeWriter(element, text, speed = 40, callback = null) {
    isTyping = true;
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            typeTimeout = setTimeout(type, speed);
        } else {
            isTyping = false;
            if (callback) callback();
        }
    }
    
    type();
}

// Skip typing if user clicks
function skipTyping() {
    if (isTyping) {
        clearTimeout(typeTimeout);
        isTyping = false;
        
        const texts = [introMessages.moon, introMessages.sky, introMessages.meteor];
        const elements = [introElements.moonText, introElements.skyText, introElements.meteorText];
        
        if (currentScreen >= 1 && currentScreen <= 3) {
            elements[currentScreen - 1].textContent = texts[currentScreen - 1];
        }
    }
}

// Switch to a specific screen
function goToScreen(screenIndex) {
    if (screenIndex < 0 || screenIndex >= introElements.screens.length) return;
    
    // Hide all screens
    introElements.screens.forEach(screen => screen.classList.remove('active'));
    
    // Show current screen
    introElements.screens[screenIndex].classList.add('active');
    
    // Update progress dots
    introElements.progressDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === screenIndex);
    });
    
    currentScreen = screenIndex;
    
    // Handle screen-specific actions
    switch(screenIndex) {
        case 1: // Moon screen
            setTimeout(() => {
                typeWriter(introElements.moonText, introMessages.moon, 40, () => {
                    setTimeout(() => goToScreen(2), 3000);
                });
            }, 500);
            break;
            
        case 2: // Sky screen
            setTimeout(() => {
                typeWriter(introElements.skyText, introMessages.sky, 40, () => {
                    setTimeout(() => goToScreen(3), 3000);
                });
            }, 500);
            break;
            
        case 3: // Meteor screen
            setTimeout(() => {
                typeWriter(introElements.meteorText, introMessages.meteor, 40, () => {
                    setTimeout(() => goToScreen(4), 3000);
                });
            }, 500);
            break;
    }
}

// Start the introduction
function startIntroduction() {
    // Hide play button screen
    goToScreen(1);
    
    // Add click to skip typing
    introElements.introOverlay.addEventListener('click', skipTyping);
    
    // Also allow skipping with spacebar
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'Enter') {
            skipTyping();
        }
    });
}

// Initialize introduction
function initIntroduction() {
    if (!introElements.introOverlay) return;
    
    // Add intro-active class to body
    document.body.classList.add('intro-active');
    
    // Play button event
    if (introElements.playBtn) {
        introElements.playBtn.addEventListener('click', startIntroduction);
    }
    
    // Begin game button event
    if (introElements.beginGameBtn) {
        introElements.beginGameBtn.addEventListener('click', () => {
            // Hide intro
            introElements.introOverlay.style.opacity = '0';
            introElements.introOverlay.style.visibility = 'hidden';
            
            // Show main content
            document.body.classList.remove('intro-active');
            
            // Remove intro from DOM after transition
            setTimeout(() => {
                if (introElements.introOverlay.parentNode) {
                    introElements.introOverlay.parentNode.removeChild(introElements.introOverlay);
                }
            }, 1000);
        });
    }
    
    // Progress dot clicks
    introElements.progressDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== currentScreen) {
                goToScreen(index);
            }
        });
    });
}

// ===== CONFIGURATION - EDIT THIS SECTION! =====
// Add your personal reasons here (15-25 is a good number)
const starReasons = [
    "The way your eyes light up when you talk about things you love",
    "How you always know exactly what to say when I'm feeling down",
    "That little dance you do when you're making breakfast",
    "Your courage to always be authentically yourself",
    "The sound of your laugh that makes everything better",
    "How you remember small details about people you care about",
    "Your passion for the things you believe in",
    "The warmth of your hand in mine",
    "How you make ordinary moments feel magical",
    "Your strength that inspires everyone around you",
    "The way you see beauty in things others overlook",
    "How you challenge me to be a better person",
    "Your unwavering kindness, even when no one is watching",
    "The peace I feel just being next to you",
    "Your ability to find joy in the simplest things",
    "The way you bite your lip when you're concentrating",
    "How you always stand up for what's right",
    "Your beautiful, creative mind",
    "The comfort of your presence",
    "How you love with your whole heart",
    "The adorable way you wrinkle your nose when confused",
    "How you make everyone feel seen and heard",
    "Your infectious enthusiasm for new adventures",
    "The way you sing off-key in the car with zero shame",
    "How you're both my calm and my excitement",
    "Your resilience in facing challenges",
    "The way you've made me a better version of myself"
];

// Personal final message - customize this!
const finalMessage = `
You've discovered all the stars in your constellation, my love. 
Each one represents just a fraction of why you're so special to me. 
But like the universe, my love for you is infinite and ever-expanding.

On your birthday and every day, I want you to remember:
You are loved more than all the stars in all the galaxies combined.

Happy Birthday, my shining star. ✨💫
`;

const constellationPoints = [];
const minDistance = 8; // Minimum spacing between stars (in percentage)
const maxAttempts = 100;

// Start with the Libra quadrangle
const libraQuadrangle = [
    [35, 25],  // Zubeneschamali (Beta Librae)
    [65, 25],  // Zubenelgenubi (Alpha Librae)
    [30, 65],  // Gamma Librae
    [70, 65]   // Sigma Librae
];

// Add the Libra quadrangle stars
constellationPoints.push(...libraQuadrangle);

// Generate remaining 23 stars with spacing
for (let i = 4; i < 27; i++) {
    let attempts = 0;
    let validPosition = false;
    let x, y;
    
    while (!validPosition && attempts < maxAttempts) {
        attempts++;
        
        // Generate random position with buffer from edges
        x = 5 + Math.random() * 90;  // Between 5% and 95%
        y = 5 + Math.random() * 90;  // Between 5% and 95%
        
        // Check distance from all existing stars
        validPosition = true;
        
        for (let j = 0; j < constellationPoints.length; j++) {
            const [existingX, existingY] = constellationPoints[j];
            const distance = Math.sqrt(
                Math.pow(x - existingX, 2) + 
                Math.pow(y - existingY, 2)
            );
            
            if (distance < minDistance) {
                validPosition = false;
                break;
            }
        }
    }
    
    if (validPosition) {
        constellationPoints.push([x, y]);
    } else {
        // Fallback position (should rarely happen)
        constellationPoints.push([20 + (i * 3) % 70, 20 + (i * 4) % 60]);
        console.warn(`Using fallback position for star ${i}`);
    }
}

// ===== SECRET LIBRA CONFIGURATION =====
// The 4 main Libra stars that form the quadrangle
const libraStarIndices = [0, 1, 2, 3]; // Only 4 stars now

// Libra constellation connections for the quadrangle
const libraConnections = [
    // Connect to form a quadrilateral
    [0, 1], // Top: Zubeneschamali to Zubenelgenubi
    [1, 3], // Right: Zubenelgenubi to Sigma Librae
    [3, 2], // Bottom: Sigma Librae to Gamma Librae
    [2, 0], // Left: Gamma Librae to Zubeneschamali
];

// Libra reveal message - updated for 4 stars
const libraRevealMessage = `
✨ LIBRA CONSTELLATION QUADRANGLE DISCOVERED! ✨

You've discovered the 4 main stars of the Libra constellation!
Just like these stars form a perfect balance in the sky,
you bring harmony and beauty to everything you touch.

Each star represents a special quality you share:
• Zubeneschamali (The Brightest Star) - Your radiant energy that lights up every room
• Zubenelgenubi (The Balanced Pair) - Your ability to see all sides and bring people together  
• Gamma Librae (The Orange Giant) - Your warm, generous heart that glows with kindness
• Sigma Librae (The Red Giant) - Your passionate spirit that fuels everything you do

These stars have guided travelers for centuries,
and you guide me every day with your wisdom and grace.

As a Libra, you are the balance in my universe,
the harmony in my heart, and the beauty in my world.

May your birthday be as bright and beautiful as these stars,
and may this year bring you all the joy you bring to others.
`;

// ===== APP STATE =====
let discoveredStars = new Set();
let stars = [];
let showLines = false; // Start with lines hidden
let currentStarIndex = 0;
let discoveredLibraStars = new Set(); // Track which Libra stars are found
let libraRevealed = false; // Whether Libra has been revealed

// ===== DOM ELEMENTS =====
const elements = {
    starsContainer: document.getElementById('starsContainer'),
    canvas: document.getElementById('constellation-canvas'),
    modalOverlay: document.getElementById('modalOverlay'),
    modalTitle: document.getElementById('modalTitle'),
    modalMessage: document.getElementById('modalMessage'),
    closeModal: document.getElementById('closeModal'),
    discoveredCount: document.getElementById('discoveredCount'),
    totalStars: document.getElementById('totalStars'),
    progressFill: document.getElementById('progressFill'),
    counterText: document.getElementById('counterText'),
    finalMessage: document.getElementById('finalMessage'),
    finalText: document.getElementById('finalText'),
    closeFinal: document.getElementById('closeFinal'),
    toggleLines: document.getElementById('toggleLines'),
    resetStars: document.getElementById('resetStars'),
    hintBtn: document.getElementById('hintBtn'),
    starSound: document.getElementById('starSound')
};

// ===== INITIALIZATION =====
function init() {
    // Set total stars count
    elements.totalStars.textContent = starReasons.length;
    
    // Create canvas context
    const ctx = elements.canvas.getContext('2d');
    
    // Setup event listeners
    setupEventListeners();
    
    // Create stars
    createStars();
    
    // Start with NO lines shown
    drawMinimalLines(ctx);
    
    // Update toggle button text
    elements.toggleLines.innerHTML = '<i class="fas fa-project-diagram"></i> Show Lines';
    
    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        if (showLines) {
            if (libraRevealed) {
                drawLibraConstellation(ctx);
            } else {
                drawMinimalLines(ctx);
            }
        }
        positionStars();
    });
    
    // Initial resize
    resizeCanvas();
    
    console.log("✨ Constellation initialized with", starReasons.length, "stars ✨");
    console.log("✨ Secret Libra quadrangle hidden in stars:", libraStarIndices.join(', '), "✨");
    console.log("✨ 23 stars scattered randomly around the canvas ✨");
}

// ===== STAR CREATION =====
function createStars() {
    // Clear existing stars
    elements.starsContainer.innerHTML = '';
    stars = [];
    
    // Create each star
    constellationPoints.forEach((point, index) => {
        if (index >= starReasons.length) return;
        
        const star = document.createElement('div');
        star.className = 'star';
        star.dataset.index = index;
        
        // Create 8 rays for each star
        for (let i = 0; i < 8; i++) {
            const ray = document.createElement('div');
            ray.className = 'star-ray';
            star.appendChild(ray);
        }
        
        // Mark Libra stars with a special class
        if (libraStarIndices.includes(index)) {
            star.classList.add('libra-star');
        }
        
        // Add click event
        star.addEventListener('click', () => revealStar(index));
        
        // Add to container
        elements.starsContainer.appendChild(star);
        
        // Store star reference
        stars.push({
            element: star,
            index: index,
            discovered: false,
            isLibraStar: libraStarIndices.includes(index)
        });
    });
    
    // Position stars
    positionStars();
}

function positionStars() {
    const container = document.querySelector('.constellation-area');
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    stars.forEach((star, index) => {
        if (index >= constellationPoints.length) return;
        
        const point = constellationPoints[index];
        const x = (point[0] / 100) * width - 8; // 8 = half of star width (16/2)
        const y = (point[1] / 100) * height - 8;
        
        star.element.style.left = `${x}px`;
        star.element.style.top = `${y}px`;
        
        // Store position for drawing lines
        star.x = x + 8;
        star.y = y + 8;
    });
}

// ===== CANVAS DRAWING =====
function resizeCanvas() {
    const container = document.querySelector('.constellation-area');
    elements.canvas.width = container.offsetWidth;
    elements.canvas.height = container.offsetHeight;
}

function drawMinimalLines(ctx) {
    // Clear canvas
    const canvas = elements.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Only draw VERY faint background connections
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 0.5;
    
    // Minimal random connections (like distant stars)
    stars.forEach((star, i) => {
        // Only connect to one random neighbor
        const randomIndex = Math.floor(Math.random() * stars.length);
        if (randomIndex !== i && Math.random() > 0.7) {
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(stars[randomIndex].x, stars[randomIndex].y);
            ctx.stroke();
        }
    });
    
    // Draw subtle star glows
    stars.forEach((star) => {
        const glowSize = 4;
        const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, glowSize
        );
        
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawLibraConstellation(ctx) {
    // Clear canvas
    const canvas = elements.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

     // Draw cosmic blue glowing lines
    const time = Date.now() * 0.001; // For animation
    const pulseIntensity = 0.5 + 0.5 * Math.sin(time * 2); // Pulsing effect
    
    // Draw Libra quadrangle with cosmic blue/white lines
    ctx.strokeStyle = 'rgba(173, 216, 230, 0.9)'; // Light blue cosmic color
    ctx.lineWidth = 1.5; // Thinner lines
    ctx.shadowColor = 'rgba(135, 206, 250, 0.8)'; // Light blue glow
    ctx.shadowBlur = 12 + pulseIntensity * 8; // Pulsing glow effect
    ctx.setLineDash([]);
    
    // Draw ONLY the outer quadrangle (no diagonals)
    ctx.beginPath();
    ctx.moveTo(stars[0].x, stars[0].y); // Start at Zubeneschamali
    ctx.lineTo(stars[1].x, stars[1].y); // To Zubenelgenubi
    ctx.lineTo(stars[3].x, stars[3].y); // To Sigma Librae
    ctx.lineTo(stars[2].x, stars[2].y); // To Gamma Librae
    ctx.closePath(); // Back to Zubeneschamali
    ctx.stroke();

     // Add cosmic blue glow dots at connection points
    ctx.shadowBlur = 15;
    ctx.fillStyle = 'rgba(173, 216, 230, 0.9)'; // Cosmic blue
    libraStarIndices.forEach(index => {
        const star = stars[index];
        if (star) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, 3 + pulseIntensity * 2, 0, Math.PI * 2);
            ctx.fill();
        }
    });
    
    // Reset shadow for other elements
    ctx.shadowBlur = 0;
    
    // Make Libra stars glow with cosmic colors
    libraStarIndices.forEach(index => {
        const star = stars[index];
        if (star) {
            // Different cosmic colors for different star types
            let gradient;
            if (index === 0) {
                // Zubeneschamali - Bright blue-white (hot star)
                gradient = ctx.createRadialGradient(
                    star.x, star.y, 0,
                    star.x, star.y, 25
                );
                gradient.addColorStop(0, 'rgba(255, 255, 255, 1)'); // White core
                gradient.addColorStop(0.2, 'rgba(200, 230, 255, 0.9)'); // Blue-white
                gradient.addColorStop(0.5, 'rgba(173, 216, 230, 0.6)'); // Light blue
                gradient.addColorStop(1, 'rgba(173, 216, 230, 0)');
            } else if (index === 1) {
                // Zubenelgenubi - Yellow-white binary system
                gradient = ctx.createRadialGradient(
                    star.x, star.y, 0,
                    star.x, star.y, 22
                );
                gradient.addColorStop(0, 'rgba(255, 255, 220, 1)'); // Yellow-white core
                gradient.addColorStop(0.3, 'rgba(255, 255, 200, 0.9)'); // Light yellow
                gradient.addColorStop(0.6, 'rgba(255, 255, 180, 0.5)'); // Soft yellow
                gradient.addColorStop(1, 'rgba(255, 255, 180, 0)');
            } else if (index === 2) {
                // Gamma Librae - Orange giant
                gradient = ctx.createRadialGradient(
                    star.x, star.y, 0,
                    star.x, star.y, 20
                );
                gradient.addColorStop(0, 'rgba(255, 200, 100, 1)'); // Orange core
                gradient.addColorStop(0.3, 'rgba(255, 165, 0, 0.9)'); // Bright orange
                gradient.addColorStop(0.7, 'rgba(255, 140, 0, 0.5)'); // Deep orange
                gradient.addColorStop(1, 'rgba(255, 140, 0, 0)');
            } else {
                // Sigma Librae - Red giant
                gradient = ctx.createRadialGradient(
                    star.x, star.y, 0,
                    star.x, star.y, 20
                );
                gradient.addColorStop(0, 'rgba(255, 150, 150, 1)'); // Red core
                gradient.addColorStop(0.3, 'rgba(255, 99, 71, 0.9)'); // Tomato red
                gradient.addColorStop(0.6, 'rgba(255, 69, 0, 0.6)'); // Orange-red
                gradient.addColorStop(1, 'rgba(255, 69, 0, 0)');
            }
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(star.x, star.y, 25, 0, Math.PI * 2);
            ctx.fill();
            
            // Add subtle pulsing animation
            star.element.style.animation = 'libraGlow 1.5s infinite alternate';
        }
    });
    
    // Add star labels with cosmic style
    ctx.fillStyle = 'rgba(173, 216, 230, 0.9)';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    
    const starNames = [
        ['Zubeneschamali', 'Beta Librae'],
        ['Zubenelgenubi', 'Alpha Librae'],
        ['Gamma Librae', 'Orange Giant'],
        ['Sigma Librae', 'Red Giant']
    ];
    
    libraStarIndices.forEach((index, i) => {
        const star = stars[index];
        if (star) {
            // Add subtle glow to text
            ctx.shadowColor = 'rgba(135, 206, 250, 0.8)';
            ctx.shadowBlur = 8;
            
            ctx.fillText(starNames[i][0], star.x, star.y - 15);
            ctx.fillText(starNames[i][1], star.x, star.y - 30);
            
            ctx.shadowBlur = 0;
        }
    });
}

// ===== STAR INTERACTIONS =====
function revealStar(index) {
    if (discoveredStars.has(index)) return;
    
    // Play sound if available
    if (elements.starSound) {
        elements.starSound.currentTime = 0;
        elements.starSound.play().catch(e => console.log("Audio play failed:", e));
    }
    
    // Add to discovered
    discoveredStars.add(index);
    currentStarIndex = index;
    
    // Check if this is a Libra star
    const star = stars[index];
    if (star.isLibraStar) {
        discoveredLibraStars.add(index);
        
        // Make Libra star glow gold
        star.element.style.setProperty('--star-color', '#ffd700');
        star.element.classList.add('libra-discovered');
        
        // Check if all Libra stars are found
        checkLibraReveal();
    }
    
    // Update star appearance
    star.element.classList.add('discovered');
    star.discovered = true;
    
    // Update UI
    updateProgress();
    
    // Show message
    showStarMessage(index);
}

function checkLibraReveal() {
    // Check if all Libra stars are discovered
    if (!libraRevealed && discoveredLibraStars.size === libraStarIndices.length) {
        libraRevealed = true;
        
        // Reveal the Libra constellation!
        const ctx = elements.canvas.getContext('2d');
        drawLibraConstellation(ctx);
        
        // Auto-show lines if they're hidden
        showLines = true;
        elements.toggleLines.innerHTML = '<i class="fas fa-project-diagram"></i> Hide Lines';
        
        // Show special Libra reveal message
        setTimeout(() => {
            showLibraRevealMessage();
        }, 800);
        
        // Play celebration sound if available
        setTimeout(() => {
            if (elements.starSound) {
                // Play three quick sounds for celebration
                elements.starSound.currentTime = 0;
                elements.starSound.play().catch(e => console.log("Audio play failed:", e));
                
                setTimeout(() => {
                    elements.starSound.currentTime = 0;
                    elements.starSound.play();
                }, 200);
                
                setTimeout(() => {
                    elements.starSound.currentTime = 0;
                    elements.starSound.play();
                }, 400);
            }
        }, 500);
    }
}

function showLibraRevealMessage() {
    elements.modalTitle.innerHTML = '♎ Libra Constellation Found!';
    elements.modalMessage.innerHTML = libraRevealMessage.replace(/\n/g, '<br>');
    elements.modalOverlay.classList.add('active');
}

function showStarMessage(index) {
    elements.modalTitle.textContent = `Star #${index + 1}`;
    
    // Add Libra symbol if it's a Libra star
    if (stars[index].isLibraStar) {
        elements.modalTitle.textContent = `♎ Libra Star #${index + 1}`;
    }
    
    // Just show the message for all stars
    elements.modalMessage.textContent = starReasons[index];
    
    elements.modalOverlay.classList.add('active');
    
    // Note: The button text will be updated in updateProgress() when all stars are found
}

// ===== PROGRESS & UI UPDATES =====
function updateProgress() {
    const discovered = discoveredStars.size;
    const total = starReasons.length;
    const percentage = (discovered / total) * 100;
    
    // Update progress bar
    elements.progressFill.style.width = `${percentage}%`;
    
    // Update counter
    elements.discoveredCount.textContent = discovered;
    elements.counterText.textContent = `Stars discovered: ${discovered}`;
    
    // Add Libra star count if any are found
    if (discoveredLibraStars.size > 0 && !libraRevealed) {
        elements.counterText.textContent += ` (${discoveredLibraStars.size}/4 Libra stars)`;
    } else if (libraRevealed) {
        elements.counterText.textContent += ' ♎';
    }
    
    // Check if all stars discovered
    if (discovered === total) {
        // Change the button text when all stars are found
        elements.closeModal.innerHTML = 'Close <i class="fas fa-heart"></i>';
        //setTimeout(showFinalMessage, 1000);
    } else {
        // Reset to normal text for other stars
        elements.closeModal.innerHTML = 'Continue Exploring <i class="fas fa-rocket"></i>';
    }
}

function showFinalMessage() {
    elements.finalText.textContent = finalMessage;
    elements.finalMessage.classList.add('active');
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Modal buttons

    elements.closeModal.addEventListener('click', () => {
    // Check if all stars are discovered AND we're on the last star modal
    if (discoveredStars.size === starReasons.length) {
        // Show the final birthday message instead of closing
        showFinalMessage();
        // Also close the modal
        elements.modalOverlay.classList.remove('active');
    } else {
        // Normal behavior for other stars
        elements.modalOverlay.classList.remove('active');
    }
});
    
    // Close modal when clicking outside
    elements.modalOverlay.addEventListener('click', (e) => {
        if (e.target === elements.modalOverlay) {
            elements.modalOverlay.classList.remove('active');
        }
    });
    
    // Final message close
    elements.closeFinal.addEventListener('click', () => {
        elements.finalMessage.classList.remove('active');
    });
    
    // Control buttons
    elements.toggleLines.addEventListener('click', () => {
        showLines = !showLines;
        const ctx = elements.canvas.getContext('2d');
        
        if (!showLines) {
            ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
            elements.toggleLines.innerHTML = '<i class="fas fa-project-diagram"></i> Show Lines';
        } else {
            if (libraRevealed) {
                drawLibraConstellation(ctx);
            } else {
                drawMinimalLines(ctx);
            }
            elements.toggleLines.innerHTML = '<i class="fas fa-project-diagram"></i> Hide Lines';
        }
    });
    
    elements.resetStars.addEventListener('click', () => {
        if (confirm("Reset all stars and start over?")) {
            discoveredStars.clear();
            discoveredLibraStars.clear();
            libraRevealed = false;
            
            stars.forEach(star => {
                star.element.classList.remove('discovered', 'libra-discovered');
                star.discovered = false;
                star.element.style.animation = '';
                star.element.style.setProperty('--star-color', 'white');
            });
            
            updateProgress();
            elements.modalOverlay.classList.remove('active');
            
            // Reset canvas
            const ctx = elements.canvas.getContext('2d');
            ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
            showLines = false;
            elements.toggleLines.innerHTML = '<i class="fas fa-project-diagram"></i> Show Lines';
        }
    });
    
    elements.hintBtn.addEventListener('click', () => {
        // Find an undiscovered star
        const undiscovered = stars.filter(star => !star.discovered);
        if (undiscovered.length > 0) {
            const randomStar = undiscovered[Math.floor(Math.random() * undiscovered.length)];
            
            // Briefly highlight the star
            randomStar.element.style.filter = 'drop-shadow(0 0 20px #ff6b6b)';
            randomStar.element.style.animation = 'none';
            
            setTimeout(() => {
                randomStar.element.style.filter = '';
                randomStar.element.style.animation = '';
            }, 2000);
            
            // Give a hint about Libra stars if none are revealed yet
            if (discoveredLibraStars.size === 0 && randomStar.isLibraStar) {
                alert(`✨ Hint: This is one of the 4 main Libra stars! Look for stars that form a quadrilateral shape...`);
            } else {
                alert(`✨ Hint: There's an undiscovered star in the ${randomStar.x > elements.canvas.width/2 ? 'right' : 'left'} ${randomStar.y > elements.canvas.height/2 ? 'bottom' : 'top'} area!`);
            }
        } else {
            alert("🎉 You've found all the stars already!");
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (elements.modalOverlay.classList.contains('active')) {
            if (e.key === 'Escape') {
                elements.modalOverlay.classList.remove('active');
            } else if (e.key === 'ArrowLeft' && !elements.prevBtn.disabled) {
                elements.prevBtn.click();
            } else if (e.key === 'ArrowRight' && !elements.nextBtn.disabled) {
                elements.nextBtn.click();
            }
        }
    });
}

// ===== START THE APP =====
// Save the original init function
const originalInit = init;

// Create a new init function that includes introduction
function startEverything() {
    initIntroduction();  // Start the cinematic intro
    originalInit();      // Then run the original constellation code
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', startEverything);

// Fallback in case DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(startEverything, 1);
}