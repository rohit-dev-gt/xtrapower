document.addEventListener('DOMContentLoaded', () => {

    // Hero Swiper
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 5000,
        },
    });

    // Stage Products Swiper
    // "showing 3 slides at once but left and right slide should show cutted and middle one should be little zoom"
    const stageSwiper = new Swiper('.stage-swiper', {
        slidesPerView: 1.2, // Mobile default
        centeredSlides: true,
        spaceBetween: 30,
        initialSlide: 1, // Start with second slide active
        loop: true,
        breakpoints: {
            768: {
                slidesPerView: 2, // Tablet
            },
            1024: {
                slidesPerView: 2.5, // Desktop: allows seeing side slides "cutted"
            }
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: false,
        },
    });

    // Top Products Swiper
    // "showing 4 slides at once and slide one at a time with arrow at bottom center."
    const topProductsSwiper = new Swiper('.top-products-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }
        }
    });

    // Reviews Swiper
    const reviewsSwiper = new Swiper('.reviews-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });

    // Video Modal Logic
    const playBtn = document.getElementById('play-video-btn');
    const modal = document.getElementById('video-modal');
    const closeBtn = document.querySelector('.close-modal');
    const iframe = document.getElementById('youtube-video');
    // Example video ID, replace with actual
    const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";

    playBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        iframe.src = videoUrl;
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        iframe.src = ""; // Stop video
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
            iframe.src = "";
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close others
            faqItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');

            // Toggle icon
            const icon = item.querySelector('.toggle-icon');
            if (item.classList.contains('active')) {
                icon.textContent = '-';
            } else {
                icon.textContent = '+';
            }
        });
    });

});
