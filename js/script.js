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
    // Stage Products Swiper
    // "showing 3 slides at once but left and right slide should show cutted and middle one should be little zoom"
    const stageSwiper = new Swiper('.stage-swiper', {
        slidesPerView: 1.2, // Mobile default
        centeredSlides: true,
        spaceBetween: 80, // Increased gap
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
            nextEl: '.top-products-nav .swiper-button-next',
            prevEl: '.top-products-nav .swiper-button-prev',
        },
        breakpoints: {
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }
        }
    });

    // Reviews Swiper
    // Reviews Swiper
    const reviewsSwiper = new Swiper('.reviews-swiper', {
        slidesPerView: 1.2,
        centeredSlides: true,
        spaceBetween: 10,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2.5,
                centeredSlides: true,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 4,
                centeredSlides: true,
                spaceBetween: 20
            }
        }
    });

    // Read More / Read Less Logic for Reviews
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const card = this.closest('.review-card');
            card.classList.toggle('expanded');

            if (card.classList.contains('expanded')) {
                this.textContent = 'Read Less';
            } else {
                this.textContent = 'Read More';
            }

            // Optional: Update swiper to handle height change if needed
            // reviewsSwiper.update(); 
        });
    });

    // Video Modal Logic
    const playBtn = document.getElementById('play-video-btn');
    const modal = document.getElementById('video-modal');
    const closeBtn = document.querySelector('.close-modal');
    const iframe = document.getElementById('youtube-video');
    // Example video ID, replace with actual
    const videoUrl = "https://www.youtube.com/embed/p-1_Q7ETC1E?autoplay=1&mute=1";

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
