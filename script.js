// ==================== PHASE MANAGEMENT ====================
function switchPhase(fromPhase, toPhase) {
    const from = document.getElementById(fromPhase);
    const to = document.getElementById(toPhase);
    
    from.classList.add('fade-out');
    
    setTimeout(function() {
        from.classList.remove('active', 'fade-out');
        to.classList.add('active');
        
        if (toPhase === 'phase2') {
            initPhase2();
        } else if (toPhase === 'phase3') {
            initPhase3();
        } else if (toPhase === 'phase4') {
            initPhase4();
        }
    }, 1500);
}

// ==================== PHASE 1: ENTRANCE (ENHANCED!) ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing Enhanced Phase 1...');
    
    // Create sparkles for phase 1
    const sparkles1Container = document.getElementById('sparkles1');
    for (let i = 0; i < 50; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        sparkles1Container.appendChild(sparkle);
    }

    // Create falling hearts
    const fallingHeartsContainer = document.getElementById('fallingHearts');
    
    function createFallingHeart() {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 25) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        
        const heartTypes = ['♥', '♡', '❤', '💕', '💖'];
        heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        
        fallingHeartsContainer.appendChild(heart);
    }

    for (let i = 0; i < 30; i++) {
        createFallingHeart();
    }

    // Create rose petals in entrance
    const entrancePetalsContainer = document.getElementById('entrancePetals');
    
    function createEntrancePetal() {
        const petal = document.createElement('div');
        petal.className = 'entrance-petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDelay = Math.random() * 5 + 's';
        petal.style.animationDuration = (Math.random() * 8 + 12) + 's';
        entrancePetalsContainer.appendChild(petal);
    }

    for (let i = 0; i < 20; i++) {
        createEntrancePetal();
    }

    // Typewriter effect
    const textToType = "Baby, I have something special for you...";
    const typewriterElement = document.getElementById('typewriterText');
    const cursorElement = document.getElementById('cursor');
    
    let currentIndex = 0;

    function typeNextCharacter() {
        if (currentIndex < textToType.length) {
            typewriterElement.textContent += textToType.charAt(currentIndex);
            currentIndex++;
            setTimeout(typeNextCharacter, 80);
        } else {
            // Typing complete - hide cursor and show prompt
            setTimeout(function() {
                cursorElement.classList.add('cursor-hidden');
                document.getElementById('enterPrompt').classList.add('visible');
            }, 500);
        }
    }

    // Start typewriter after 1 second
    setTimeout(function() {
        typeNextCharacter();
    }, 1000);

    // Click to proceed to Phase 2
    const enterPrompt = document.getElementById('enterPrompt');
    enterPrompt.addEventListener('click', function(e) {
        e.stopPropagation();
        switchPhase('phase1', 'phase2');
    });

    // Allow clicking anywhere after typing is complete
    setTimeout(function() {
        const phase1 = document.getElementById('phase1');
        phase1.addEventListener('click', function(e) {
            if (cursorElement.classList.contains('cursor-hidden') && e.target !== enterPrompt) {
                switchPhase('phase1', 'phase2');
            }
        });
    }, 6000);
});

// ==================== PHASE 2: CHOCOLATE GAME ====================
let gameActive = false;
let chocolatesCollected = 0;
const totalChocolates = 5;
let spawnInterval;

function initPhase2() {
    console.log('Initializing Phase 2...');
    
    // Create sparkles for phase 2
    const sparkles2Container = document.getElementById('sparkles2');
    sparkles2Container.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        sparkles2Container.appendChild(sparkle);
    }

    // Reset game state
    chocolatesCollected = 0;
    document.getElementById('chocolateCount').textContent = '0';
    document.getElementById('completionMessage').classList.remove('show');
    document.getElementById('chocolateContainer').innerHTML = '';
    gameActive = true;

    // Start spawning chocolates
    spawnInterval = setInterval(function() {
        if (gameActive) {
            createChocolate();
        } else {
            clearInterval(spawnInterval);
        }
    }, 800);
}

const chocolateEmojis = ['🍫', '🍬', '🍭', '🍩', '🧁'];

// Create celebration particles
function createCelebration(x, y) {
    const chocolateContainer = document.getElementById('chocolateContainer');
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'celebration-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        const angle = (Math.PI * 2 * i) / 12;
        const distance = 50 + Math.random() * 50;
        particle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
        
        chocolateContainer.appendChild(particle);
        setTimeout(function() {
            particle.remove();
        }, 1000);
    }
}

// Create falling chocolate
function createChocolate() {
    if (!gameActive) return;

    const chocolateContainer = document.getElementById('chocolateContainer');
    const chocolate = document.createElement('div');
    chocolate.className = 'chocolate';
    chocolate.innerHTML = chocolateEmojis[Math.floor(Math.random() * chocolateEmojis.length)];
    chocolate.style.left = Math.random() * (window.innerWidth - 50) + 'px';
    chocolate.style.top = '-100px';
    
    const fallDuration = Math.random() * 3 + 4;
    chocolate.style.animationDuration = fallDuration + 's';

    chocolate.addEventListener('click', function(e) {
        if (chocolatesCollected < totalChocolates) {
            chocolatesCollected++;
            document.getElementById('chocolateCount').textContent = chocolatesCollected;
            
            createCelebration(e.clientX, e.clientY);
            this.classList.add('caught');
            
            if (chocolatesCollected >= totalChocolates) {
                gameComplete();
            }
            
            setTimeout(function() {
                chocolate.remove();
            }, 500);
        }
    });

    chocolateContainer.appendChild(chocolate);

    setTimeout(function() {
        if (chocolate.parentNode) {
            chocolate.remove();
        }
    }, fallDuration * 1000);
}

// Game complete
function gameComplete() {
    console.log('Game complete!');
    gameActive = false;
    setTimeout(function() {
        document.getElementById('completionMessage').classList.add('show');
    }, 500);
}

// Continue to Phase 3
document.addEventListener('DOMContentLoaded', function() {
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            console.log('Continue to Phase 3 clicked!');
            switchPhase('phase2', 'phase3');
        });
    }
});

// ==================== PHASE 3: TEDDY DAY ====================
function initPhase3() {
    console.log('Initializing Phase 3...');
    
    // Create sparkles for phase 3
    const sparkles3Container = document.getElementById('sparkles3');
    sparkles3Container.innerHTML = '';
    for (let i = 0; i < 40; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        sparkles3Container.appendChild(sparkle);
    }
}

// Teddy gifts data
const teddyGifts = {
    1: {
        emoji: '💌',
        title: 'My Promise Letter',
        message: 'My dearest love, I promise to stand by you through every sunrise and sunset. To hold your hand through storms and sunshine. To make you smile when you\'re down. To cherish every moment we share. You are my everything, and I promise to love you endlessly, today and always. Forever yours. ❤️',
        animation: '',
        gif: 'https://media.giphy.com/media/GFtJhEvG3681y/giphy.gif'
    },
    2: {
        emoji: '🤗',
        title: 'A Warm Hug',
        message: 'Here\'s a big, warm virtual hug just for you! Imagine my arms wrapped around you, holding you close and making you feel safe and loved. No matter where you are, remember that you\'re always in my heart and my hugs are always waiting for you. 💕',
        animation: 'hug-animation',
        gif: 'https://media.giphy.com/media/IzXiddo2twMmdmU8Lv/giphy.gif'
    },
    3: {
        emoji: '💋',
        title: 'A Sweet Kiss',
        message: 'Sending you the sweetest kiss filled with all my love! Every kiss is a promise of my devotion to you. You make my heart flutter and my soul sing. This kiss is a reminder that you are cherished, adored, and deeply loved. Mwah! 😘💖',
        animation: 'kiss-animation',
        gif: 'https://media.giphy.com/media/KmxmoHUGPDjfQXqGgv/giphy.gif'
    }
};

// Teddy click handlers
document.addEventListener('DOMContentLoaded', function() {
    const teddyItems = document.querySelectorAll('.teddy-item');
    const giftModal = document.getElementById('giftModal');
    const giftEmoji = document.getElementById('giftEmoji');
    const giftTitle = document.getElementById('giftTitle');
    const giftMessage = document.getElementById('giftMessage');
    const closeModal = document.getElementById('closeModal');

    teddyItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const teddyNum = this.getAttribute('data-teddy');
            const gift = teddyGifts[teddyNum];
            
            // Reset any previous animation classes
            giftEmoji.className = 'gift-emoji';
            
            // Set content
            giftEmoji.textContent = gift.emoji;
            giftTitle.textContent = gift.title;
            giftMessage.textContent = gift.message;
            
            // Add special animation if specified
            if (gift.animation) {
                giftEmoji.classList.add(gift.animation);
            }
            
            // Update GIF
            const giftGifContainer = document.getElementById('giftGif');
            if (gift.gif && giftGifContainer) {
                giftGifContainer.innerHTML = '<img src="' + gift.gif + '" alt="Gift animation">';
                giftGifContainer.style.display = 'block';
            }
            
            giftModal.classList.add('active');
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            giftModal.classList.remove('active');
        });
    }

    if (giftModal) {
        giftModal.addEventListener('click', function(e) {
            if (e.target === giftModal) {
                giftModal.classList.remove('active');
            }
        });
    }

    // Next phase button
    const nextPhaseBtn = document.getElementById('nextPhaseBtn');
    if (nextPhaseBtn) {
        nextPhaseBtn.addEventListener('click', function() {
            console.log('Moving to Phase 4 - Proposal!');
            switchPhase('phase3', 'phase4');
        });
    }
});

// ==================== PHASE 4: PROPOSAL ====================
function initPhase4() {
    console.log('Initializing Phase 4 - Proposal...');
    startHeartFormation();
}

// Heart Formation Animation
function startHeartFormation() {
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    const overlay = document.getElementById('heartFormationOverlay');
    const formationComplete = document.getElementById('formationComplete');
    const proposalContainer = document.getElementById('proposalContainer');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const numParticles = 300;
    
    function heartShape(t) {
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        return { x: x * 15, y: y * 15 };
    }
    
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            targetX: 0,
            targetY: 0,
            size: Math.random() * 4 + 2,
            speed: Math.random() * 0.02 + 0.01,
            color: `rgba(255, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 50)}, ${Math.random() * 0.5 + 0.5})`
        });
    }
    
    particles.forEach((particle, i) => {
        const angle = (i / numParticles) * Math.PI * 2;
        const heart = heartShape(angle);
        particle.targetX = canvas.width / 2 + heart.x;
        particle.targetY = canvas.height / 2 + heart.y - 50;
    });
    
    let animationFrame;
    let formationProgress = 0;
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        let allInPlace = true;
        
        particles.forEach(particle => {
            const dx = particle.targetX - particle.x;
            const dy = particle.targetY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 2) {
                particle.x += dx * particle.speed;
                particle.y += dy * particle.speed;
                allInPlace = false;
            } else {
                particle.x = particle.targetX;
                particle.y = particle.targetY;
            }
            
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(255, 0, 0, 0.8)';
        });
        
        formationProgress++;
        
        if (formationProgress > 250 || allInPlace) {
            cancelAnimationFrame(animationFrame);
            
            formationComplete.classList.add('show');
            
            setTimeout(() => {
                overlay.style.transition = 'opacity 1s ease-out';
                overlay.style.opacity = '0';
                
                setTimeout(() => {
                    overlay.classList.remove('active');
                    overlay.style.display = 'none';
                    
                    proposalContainer.style.transition = 'opacity 1.5s ease-in';
                    proposalContainer.style.opacity = '1';
                    
                    initPhase4Effects();
                }, 1000);
            }, 2000);
        } else {
            animationFrame = requestAnimationFrame(animate);
        }
    }
    
    setTimeout(() => {
        animate();
    }, 1000);
}

// Initialize Phase 4 effects
function initPhase4Effects() {
    console.log('Initializing Phase 4 effects...');
    
    // Create sparkles
    const sparkles4Container = document.getElementById('sparkles4');
    sparkles4Container.innerHTML = '';
    for (let i = 0; i < 50; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        sparkles4Container.appendChild(sparkle);
    }
    
    // Create floating hearts
    const floatingHeartsContainer = document.getElementById('floatingHearts');
    floatingHeartsContainer.innerHTML = '';
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = ['💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 30 + 30) + 'px';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        floatingHeartsContainer.appendChild(heart);
    }
    
    // Create rose petals
    const rosePetalsContainer = document.getElementById('rosePetals');
    rosePetalsContainer.innerHTML = '';
    for (let i = 0; i < 30; i++) {
        const petal = document.createElement('div');
        petal.className = 'rose-petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDelay = Math.random() * 5 + 's';
        petal.style.animationDuration = (Math.random() * 8 + 10) + 's';
        rosePetalsContainer.appendChild(petal);
    }
}

// NO button dodging
let noDodgeCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    
    if (noBtn) {
        noBtn.addEventListener('mouseenter', function() {
            noDodgeCount++;
            
            const maxX = window.innerWidth - this.offsetWidth - 100;
            const maxY = window.innerHeight - this.offsetHeight - 100;
            
            let randomX = Math.random() * maxX - maxX / 2;
            let randomY = Math.random() * maxY - maxY / 2;
            
            randomX = Math.max(-maxX / 2, Math.min(maxX / 2, randomX));
            randomY = Math.max(-maxY / 2, Math.min(maxY / 2, randomY));
            
            this.style.setProperty('--dodge-x', randomX + 'px');
            this.style.setProperty('--dodge-y', randomY + 'px');
            
            if (noDodgeCount === 2) {
                this.querySelector('.btn-text').textContent = 'Are you sure? 🥺';
            } else if (noDodgeCount === 3) {
                this.querySelector('.btn-text').textContent = 'Really? 😢';
            } else if (noDodgeCount === 4) {
                this.querySelector('.btn-text').textContent = 'Please... 💔';
            } else if (noDodgeCount >= 5) {
                this.querySelector('.btn-text').textContent = "You can't click me! 😏";
                randomX *= 2;
                randomY *= 2;
                this.style.setProperty('--dodge-x', randomX + 'px');
                this.style.setProperty('--dodge-y', randomY + 'px');
            }
        });
        
        noBtn.addEventListener('click', function() {
            alert('The button dodged you! Guess it\'s meant to be YES! 💕');
        });
    }
    
    if (yesBtn) {
        yesBtn.addEventListener('click', function() {
            console.log('YES clicked! Starting celebration!');
            celebrate();
        });
    }
});

// Celebration
function celebrate() {
    const celebrationOverlay = document.getElementById('celebrationOverlay');
    celebrationOverlay.classList.add('active');
    
    // Random rotation for memory photos
    const memoryPhotos = document.querySelectorAll('.memory-photo');
    memoryPhotos.forEach((photo, index) => {
        const rotation = (Math.random() - 0.5) * 20;
        photo.style.setProperty('--rotate', rotation + 'deg');
    });
    
    // Create fireworks
    const fireworksContainer = document.getElementById('fireworks');
    for (let i = 0; i < 50; i++) {
        setTimeout(function() {
            createFirework(fireworksContainer);
        }, i * 100);
    }
    
    // Create explosion hearts
    const explosionHeartsContainer = document.getElementById('explosionHearts');
    for (let i = 0; i < 30; i++) {
        setTimeout(function() {
            createExplosionHeart(explosionHeartsContainer);
        }, i * 80);
    }
    
    setInterval(function() {
        for (let i = 0; i < 5; i++) {
            setTimeout(function() {
                createFirework(fireworksContainer);
            }, i * 200);
        }
    }, 3000);
}

function createFirework(container) {
    const colors = ['#ff1493', '#ff69b4', '#ffb6c1', '#fff', '#ffd700'];
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.background = colors[Math.floor(Math.random() * colors.length)];
    firework.style.left = Math.random() * 100 + '%';
    firework.style.top = Math.random() * 100 + '%';
    
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 300 + 200;
    firework.style.setProperty('--fx', Math.cos(angle) * distance + 'px');
    firework.style.setProperty('--fy', Math.sin(angle) * distance + 'px');
    
    container.appendChild(firework);
    
    setTimeout(function() {
        firework.remove();
    }, 1500);
}

function createExplosionHeart(container) {
    const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '💘'];
    const heart = document.createElement('div');
    heart.className = 'explosion-heart';
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = '50%';
    heart.style.top = '50%';
    
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 400 + 300;
    heart.style.setProperty('--ex', Math.cos(angle) * distance + 'px');
    heart.style.setProperty('--ey', Math.sin(angle) * distance + 'px');
    
    container.appendChild(heart);
    
    setTimeout(function() {
        heart.remove();
    }, 2000);
}

// Next journey button
document.addEventListener('DOMContentLoaded', function() {
    const nextJourneyBtn = document.getElementById('nextJourneyBtn');
    if (nextJourneyBtn) {
        nextJourneyBtn.addEventListener('click', function() {
            alert('Thank you for this beautiful journey! 💕✨');
        });
    }
});