document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navbar = document.getElementById('navbar');

    let menuOpen = false;

    mobileMenuBtn.addEventListener('click', () => {
        menuOpen = !menuOpen;
        if (menuOpen) {
            mobileNav.classList.add('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            menuOpen = false;
        });
    });

    // 2. Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));


    // 4. Populate Gallery
    const galleryGrid = document.getElementById('gallery-grid');
    
    if (galleryGrid) {
        // Array of generated fashion images
        const sourceImages = [
            'gallery/IMG-20260411-WA0060.jpg',
            'gallery/IMG-20260411-WA0061%281%29.jpg',
            'gallery/IMG-20260411-WA0061.jpg',
            'gallery/IMG-20260411-WA0062.jpg',
            'gallery/IMG-20260411-WA0063.jpg',
            'gallery/IMG-20260411-WA0065.jpg',
            'gallery/IMG-20260411-WA0066.jpg',
            'gallery/IMG-20260411-WA0067.jpg',
            'gallery/IMG-20260411-WA0068.jpg',
            'gallery/IMG-20260411-WA0069.jpg',
            'gallery/IMG-20260411-WA0070.jpg',
            'gallery/IMG-20260411-WA0071.jpg',
            'gallery/IMG-20260411-WA0072.jpg',
            'gallery/IMG-20260411-WA0073.jpg',
            'gallery/IMG-20260411-WA0074.jpg',
            'gallery/IMG-20260411-WA0075%281%29.jpg',
            'gallery/IMG-20260411-WA0075.jpg',
            'gallery/IMG-20260411-WA0076.jpg',
            'gallery/IMG-20260411-WA0077.jpg',
            'gallery/IMG-20260411-WA0078.jpg'
        ];

        // Grid classes for masonry effect
        const layoutClasses = ['large', 'wide', 'tall', '', '', '', '', '', '', ''];

        // Create an item for each image
        for (let i = 0; i < sourceImages.length; i++) {
            const item = document.createElement('div');
            
            // Randomly pick a layout class based on index to create a pseudo-masonry look
            // Deterministic to avoid layout shifting on every load
            const layoutClass = layoutClasses[i % layoutClasses.length];
            item.className = `gallery-item ${layoutClass}`;
            
            // Pick image
            const imgIndex = i % sourceImages.length;
            const imgSrc = sourceImages[imgIndex];

            item.innerHTML = `
                <img src="${imgSrc}" alt="Gallery Image ${i + 1}" class="gallery-img">
                <div class="gallery-overlay">
                    <i class="fas fa-heart"></i>
                </div>
            `;
            
            galleryGrid.appendChild(item);
        }
    }

    // 5. Hero Background Slideshow
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const homeImages = [
            'background.JPG',
            'home/IMG-20260411-WA0069.jpg',
            'home/IMG-20260411-WA0073.jpg',
            'home/IMG-20260411-WA0076.jpg',
            'home/IMG-20260411-WA0077.jpg'
        ];
        let currentHomeImg = 0;

        // Smooth transition for the background
        heroSection.style.transition = 'background-image 1s ease-in-out';

        setInterval(() => {
            currentHomeImg = (currentHomeImg + 1) % homeImages.length;
            heroSection.style.backgroundImage = `url('${homeImages[currentHomeImg]}')`;
        }, 4000);
    }
});
