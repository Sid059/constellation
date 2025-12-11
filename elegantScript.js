// ===== ELEGANT INTRODUCTION SCRIPT =====

let currentScreen = 0;
let isTyping = false;
let typeTimeout;

// DOM Elements
const elements = {
    elegantIntro: document.getElementById('elegantIntro'),
    startJourney: document.getElementById('startJourney'),
    enterConstellation: document.getElementById('enterConstellation'),
    prevScreen: document.getElementById('prevScreen'),
    nextScreen: document.getElementById('nextScreen'),
    screens: document.querySelectorAll('.intro-screen'),
    progressDots: document.querySelectorAll('.progress-dot'),
    moonText: document.getElementById('moonText'),
    skyText: document.getElementById('skyText'),
    meteorText: document.getElementById('meteorText'),
    container: document.querySelector('.container')
};

// Typewriter Effect
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
        
        const texts = [
            "As you took your first breath at 1:30 AM, my love, the moon paused its journey across the sky. It watched as you took your first breath, casting its silver glow as if to say, 'Here comes someone who will light up lives.' That moonlight was the universe's first gift to you a promise that magic would follow wherever you go, and that you were meant to shine brighter than any celestial body.",
            "As you entered the world, the entire universe seemed to hold its breath. Libra, your constellation, dipped low to welcome its newest member. Venus shone brighter than ever, showering you with blessings of love and grace. I like to think those stars weren't just random lights, but promises waiting to be fulfilled promises that you would grow into someone whose kindness outshines even the brightest star, whose laughter would become my favorite constellation. Every star in that sky made a silent vow: to remember this night, to watch over you, and to one day guide me to you.",
            "On December 14, 1998, as you took your first breath, the universe celebrated with the Geminids meteor shower at its peak—120 to 140 meteors per hour painting the sky with celestial fireworks. Each shooting star streaked from the constellation Gemini, creating a breathtaking welcome for the most beautiful soul they'd ever witnessed. The universe couldn't contain its excitement, throwing the most spectacular welcome party imaginable just for you. Those meteors were the first of countless moments when the world would celebrate your existence."
        ];
        
        const textElements = [elements.moonText, elements.skyText, elements.meteorText];
        
        if (currentScreen >= 1 && currentScreen <= 3) {
            textElements[currentScreen - 1].textContent = texts[currentScreen - 1];
        }
    }
}

// Switch to a specific screen
function goToScreen(screenIndex) {
    if (screenIndex < 0 || screenIndex >= elements.screens.length) return;
    
    skipTyping();
    
    elements.screens.forEach(screen => screen.classList.remove('active'));
    elements.screens[screenIndex].classList.add('active');
    
    elements.progressDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === screenIndex);
    });
    
    elements.prevScreen.style.display = screenIndex === 0 ? 'none' : 'flex';
    elements.nextScreen.style.display = screenIndex === elements.screens.length - 1 ? 'none' : 'flex';
    
    currentScreen = screenIndex;
    
    switch(screenIndex) {
        case 1:
            setTimeout(() => {
                typeWriter(elements.moonText, 
                    "As you took your first breath at 1:30 AM, my love, the moon paused its journey across the sky. It watched as you took your first breath, casting its silver glow as if to say, 'Here comes someone who will light up lives.' That moonlight was the universe's first gift to you a promise that magic would follow wherever you go, and that you were meant to shine brighter than any celestial body.", 
                    40
                );
            }, 300);
            break;
            
        case 2:
            setTimeout(() => {
                typeWriter(elements.skyText, 
                    "As you entered the world, the entire universe seemed to hold its breath. Libra, your constellation, dipped low to welcome its newest member. Venus shone brighter than ever, showering you with blessings of love and grace. I like to think those stars weren't just random lights, but promises waiting to be fulfilled promises that you would grow into someone whose kindness outshines even the brightest star, whose laughter would become my favorite constellation. Every star in that sky made a silent vow: to remember this night, to watch over you, and to one day guide me to you.", 
                    40
                );
            }, 300);
            break;
            
        case 3:
            setTimeout(() => {
                // Update meteor text with specific 1998 details
                typeWriter(elements.meteorText, 
                    "On December 14, 1998, as you took your first breath, the universe celebrated with the Geminids meteor shower at its peak—120 to 140 meteors per hour painting the sky with celestial fireworks. Each shooting star streaked from the constellation Gemini, creating a breathtaking welcome for the most beautiful soul they'd ever witnessed. The universe couldn't contain its excitement, throwing the most spectacular welcome party imaginable just for you. Those meteors were the first of countless moments when the world would celebrate your existence.", 
                    40,
                    () => {
                        // Enhance meteor shower during this screen
                        if (typeof createEnhancedMeteorShower === 'function') {
                            setTimeout(() => {
                                createEnhancedMeteorShower();
                            }, 500);
                        }
                    }
                );
            }, 300);
            break;
    }
}

// Start the journey
function startJourney() {
    // Play background music
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic) {
        console.log("Playing background music...");
        backgroundMusic.volume = 0.3; // Set volume to 30% (so it's not too loud)
        
        // Try to play the music
        backgroundMusic.play().then(() => {
            console.log("Background music started successfully");
        }).catch(error => {
            console.log("Music autoplay prevented by browser. Will start on user interaction.");
            // This is normal - many browsers require user interaction first
            
            // Music will automatically start when user clicks anything else
            // Modern browsers will allow it after the initial button click
        });
    }

    goToScreen(1);
}

// Enter star field - ENSURE SCROLLING IS ENABLED
function enterStarField() {
    console.log("Entering star field...");
    
    // Meteor shower is already running from the intro
    
    // Try to play music again (in case autoplay was blocked earlier)
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic && backgroundMusic.paused) {
        backgroundMusic.play().catch(e => {
            console.log("Music still blocked, will play on next interaction");
        });
    }
    
    // Immediately hide intro
    elements.elegantIntro.style.display = 'none';
    
    // IMPORTANT: Enable body scrolling
    document.body.style.overflowY = 'auto';
    document.body.style.height = 'auto';
    
    // Immediately show container
    elements.container.style.display = 'flex';
    elements.container.style.opacity = '0';
    
    // Force reflow
    elements.container.offsetHeight;
    
    // Fade in container
    setTimeout(() => {
        elements.container.style.opacity = '1';
        elements.container.style.transition = 'opacity 0.8s ease';
        
        // Initialize constellation IMMEDIATELY
        setTimeout(() => {
            console.log("Calling initConstellation...");
            if (typeof window.initConstellation === 'function') {
                window.initConstellation();
                
                // Verify stars were created
                setTimeout(() => {
                    const starCount = document.querySelectorAll('.star').length;
                    console.log(`Stars on page after init: ${starCount}`);
                    
                    if (starCount === 0) {
                        console.error("NO STARS FOUND! Manual emergency fix...");
                        // Manual star creation as last resort
                        const starsContainer = document.getElementById('starsContainer');
                        if (starsContainer) {
                            console.log("Creating stars manually...");
                            starsContainer.innerHTML = '';
                            
                            for (let i = 0; i < 27; i++) {
                                const star = document.createElement('div');
                                star.className = 'star';
                                star.textContent = '★';
                                star.style.position = 'absolute';
                                star.style.left = `${Math.random() * 100}%`;
                                star.style.top = `${Math.random() * 100}%`;
                                star.style.color = 'white';
                                star.style.fontSize = '24px';
                                starsContainer.appendChild(star);
                            }
                        }
                    }
                }, 500);
            } else {
                console.error("initConstellation function not found!");
            }
        }, 100);
    }, 10);
}

// Initialize elegant introduction
function initElegantIntro() {
    console.log("Initializing elegant intro...");
    
    // START: Add meteor shower immediately
    console.log("Starting meteor shower for intro...");
    setTimeout(() => {
        if (typeof createMeteorShower === 'function') {
            createMeteorShower();
            
            // Force the shooting stars to be visible
            const meteorContainer = document.getElementById('meteorShower');
            if (meteorContainer) {
                // Make sure the container is visible
                meteorContainer.style.display = 'block';
                meteorContainer.style.opacity = '1';
                meteorContainer.style.zIndex = '5';
                
                // Force the shooting stars to be visible
                const stars = meteorContainer.querySelectorAll('.shooting-star');
                stars.forEach(star => {
                    star.style.opacity = '1';
                    star.style.display = 'block';
                });
                
                console.log(`✓ Meteor shower initialized with ${stars.length} stars`);
            }
        } else {
            console.error("createMeteorShower function not available!");
        }
    }, 300);
    
    elements.startJourney.addEventListener('click', startJourney);
    elements.enterConstellation.addEventListener('click', enterStarField);
    
    elements.prevScreen.addEventListener('click', () => {
        if (currentScreen > 0) goToScreen(currentScreen - 1);
    });
    
    elements.nextScreen.addEventListener('click', () => {
        if (currentScreen < elements.screens.length - 1) goToScreen(currentScreen + 1);
    });
    
    elements.progressDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== currentScreen) goToScreen(index);
        });
    });
    
    elements.elegantIntro.addEventListener('click', (e) => {
        if (e.target === elements.elegantIntro) skipTyping();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'Enter') skipTyping();
        if (e.code === 'ArrowLeft' && currentScreen > 0) goToScreen(currentScreen - 1);
        if (e.code === 'ArrowRight' && currentScreen < elements.screens.length - 1) goToScreen(currentScreen + 1);
        if (e.code === 'Escape' && currentScreen > 0) goToScreen(0);
    });
    
    elements.prevScreen.style.display = 'none';
    console.log("✓ Elegant intro initialized");
}

// Start everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, initializing elegant intro...");
    // Ensure body is not scrollable during intro
    document.body.style.overflowY = 'hidden';
    
    // Meteor shower is already initialized by shootingStars.js
    
    initElegantIntro();
});
