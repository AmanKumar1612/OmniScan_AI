/**
 * OmniScan AI - Presentation Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const currentSlideSpan = document.getElementById('current-slide');
    const totalSlidesSpan = document.getElementById('total-slides');
    
    // State
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Initialize
    totalSlidesSpan.textContent = totalSlides;
    updatePresentation();
    
    // Event Listeners
    prevBtn.addEventListener('click', () => changeSlide(-1));
    nextBtn.addEventListener('click', () => changeSlide(1));
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space') {
            if (e.key === 'Space') e.preventDefault();
            changeSlide(1);
        } else if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        }
    });

    // Touch/Swipe support for mobile/touchpads
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        // Swipe left -> next slide
        if (touchStartX - touchEndX > 50) {
            changeSlide(1);
        }
        // Swipe right -> prev slide
        if (touchEndX - touchStartX > 50) {
            changeSlide(-1);
        }
    }
    
    // Mouse wheel navigation (with debounce)
    let isScrolling = false;
    document.addEventListener('wheel', (e) => {
        if (isScrolling) return;
        
        isScrolling = true;
        setTimeout(() => { isScrolling = false; }, 800); // 800ms debounce
        
        if (e.deltaY > 0) {
            changeSlide(1);
        } else {
            changeSlide(-1);
        }
    });

    /**
     * Change active slide
     * @param {number} direction - 1 for next, -1 for previous
     */
    function changeSlide(direction) {
        // Remove active class from current
        slides[currentSlide].classList.remove('active');
        
        // Calculate new index
        currentSlide = currentSlide + direction;
        
        // Bounds checking
        if (currentSlide < 0) currentSlide = 0;
        if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;
        
        updatePresentation();
    }
    
    /**
     * Update UI elements based on current slide
     */
    function updatePresentation() {
        // Set active slide
        slides[currentSlide].classList.add('active');
        
        // Update header indicator
        currentSlideSpan.textContent = currentSlide + 1;
        
        // Update progress bar
        const progressPercentage = ((currentSlide) / (totalSlides - 1)) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        
        // Update buttons state
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;

        // Visual hint on next button if it's disabled or active
        if(currentSlide === totalSlides - 1) {
            nextBtn.style.color = 'var(--text-main)';
        } else {
            nextBtn.style.color = 'var(--neon-teal)';
        }
    }
});
