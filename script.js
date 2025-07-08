document.addEventListener('DOMContentLoaded', function() {

    // 1. Loading Screen Logic
    setTimeout(() => {
        const loaderContainer = document.querySelector('.loader-container');
        if (loaderContainer) {
            loaderContainer.style.transition = 'opacity 0.5s ease-out';
            loaderContainer.style.opacity = '0';
            setTimeout(() => {
                loaderContainer.style.display = 'none';
                const mainContent = document.querySelector('.main-content');
                if (mainContent) {
                    mainContent.style.display = 'block';
                }
            }, 500); // Wait for fade out transition
        }
    }, 3000); // 3-second loading screen

    // 2. Typing Animation Logic
    const typingText = document.querySelector('.typing-text');
    const words = ["Web Developer", "UI/UX Designer", "Content Creator", "Mahasiswa"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        let displayText;

        if (isDeleting) {
            displayText = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            displayText = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (typingText) {
            typingText.textContent = displayText;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at end of word
            setTimeout(() => { isDeleting = true; }, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        const typingSpeed = isDeleting ? 100 : 200;
        setTimeout(type, typingSpeed);
    }
    
    // Start typing animation if the element exists
    if (typingText) {
        type();
    }
    
    // 3. Theme Switcher Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to set theme
    function setTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }
    
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        if (themeToggle) themeToggle.checked = true;
        setTheme(true);
    } else {
        if (themeToggle) themeToggle.checked = false;
        setTheme(false);
    }

    // Add event listener to the toggle
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            setTheme(themeToggle.checked);
        });
    }

});