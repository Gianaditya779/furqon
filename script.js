/* ============================================
   PREMIUM ROMANTIC BIRTHDAY WEBSITE
   JavaScript Functionality
   ============================================ */

// ============================================
// PASSWORD GATE
// ============================================

const correctPassword = "0101"; // Change this to your desired password

function initializePasswordGate() {
    const passwordGate = document.getElementById('passwordGate');
    const passwordInput = document.getElementById('passwordInput');
    const unlockBtn = document.getElementById('unlockBtn');
    const passwordMessage = document.getElementById('passwordMessage');
    const mainContent = document.getElementById('mainContent');

    // Create floating particles
    createPasswordParticles();

    unlockBtn.addEventListener('click', () => {
        const enteredPassword = passwordInput.value.trim();

        if (enteredPassword === correctPassword) {
            // Correct password
            passwordGate.classList.add('fade-out');
            setTimeout(() => {
                passwordGate.style.display = 'none';
                mainContent.style.display = 'block';
                initializeWebsite();
                playBackgroundMusic();
            }, 1000);
        } else {
            // Wrong password
            passwordInput.style.borderColor = '#ff6b8a';
            passwordInput.style.boxShadow = '0 0 20px rgba(255, 107, 138, 0.5)';
            passwordMessage.textContent = "hmm... that's not our secret :(";
            passwordMessage.classList.add('show');

            // Shake animation
            passwordInput.style.animation = 'shake 0.5s ease-in-out';

            setTimeout(() => {
                passwordInput.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                passwordInput.style.boxShadow = 'none';
                passwordInput.style.animation = '';
                passwordMessage.classList.remove('show');
            }, 2000);
        }
    });

    // Enter key support
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            unlockBtn.click();
        }
    });
}

function createPasswordParticles() {
    const particlesContainer = document.getElementById('passwordParticles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 143, 177, 0.6)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';

        particlesContainer.appendChild(particle);
    }
}

// ============================================
// INITIALIZATION (UPDATED)
// ============================================

function initializeWebsite() {
    // Loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('fade-out');
    }, 2500);

    // Initialize features after loading
    setTimeout(() => {
        createStarField();
        createFloatingHearts();
        attachEventListeners();
        attachGameEventListeners();
        initializeCounter();
        createFireworks();
        startTypingAnimation();
    }, 2800);
}

// ============================================

// ============================================
// STAR FIELD ANIMATION
// ============================================

function createStarField() {
    const starsContainer = document.getElementById('starsContainer');
    const starCount = 50;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3 + 0.5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 3 + 2;

        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = x + '%';
        star.style.top = y + '%';
        star.style.animationDuration = duration + 's';
        star.style.animationDelay = Math.random() * 3 + 's';

        starsContainer.appendChild(star);
    }
}

// ============================================
// FLOATING HEARTS ANIMATION
// ============================================

function createFloatingHearts(containerId = 'floatingHeartsHero') {
    const container = document.getElementById(containerId);
    if (!container) return;

    function addHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '❤️';
        
        const x = Math.random() * 100;
        const size = Math.random() * 1.5 + 1;
        const duration = Math.random() * 4 + 6;
        const delay = Math.random() * 2;

        heart.style.left = x + '%';
        heart.style.fontSize = size + 'rem';
        heart.style.animationDuration = duration + 's';
        heart.style.animationDelay = delay + 's';

        container.appendChild(heart);

        setTimeout(() => heart.remove(), (duration + delay) * 1000);
    }

    // Create hearts periodically
    setInterval(addHeart, 800);
    
    // Create initial hearts
    for (let i = 0; i < 3; i++) {
        setTimeout(addHeart, i * 400);
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

function attachEventListeners() {
    // Open Heart Button
    const openHeartBtn = document.getElementById('openHeartBtn');
    openHeartBtn.addEventListener('click', scrollToTimeline);

    // Secret Stars
    const secretStars = document.querySelectorAll('.secret-star');
    secretStars.forEach((star, index) => {
        star.addEventListener('click', () => showSecretMessage(index));
    });

    // Modal Close
    const modalClose = document.getElementById('modalClose');
    const modal = document.getElementById('secretModal');
    modalClose.addEventListener('click', () => modal.classList.remove('show'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('show');
    });

    // Music Player
    const playBtn = document.getElementById('playBtn');
    playBtn.addEventListener('click', toggleMusic);

    // Scroll animations
    observeElements();
}

// ============================================
// SCROLL TO TIMELINE
// ============================================

function scrollToTimeline() {
    const timelineSection = document.getElementById('timelineSection');
    timelineSection.scrollIntoView({ behavior: 'smooth' });
    
    // Play gentle music
    playBackgroundMusic();
}

// ============================================
// SECRET MESSAGES
// ============================================

const secretMessages = [
    "Every moment with you is my favorite moment. 💕",
    "You make my heart skip a beat, always. 💗",
    "In a crowded room, I'd always choose you. ✨",
    "You are my greatest adventure and my safe place. 🌟",
    "Thank you for loving me the way you do. 💝"
];

function showSecretMessage(index) {
    const modal = document.getElementById('secretModal');
    const modalText = document.getElementById('modalText');
    
    modalText.textContent = secretMessages[index % secretMessages.length];
    modal.classList.add('show');
    
    // Add magical effect
    createMagicalParticles(event.target);
}

function createMagicalParticles(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.textContent = '✨';
        particle.style.position = 'fixed';
        particle.style.left = rect.left + 'px';
        particle.style.top = rect.top + 'px';
        particle.style.fontSize = '1rem';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '6000';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 5;
        const velocity = 3;
        let x = rect.left;
        let y = rect.top;
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity;
        let life = 1;
        
        function animate() {
            x += vx;
            y += vy;
            life -= 0.02;
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = life;
            
            if (life > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        animate();
    }
}

// ============================================
// TYPING ANIMATION FOR LOVE LETTER
// ============================================

const letterContent = `Haloo, happy birthdayy, may all your wishes come truee, hope you're always safe and healthy, I just hope we can be together forever and everr, no matter how hard.
tysm for always being on my sidee, I am reaaallly grateful to have you heree.
Hope you like all the gifts for youu. 💕`;

function startTypingAnimation() {
    const letterText = document.getElementById('letterText');
    let currentIndex = 0;
    const typingSpeed = 20; // milliseconds per character

    function typeCharacter() {
        if (currentIndex < letterContent.length) {
            letterText.textContent += letterContent[currentIndex];
            currentIndex++;
            setTimeout(typeCharacter, typingSpeed);
        }
    }

    // Start typing when letter section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && currentIndex === 0) {
                typeCharacter();
            }
        });
    });

    const letterSection = document.getElementById('letterSection');
    observer.observe(letterSection);
}

// ============================================
// RELATIONSHIP COUNTER
// ============================================

function initializeCounter() {
    // Set your relationship start date here
    // Format: new Date('YYYY-MM-DD')
    const relationshipStart = new Date('2025-09-20');

    function updateCounter() {
        const now = new Date();
        const difference = now - relationshipStart;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);

        document.getElementById('counterDays').textContent = days;
        document.getElementById('counterHours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('counterMinutes').textContent = minutes.toString().padStart(2, '0');
    }

    updateCounter();
}

// ============================================
// MINI GAMES
// ============================================

// ============================================
// CATCH THE HEART GAME
// ============================================

let catchGameInterval;
let catchGameTimer;
let catchScore = 0;
let catchTimeLeft = 30;

function startCatchGame() {
    const gameArea = document.getElementById('catchGameArea');
    const scoreDisplay = document.getElementById('catchScore');
    const timerDisplay = document.getElementById('catchTimer');
    const startBtn = document.getElementById('startCatchGame');

    // Reset game
    catchScore = 0;
    catchTimeLeft = 30;
    scoreDisplay.textContent = catchScore;
    timerDisplay.textContent = catchTimeLeft;
    gameArea.innerHTML = '<div class="game-ui"><div class="score-display">Score: <span id="catchScore">0</span></div><div class="timer-display">Time: <span id="catchTimer">30</span>s</div></div><button class="game-btn" id="startCatchGame">Start Game</button>';

    // Start game
    startBtn.textContent = 'Playing...';
    startBtn.disabled = true;

    // Create hearts
    catchGameInterval = setInterval(createCatchHeart, 800);

    // Timer
    catchGameTimer = setInterval(() => {
        catchTimeLeft--;
        timerDisplay.textContent = catchTimeLeft;

        if (catchTimeLeft <= 0) {
            endCatchGame();
        }
    }, 1000);
}

function createCatchHeart() {
    const gameArea = document.getElementById('catchGameArea');
    const heart = document.createElement('div');
    heart.className = 'catch-heart';
    heart.textContent = '❤️';
    heart.style.left = Math.random() * 80 + 10 + '%';
    heart.style.top = '100%';

    heart.addEventListener('click', () => {
        catchScore++;
        document.getElementById('catchScore').textContent = catchScore;
        heart.remove();

        // Create particle effect
        createHeartParticles(heart);
    });

    gameArea.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 3000);
}

function createHeartParticles(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.textContent = '✨';
        particle.style.position = 'fixed';
        particle.style.left = rect.left + 'px';
        particle.style.top = rect.top + 'px';
        particle.style.fontSize = '1rem';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.color = '#ff8fb1';

        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / 5;
        const velocity = 2;
        let x = rect.left;
        let y = rect.top;
        let life = 1;

        function animate() {
            x += Math.cos(angle) * velocity;
            y += Math.sin(angle) * velocity;
            life -= 0.02;
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = life;

            if (life > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        animate();
    }
}

function endCatchGame() {
    clearInterval(catchGameInterval);
    clearInterval(catchGameTimer);

    const gameArea = document.getElementById('catchGameArea');
    gameArea.innerHTML = '<div class="game-ui"><div class="score-display">Final Score: <span id="catchScore">' + catchScore + '</span></div></div><button class="game-btn" id="startCatchGame">Play Again</button>';

    // Show result modal
    showGameResult('Catch The Heart', `You caught ${catchScore} hearts! If loving you was a game, I'd still never lose ❤️`);

    // Reattach event listener
    document.getElementById('startCatchGame').addEventListener('click', startCatchGame);
}

// ============================================
// LOVE QUIZ GAME
// ============================================

const quizQuestions = [
    {
        question: "Who fell first?",
        options: ["You", "Me", "Both at the same time", "Still debating"],
        correct: 1
    },
    {
        question: "Who says 'I miss you' more?",
        options: ["You", "Me", "Equal", "Neither, we're always together"],
        correct: 1
    },
    {
        question: "Who is more clingy?",
        options: ["You", "Me", "Both equally", "Neither"],
        correct: 0
    },
    {
        question: "Who plans our dates?",
        options: ["You", "Me", "Both together", "Surprise dates"],
        correct: 1
    },
    {
        question: "Who is the better cook?",
        options: ["You", "Me", "Both amazing", "Takeout is our friend"],
        correct: 2
    }
];

let currentQuizQuestion = 0;
let quizScore = 0;

function startQuiz() {
    currentQuizQuestion = 0;
    quizScore = 0;
    showQuizQuestion();
}

function showQuizQuestion() {
    const quizContainer = document.getElementById('quizContainer');
    const question = quizQuestions[currentQuizQuestion];

    quizContainer.innerHTML = `
        <div class="quiz-question">${question.question}</div>
        <div class="quiz-options">
            ${question.options.map((option, index) =>
                `<div class="quiz-option" data-index="${index}">${option}</div>`
            ).join('')}
        </div>
        <div class="quiz-progress">Question <span id="currentQuestion">${currentQuizQuestion + 1}</span> of <span id="totalQuestions">${quizQuestions.length}</span></div>
    `;

    // Add event listeners to options
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', selectQuizOption);
    });
}

function selectQuizOption(e) {
    const selectedIndex = parseInt(e.target.dataset.index);
    const question = quizQuestions[currentQuizQuestion];

    // Highlight selected option
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    e.target.classList.add('selected');

    // Check if correct
    if (selectedIndex === question.correct) {
        quizScore++;
    }

    // Move to next question after delay
    setTimeout(() => {
        currentQuizQuestion++;
        if (currentQuizQuestion < quizQuestions.length) {
            showQuizQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);

    quizContainer.innerHTML = `
        <div class="quiz-question">Quiz Complete!</div>
        <div class="quiz-options">
            <div style="font-size: 2rem; margin: 1rem 0;">${quizScore}/${quizQuestions.length}</div>
            <div style="color: #ff8fb1; font-weight: 600;">${percentage}% Compatibility! 💕</div>
        </div>
        <button class="game-btn" id="restartQuiz">Take Quiz Again</button>
    `;

    // Show result modal
    showGameResult('Love Quiz', `We have ${percentage}% compatibility! You know me so well 💕`);

    document.getElementById('restartQuiz').addEventListener('click', startQuiz);
}

// ============================================
// MEMORY PUZZLE GAME
// ============================================

let puzzlePieces = [];
let puzzleBoard = [];

function startPuzzle() {
    const puzzleContainer = document.getElementById('puzzleContainer');

    // Create puzzle board
    puzzleBoard = Array(9).fill(null);
    puzzlePieces = [];

    // Create board
    const boardHTML = '<div class="puzzle-board" id="puzzleBoard">' +
        Array(9).fill().map((_, i) => `<div class="puzzle-piece" data-position="${i}"></div>`).join('') +
        '</div>';

    // Create pieces
    const piecesHTML = '<div class="puzzle-pieces" id="puzzlePieces">' +
        Array(9).fill().map((_, i) => `<div class="puzzle-piece-source" data-piece="${i}" style="background-image: url('images/foto1.jpeg'); background-position: ${-i % 3 * 33.33}% ${Math.floor(i / 3) * 33.33}%"></div>`).join('') +
        '</div>';

    puzzleContainer.innerHTML = boardHTML + piecesHTML;

    // Add drag and drop functionality
    initializePuzzleDragDrop();
}

function initializePuzzleDragDrop() {
    const pieces = document.querySelectorAll('.puzzle-piece-source');
    const boardSlots = document.querySelectorAll('.puzzle-piece');

    pieces.forEach(piece => {
        piece.addEventListener('dragstart', dragStart);
        piece.addEventListener('dragend', dragEnd);
    });

    boardSlots.forEach(slot => {
        slot.addEventListener('dragover', dragOver);
        slot.addEventListener('drop', drop);
    });
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.piece);
    e.target.classList.add('dragging');
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const pieceIndex = e.dataTransfer.getData('text/plain');
    const slotIndex = e.target.dataset.position;

    if (pieceIndex && slotIndex !== undefined) {
        // Place piece on board
        const piece = document.querySelector(`[data-piece="${pieceIndex}"]`);
        const slot = e.target;

        slot.style.backgroundImage = piece.style.backgroundImage;
        slot.style.backgroundPosition = piece.style.backgroundPosition;
        piece.remove();

        puzzleBoard[slotIndex] = pieceIndex;

        // Check if puzzle is complete
        if (puzzleBoard.every((piece, index) => piece == index)) {
            endPuzzle();
        }
    }
}

function endPuzzle() {
    // Show result modal
    showGameResult('Memory Puzzle', 'You complete my life too ❤️ Puzzle solved perfectly!');

    // Reset puzzle after delay
    setTimeout(() => {
        startPuzzle();
    }, 3000);
}

// ============================================
// GAME RESULT MODAL
// ============================================

function showGameResult(title, message) {
    const modal = document.createElement('div');
    modal.className = 'game-result-modal show';
    modal.innerHTML = `
        <div class="game-result-content">
            <div class="game-result-title">${title}</div>
            <div class="game-result-message">${message}</div>
            <button class="game-result-btn" onclick="this.parentElement.parentElement.remove()">Continue</button>
        </div>
    `;
    document.body.appendChild(modal);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 5000);
}

// ============================================
// ATTACH GAME EVENT LISTENERS
// ============================================

function attachGameEventListeners() {
    document.getElementById('startCatchGame')?.addEventListener('click', startCatchGame);
    document.getElementById('startQuiz')?.addEventListener('click', startQuiz);
    document.getElementById('startPuzzle')?.addEventListener('click', startPuzzle);
}

// ============================================
// FIREWORKS ANIMATION
// ============================================

function createFireworks() {
    const container = document.getElementById('fireworksContainer');
    if (!container) return;

    function createFirework() {
        const firework = document.createElement('div');
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        firework.textContent = ['✨', '💫', '🌟', '⭐'][Math.floor(Math.random() * 4)];
        firework.style.position = 'absolute';
        firework.style.left = x + '%';
        firework.style.top = y + '%';
        firework.style.fontSize = Math.random() * 2 + 1 + 'rem';
        firework.style.opacity = '1';
        firework.style.pointerEvents = 'none';
        
        container.appendChild(firework);
        
        let offsetY = 0;
        let opacity = 1;
        
        function animate() {
            offsetY -= 2;
            opacity -= 0.01;
            firework.style.transform = `translateY(${offsetY}px)`;
            firework.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                firework.remove();
            }
        }
        animate();
    }

    // Create fireworks periodically when finale is visible
    const finaleSection = document.getElementById('finaleSection');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const interval = setInterval(() => {
                    for (let i = 0; i < 5; i++) {
                        setTimeout(createFirework, i * 100);
                    }
                }, 1500);
                
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(finaleSection);
}

// ============================================
// MUSIC PLAYER
// ============================================

let isPlaying = false;
let audioElement = null;

function toggleMusic() {
    const playBtn = document.getElementById('playBtn');
    const musicPlayer = document.getElementById('musicPlayer');

    if (!audioElement) {
        // Create audio element with background music
        audioElement = new Audio();
        audioElement.src = 'music/a-piece-of-you.mp3';
        audioElement.loop = true;
        audioElement.volume = 0.3;
    }

    if (!isPlaying) {
        audioElement.play().catch(() => {
            console.log('Could not play audio');
        });
        playBtn.textContent = '⏸';
        isPlaying = true;
        musicPlayer.style.animation = 'glowPulse 1s ease-in-out infinite';
    } else {
        audioElement.pause();
        playBtn.textContent = '▶';
        isPlaying = false;
        musicPlayer.style.animation = 'none';
    }
}

function playBackgroundMusic() {
    if (!isPlaying) {
        toggleMusic();
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });

    // Observe reason cards
    document.querySelectorAll('.reason-card').forEach(card => {
        observer.observe(card);
    });

    // Observe timeline items when scrolling
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = `timelineReveal 0.8s ease-out forwards`;
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                    intersectionObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        intersectionObserver.observe(item);
    });
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.hash) {
        e.preventDefault();
        const target = document.querySelector(e.target.hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ============================================
// PARALLAX EFFECT ON SCROLL
// ============================================

let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach((element) => {
        const parallaxValue = scrolled * 0.5;
        element.style.transform = `translateY(${parallaxValue}px)`;
    });

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ============================================
// RESPONSIVE ADJUSTMENTS
// ============================================

function handleResize() {
    const width = window.innerWidth;
    
    // Adjust animations based on screen size
    if (width <= 768) {
        // Mobile adjustments
        document.documentElement.style.setProperty('--transition-smooth', 'all 0.4s ease-out');
    } else {
        document.documentElement.style.setProperty('--transition-smooth', 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)');
    }
}

window.addEventListener('resize', handleResize);
handleResize();

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Press 'm' to toggle music
    if (e.key === 'm' || e.key === 'M') {
        toggleMusic();
    }

    // Press Escape to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('secretModal');
        modal.classList.remove('show');
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
    });
}

// ============================================
// ADDITIONAL INTERACTIVE FEATURES
// ============================================

// Prevent right-click to add mystique (optional)
// document.addEventListener('contextmenu', e => e.preventDefault());

// Auto-play video/music when page loads
window.addEventListener('load', () => {
    // You can add auto-play logic here if needed
});

// Handle visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden && isPlaying) {
        // Pause music when tab is hidden
        audioElement.pause();
    }
});

// ============================================
// EASTER EGG - KONAMI CODE
// ============================================

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Create heart rain effect
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '-50px';
            heart.style.fontSize = Math.random() * 2 + 1 + 'rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '5000';
            
            document.body.appendChild(heart);
            
            let offsetY = 0;
            const speed = Math.random() * 2 + 1;
            
            function fall() {
                offsetY += speed;
                heart.style.transform = `translateY(${offsetY}px)`;
                
                if (offsetY < window.innerHeight) {
                    requestAnimationFrame(fall);
                } else {
                    heart.remove();
                }
            }
            fall();
        }, i * 50);
    }
}

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c💕 Happy Birthday, My Love! 💕', 'font-size: 24px; color: #FF8FB1; font-weight: bold;');
console.log('%cMade with love and JavaScript ✨', 'font-size: 14px; color: #E8B4B8; font-style: italic;');