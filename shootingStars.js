// ===== GEMINIDS 1998 METEOR SHOWER EFFECT =====

function createMeteorShower() {
    console.log("Creating Geminids 1998 meteor shower...");
    
    // Remove existing meteor shower if it exists
    const existingShower = document.getElementById('meteorShower');
    if (existingShower) {
        existingShower.remove();
    }
    
    // Create container for shooting stars
    const meteorContainer = document.createElement('div');
    meteorContainer.className = 'meteor-shower';
    meteorContainer.id = 'meteorShower';
    
    // Number of shooting stars - representing the 120-140 per hour
    // We'll show more initially for a dramatic effect
    const starCount = 15;
    
    // Create shooting stars
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        
        // Random properties for each star
        const colorClass = `color-${Math.floor(Math.random() * 4) + 1}`;
        const speedClass = ['slow', 'medium', 'fast'][Math.floor(Math.random() * 3)];
        const angleClass = `angle-${Math.floor(Math.random() * 5) + 1}`;
        const delayClass = `delay-${Math.floor(Math.random() * 8) + 1}`;
        const isBright = Math.random() > 0.7;
        
        // Add classes
        star.classList.add(colorClass, speedClass, angleClass, delayClass);
        if (isBright) {
            star.classList.add('bright');
        }
        
        // Random starting position (coming from upper left, like Gemini constellation)
        const startX = Math.random() * 50 - 50; // Start off-screen left
        const startY = Math.random() * 30; // Start in upper portion
        
        star.style.left = `${startX}%`;
        star.style.top = `${startY}%`;
        
        // Random size variation (meteors vary in brightness)
        const size = 1 + Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random animation duration (1.5-3 seconds for visible flight)
        const duration = 1.5 + Math.random() * 1.5;
        star.style.animationDuration = `${duration}s`;
        
        meteorContainer.appendChild(star);
    }
    
    // Add to body - MAKE SURE IT'S BEFORE OTHER ELEMENTS
    document.body.insertBefore(meteorContainer, document.body.firstChild);
    
    // Function to spawn a new shooting star randomly (simulating 120-140 per hour)
    function spawnRandomStar() {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        
        // Random properties
        const colorClass = `color-${Math.floor(Math.random() * 4) + 1}`;
        const speedClass = ['slow', 'medium', 'fast'][Math.floor(Math.random() * 3)];
        const angleClass = `angle-${Math.floor(Math.random() * 5) + 1}`;
        const isBright = Math.random() > 0.7;
        
        star.classList.add(colorClass, speedClass, angleClass);
        if (isBright) {
            star.classList.add('bright');
        }
        
        // Random starting position (coming from Gemini region - upper left)
        const startX = Math.random() * 50 - 50;
        const startY = Math.random() * 30;
        
        star.style.left = `${startX}%`;
        star.style.top = `${startY}%`;
        
        // Random size
        const size = 1 + Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random duration
        const duration = 1.5 + Math.random() * 1.5;
        star.style.animationDuration = `${duration}s`;
        
        meteorContainer.appendChild(star);
        
        // Remove star after animation completes
        setTimeout(() => {
            if (star.parentNode === meteorContainer) {
                meteorContainer.removeChild(star);
            }
        }, duration * 1000);
    }
    
    // Spawn random stars occasionally (every 1-3 seconds for 120-140/hour effect)
    const spawnInterval = setInterval(() => {
        spawnRandomStar();
        
        // Occasionally spawn multiple at once (meteor shower bursts)
        if (Math.random() > 0.8) {
            setTimeout(() => spawnRandomStar(), 200);
            setTimeout(() => spawnRandomStar(), 400);
        }
    }, 1000 + Math.random() * 2000);
    
    // Clean up interval on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(spawnInterval);
    });
    
    console.log(`✓ Created Geminids 1998 meteor shower with ${starCount} initial stars`);
    
    return meteorContainer;
}

// Create enhanced meteor shower for meteor screen
function createEnhancedMeteorShower() {
    console.log("Creating enhanced Geminids 1998 meteor shower...");
    
    const meteorContainer = createMeteorShower();
    
    // Make it more active for the meteor screen
    const stars = meteorContainer.querySelectorAll('.shooting-star');
    stars.forEach(star => {
        // Faster, brighter meteors
        star.style.animationDuration = '1s';
        star.classList.add('bright');
        
        // Make trail longer
        star.style.setProperty('--trail-length', '150px');
    });
    
    return meteorContainer;
}

// Initialize meteor shower when DOM is loaded - FOR BOTH PAGES
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, creating meteor shower for intro page...");
    
    // Create meteor shower immediately for intro page
    setTimeout(() => {
        createMeteorShower();
        
        // Verify it was created
        const meteorContainer = document.getElementById('meteorShower');
        if (meteorContainer) {
            console.log("✓ Meteor shower container created successfully");
            console.log(`Container has ${meteorContainer.children.length} shooting stars`);
            
            // Check CSS is applied
            const stars = meteorContainer.querySelectorAll('.shooting-star');
            stars.forEach((star, i) => {
                console.log(`Star ${i}: opacity=${star.style.opacity}, animation=${star.style.animation}`);
            });
        } else {
            console.error("❌ Meteor shower container not found!");
        }
    }, 100); // Reduced delay to create sooner
});

// Make functions available globally
window.createMeteorShower = createMeteorShower;
window.createEnhancedMeteorShower = createEnhancedMeteorShower;
