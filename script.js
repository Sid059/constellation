// ===== CONFIGURATION =====
const starReasons = [
    "Thank God I met you. In every timeline, every universe, I would choose you—your light, your shadows, every piece of you that's still learning to shine.",

"When you feel sad, remember you have me. I may not be much, but I will stand with you through every storm, every quiet night, every heavy moment.",

"Even when the world doesn't clap for you, I will. Even without a trophy, I'll run to you just to whisper how incredibly proud I am of the simplest things you do.",

"If you ever feel unattractive, know I could sit and stare at you for hours—memorizing the way light dances in your eyes, the curve of your smile, every detail that makes you, you.",

"As years end and begin, my favorite part is knowing that through all the ups and downs, I still think of you first. I still smile at your name. I still feel that warmth when you're near.",

"Your sadness is safe with me. I won't try to fix it—I'll just sit with you in the quiet, holding space for every emotion, every tear, every unspoken word.",

"I choose you in your messy mornings and your tired evenings. I choose you in your laughter and your silence. I choose every version of you that exists.",

"You don't have to go through anything alone. I may not have all the answers, but I have endless time for you—for your stories, your fears, your dreams.",

"Even when the world feels heavy, I'll be here—quietly, gently, always. My love for you isn't loud or dramatic, it's just... constant.",

"I'm not perfect, but I'm yours. In pain, in joy, in chaos, in calm—I'm staying. Through everything, I'm choosing to stay.",

"I can't promise to fix everything, but I promise you'll never face anything alone. My hand will always be there, waiting for yours.",

"You mean more to me than you'll ever know. Even on days you can't see your own worth, I'll be there to remind you of the light you carry.",

"No matter what you're feeling, please don't forget—you have someone who truly, deeply cares. Someone who sees you, really sees you.",

"Some days the weight feels heavier, I know. But my shoulders are here to share the load, my arms are here to hold you through it.",

"Maybe the best love isn't the loud, dramatic kind—it's the real kind. The kind that smiles when your name appears, that feels warm when you're near.",

"If the coming year brings anything, I hope it brings you closer to happiness... and maybe, just a little closer to me too.",

"I want to be the person you text when you're having a bad day. The one who shows up with your favorite comfort, no questions asked.",

"You are my favorite 'what if' that became 'what is.' My favorite dream that woke up beside me.",

"There's a special kind of magic in the way you exist—how you turn ordinary moments into memories I'll cherish forever.",

"I don't need grand gestures. Just knowing you're thinking of me, that I cross your mind during your day—that's enough to make my world brighter.",

"Your peace matters to me. Your joy matters. Your quiet contentment on a lazy Sunday matters. All of you matters.",

"I'll always come running—not because you need saving, but because I want to be there. Because your happiness is worth every step.",

"You have this way of making the world feel softer, kinder, more beautiful—just by being in it.",

"Even on your hardest days, you're still the most beautiful thing I've ever seen. Your strength, your resilience—it takes my breath away.",

"I want to be the safe place you return to. The arms that welcome you home, no matter what kind of day you've had.",

"You don't have to earn my love. It's not a prize for achievements. It's just... yours. Always has been, always will be.",

"If love had a face, it would look like you first thing in the morning, sleepy and soft. It would sound like your laughter. It would feel like home.",
];

const finalMessage = `You've discovered all 27 love letters I wrote among the stars. 
Each one is a piece of my heart, written in starlight just for you.
Happy birthday to my favorite person in the whole wide world. I wish you health that feels like a warm, steady hug, success that makes you glow from the inside, and love that wraps around you like a cozy blanket—our love, your safe place.
I don’t just love the pretty parts of you. I love the real, soft, messy, beautiful you. The way you laugh a little too loudly, the way your heart cares so deeply it almost spills over, the way you turn even ordinary moments into memories I’ll treasure forever. I’m here for the easy smiles and the quiet tears, for celebrating your wins and holding your hand through the lessons. I’m here to share every sunrise, every starry whisper, and everything in between.
But darling, this sky of stars is only the beginning, my love for you stretches beyond all known galaxies, beyond all time, forever expanding like the universe itself. It grows, expands, and glows brighter with every breath I take.

On your birthday and every day, remember this:
You are loved more than all the stars in all the skies combined.
Happy Birthday, my forever home among the stars ❤️💫`;

// ===== IMPROVED STAR POSITION GENERATION =====
function generateRandomStarPositions(count, minDistance = 48) { // 0.5 inch = ~48 pixels
    const positions = [];
    const maxAttempts = 2000; // Increased for better spacing
    
    // Grid-based approach for better distribution
    const gridSize = Math.ceil(Math.sqrt(count));
    const cellWidth = 85 / gridSize; // Use 85% of width for grid
    const cellHeight = 85 / gridSize; // Use 85% of height for grid
    
    // Start with a grid-based distribution
    for (let i = 0; i < count; i++) {
        let attempts = 0;
        let validPosition = false;
        let x, y;
        
        // First try: Use grid-based position
        if (i < gridSize * gridSize) {
            const gridRow = Math.floor(i / gridSize);
            const gridCol = i % gridSize;
            
            // Base position within grid cell
            const baseX = 10 + (gridCol * cellWidth) + (cellWidth / 2);
            const baseY = 10 + (gridRow * cellHeight) + (cellHeight / 2);
            
            // Add small random offset within cell
            x = baseX + (Math.random() * 10 - 5);
            y = baseY + (Math.random() * 10 - 5);
            
            // Ensure within bounds
            x = Math.max(10, Math.min(90, x));
            y = Math.max(10, Math.min(90, y));
            
            validPosition = true;
            
            // Check distance from existing stars
            for (const pos of positions) {
                const distance = Math.sqrt(Math.pow(pos[0] - x, 2) + Math.pow(pos[1] - y, 2));
                if (distance < minDistance) {
                    validPosition = false;
                    break;
                }
            }
        }
        
        // If grid position didn't work, try random positions
        while (!validPosition && attempts < maxAttempts) {
            // Generous margin at edges for better clickability
            x = 12 + Math.random() * 76; // 12-88% to avoid edges
            y = 12 + Math.random() * 76;
            
            // Check distance from existing stars
            validPosition = true;
            for (const pos of positions) {
                const distance = Math.sqrt(Math.pow(pos[0] - x, 2) + Math.pow(pos[1] - y, 2));
                if (distance < minDistance) {
                    validPosition = false;
                    break;
                }
            }
            
            attempts++;
        }
        
        // If we still couldn't find a good position, reduce minimum distance
        if (!validPosition) {
            console.warn(`Could not find optimal position for star ${i+1}, using fallback`);
            x = 12 + Math.random() * 76;
            y = 12 + Math.random() * 76;
            
            // Try to keep some distance anyway
            for (const pos of positions) {
                const distance = Math.sqrt(Math.pow(pos[0] - x, 2) + Math.pow(pos[1] - y, 2));
                if (distance < 30) { // Minimum 30px if really crowded
                    x = 12 + Math.random() * 76;
                    y = 12 + Math.random() * 76;
                }
            }
        }
        
        positions.push([x, y]);
    }
    
    console.log(`Generated ${positions.length} star positions with min distance: ${minDistance}px`);
    return positions;
}

// Global variable for current positions
let currentStarPositions = [];

// ===== APP STATE =====
let discoveredStars = new Set();
let stars = [];

// ===== DOM ELEMENTS =====
function getElements() {
    return {
        starsContainer: document.getElementById('starsContainer'),
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
        resetStars: document.getElementById('resetStars'),
        hintBtn: document.getElementById('hintBtn'),
        starSound: document.getElementById('starSound')
    };
}

// ===== INITIALIZATION =====
function init() {
    console.log("=== INITIALIZING STAR FIELD ===");
    
    // Get elements
    const elements = getElements();
    
    // Check if essential elements exist
    if (!elements.starsContainer) {
        console.error("ERROR: starsContainer not found!");
        return;
    }
    
    console.log("✓ All DOM elements found");
    
    // Set total stars count
    elements.totalStars.textContent = starReasons.length;
    elements.discoveredCount.textContent = '0';
    
    // Generate initial random positions with 0.5 inch (48px) minimum spacing
    currentStarPositions = generateRandomStarPositions(starReasons.length, 48);
    
    // Create stars immediately
    createStars(elements);
    
    // Setup event listeners
    setupEventListeners(elements);
    
    // Update progress bar
    updateProgress(elements);
    
    // Meteor shower is already running from the intro
    // No need to initialize it again
    
    console.log("✓ Star field initialized with", starReasons.length, "stars");
    console.log("Stars created:", document.querySelectorAll('.star').length);
    
    // Ensure body is scrollable
    document.body.style.overflowY = 'auto';
}

// ===== STAR CREATION =====
function createStars(elements) {
    console.log("Creating stars...");
    
    // Clear existing stars
    elements.starsContainer.innerHTML = '';
    stars = [];
    
    // Create each star
    for (let i = 0; i < starReasons.length; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.dataset.index = i;
        
        // Create 5 rays for each star (5-pointed star)
        for (let j = 0; j < 5; j++) {
            const ray = document.createElement('div');
            ray.className = 'star-ray';
            star.appendChild(ray);
        }
        
        // Add click event
        star.addEventListener('click', (e) => {
            e.stopPropagation();
            revealStar(i, elements);
        });
        
        // Add to container
        elements.starsContainer.appendChild(star);
        
        // Store star reference
        stars.push({
            element: star,
            index: i,
            discovered: false
        });
    }
    
    console.log(`Created ${stars.length} stars with 5 rays each`);
    
    // Position stars immediately
    setTimeout(() => {
        positionStars(elements);
    }, 50);
}

function positionStars(elements) {
    const container = elements.starsContainer.parentElement;
    if (!container) {
        console.error("Constellation container not found!");
        return;
    }
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    if (width === 0 || height === 0) {
        console.warn("Container has zero dimensions, retrying in 100ms...");
        setTimeout(() => positionStars(elements), 100);
        return;
    }
    
    console.log(`Positioning ${stars.length} stars in container: ${width}x${height}`);
    
    // Calculate pixel distance for 0.5 inch based on container size
    // Use adaptive spacing: smaller on mobile, larger on desktop
    const minPixelDistance = Math.min(48, width * 0.05); // 5% of width or 48px, whichever is smaller
    
    // Verify spacing and adjust if needed
    const positionsCopy = [...currentStarPositions];
    let adjustedPositions = [];
    
    for (let i = 0; i < positionsCopy.length; i++) {
        let [xPercent, yPercent] = positionsCopy[i];
        let validPosition = false;
        let attempts = 0;
        
        while (!validPosition && attempts < 50) {
            validPosition = true;
            
            // Check distance from all other adjusted positions
            for (let j = 0; j < adjustedPositions.length; j++) {
                const [otherX, otherY] = adjustedPositions[j];
                const distancePx = Math.sqrt(
                    Math.pow((xPercent/100)*width - (otherX/100)*width, 2) + 
                    Math.pow((yPercent/100)*height - (otherY/100)*height, 2)
                );
                
                if (distancePx < minPixelDistance) {
                    // Too close, adjust position
                    const angle = Math.random() * Math.PI * 2;
                    const moveDistance = minPixelDistance / width * 100;
                    xPercent += Math.cos(angle) * moveDistance;
                    yPercent += Math.sin(angle) * moveDistance;
                    
                    // Keep within bounds
                    xPercent = Math.max(8, Math.min(92, xPercent));
                    yPercent = Math.max(8, Math.min(92, yPercent));
                    
                    validPosition = false;
                    break;
                }
            }
            
            attempts++;
        }
        
        adjustedPositions.push([xPercent, yPercent]);
    }
    
    // Use adjusted positions
    currentStarPositions = adjustedPositions;
    
    stars.forEach((star, index) => {
        const point = currentStarPositions[index];
        const x = (point[0] / 100) * width;
        const y = (point[1] / 100) * height;
        
        // Position the star (centered on point)
        star.element.style.left = `${x}px`;
        star.element.style.top = `${y}px`;
        
        // Store position for hints
        star.x = x;
        star.y = y;
    });
    
    console.log("✓ Stars positioned with proper spacing");
}

// ===== RESET WITH NEW RANDOM POSITIONS =====
function resetWithNewPositions(elements) {
    console.log("Resetting stars with new random positions...");
    
    // Clear discovered stars
    discoveredStars.clear();
    
    // Generate new random positions with 0.5 inch (48px) spacing
    currentStarPositions = generateRandomStarPositions(starReasons.length, 48);
    
    // Reset star states
    stars.forEach(star => {
        star.element.classList.remove('discovered');
        star.discovered = false;
    });
    
    // Reposition stars
    positionStars(elements);
    
    // Update UI
    updateProgress(elements);
    
    // Close any open modals
    elements.modalOverlay.classList.remove('active');
    elements.finalMessage.classList.remove('active');
    
    console.log("✓ Stars reset with new random positions");
}

// ===== STAR INTERACTIONS =====
function revealStar(index, elements) {
    if (discoveredStars.has(index)) return;
    
    console.log("Revealing star:", index);
    
    // Play sound
    if (elements.starSound) {
        elements.starSound.currentTime = 0;
        elements.starSound.play().catch(e => console.log("Audio play failed:", e));
    }
    
    // Add to discovered
    discoveredStars.add(index);
    
    // Update star appearance
    const star = stars[index];
    star.element.classList.add('discovered');
    star.discovered = true;
    
    // Update UI
    updateProgress(elements);
    
    // Show message
    showStarMessage(index, elements);
}

function showStarMessage(index, elements) {
    elements.modalTitle.textContent = `Starlit Letter #${index + 1}`;
    elements.modalMessage.textContent = starReasons[index];
    elements.modalOverlay.classList.add('active');
}

// ===== PROGRESS & UI UPDATES =====
function updateProgress(elements) {
    const discovered = discoveredStars.size;
    const total = starReasons.length;
    const percentage = (discovered / total) * 100;
    
    // Update progress bar
    elements.progressFill.style.width = `${percentage}%`;
    
    // Update counter
    elements.discoveredCount.textContent = discovered;
    elements.counterText.textContent = `Stars discovered: ${discovered}`;
    
    // Update close modal button text (but don't auto-show final message)
    if (discovered === total) {
        elements.closeModal.innerHTML = 'See Final Message <i class="fas fa-heart"></i>';
    } else {
        elements.closeModal.innerHTML = 'Continue Exploring <i class="fas fa-rocket"></i>';
    }
}

function showFinalMessage(elements) {
    elements.finalText.textContent = finalMessage;
    elements.finalMessage.classList.add('active');
}

// ===== EVENT LISTENERS =====
function setupEventListeners(elements) {
    console.log("Setting up event listeners...");
    
    // Modal buttons
    elements.closeModal.addEventListener('click', () => {
        // Check if all stars are discovered
        if (discoveredStars.size === starReasons.length) {
            // Show final message and close modal
            elements.modalOverlay.classList.remove('active');
            setTimeout(() => {
                showFinalMessage(elements);
            }, 300);
        } else {
            // Just close the modal
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
    
    // Reset button - NOW WITH RANDOM POSITIONS
    elements.resetStars.addEventListener('click', () => {
        if (confirm("Reset all stars and scatter them randomly in the sky?")) {
            resetWithNewPositions(elements);
        }
    });
    
    // Hint button
    elements.hintBtn.addEventListener('click', () => {
        const undiscovered = stars.filter(star => !star.discovered);
        if (undiscovered.length > 0) {
            const randomStar = undiscovered[Math.floor(Math.random() * undiscovered.length)];
            const container = elements.starsContainer.parentElement;
            
            // Briefly highlight the star
            randomStar.element.style.zIndex = '100';
            randomStar.element.style.filter = 'brightness(3) drop-shadow(0 0 20px white)';
            
            setTimeout(() => {
                randomStar.element.style.zIndex = '';
                randomStar.element.style.filter = '';
            }, 2000);
            
            alert(`✨ Hint: Look for a star in the ${randomStar.x > container.clientWidth/2 ? 'right' : 'left'} ${randomStar.y > container.clientHeight/2 ? 'bottom' : 'top'} area!`);
        } else {
            alert("🎉 You've found all the stars already!");
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        positionStars(elements);
    });
    
    console.log("✓ Event listeners set up");
}

// ===== MAKE INIT FUNCTION AVAILABLE =====
window.initConstellation = init;
console.log("Star field script loaded and ready");

