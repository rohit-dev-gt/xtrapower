document.addEventListener('DOMContentLoaded', () => {

    // Header Scroll Logic
    const mainHeader = document.getElementById('main-header');
    if (mainHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        });
        // Call once on load to set initial state
        if (window.scrollY > 100) {
            mainHeader.classList.add('scrolled');
        }
    }

    // GSAP Scroll Text Animation
    const scrollTexts = document.querySelectorAll('#gsap-scroll-text, #about-scroll-text');
    if (scrollTexts.length > 0 && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        function wrapChars(el) {
            const childNodes = Array.from(el.childNodes);
            childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.nodeValue;
                    const fragment = document.createDocumentFragment();
                    for (let i = 0; i < text.length; i++) {
                        const char = text[i];
                        if (char === ' ' || char === '\n' || char === '\r' || char === '\t') {
                            fragment.appendChild(document.createTextNode(char));
                        } else {
                            const span = document.createElement('span');
                            span.className = 'gsap-char';
                            span.textContent = char;
                            fragment.appendChild(span);
                        }
                    }
                    node.replaceWith(fragment);
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    wrapChars(node);
                }
            });
        }

        scrollTexts.forEach(scrollText => {
            // Give it text-muted by default to make it gray originally
            scrollText.classList.add('text-muted');

            // Re-wrap all text strings
            wrapChars(scrollText);

            let triggerEl = scrollText;
            // Get a good container so the animation triggers smoothly
            if (scrollText.closest('.built-for-farmers')) {
                triggerEl = scrollText.closest('.built-for-farmers');
            } else if (scrollText.closest('.about-intro-section')) {
                triggerEl = scrollText.closest('.about-intro-section');
            }

            // Initialize animation where color changes to dark
            gsap.to(scrollText.querySelectorAll('.gsap-char'), {
                color: '#1a1a1a',
                stagger: 0.05,
                scrollTrigger: {
                    trigger: triggerEl,
                    start: 'top+=200 bottom',
                    end: 'top 25%',
                    scrub: 1, // smooth scrubbing synced with scroll
                }
            });
        });
    }

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
        });
    });

});

// Product Gallery Swiper
document.addEventListener('DOMContentLoaded', function () {
    const productSwiper = new Swiper('.product-main-swiper', {
        loop: false,
        navigation: {
            nextEl: '.product-nav-next',
            prevEl: '.product-nav-prev',
        },
        on: {
            slideChange: function () {
                // Update active thumbnail
                const thumbnails = document.querySelectorAll('.product-gallery .thumbnail');
                thumbnails.forEach(thumb => thumb.classList.remove('active-thumb'));
                if (thumbnails[this.activeIndex]) {
                    thumbnails[this.activeIndex].classList.add('active-thumb');
                }
            }
        }
    });

    const thumbnails = document.querySelectorAll('.product-gallery .thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function () {
            productSwiper.slideTo(index);
        });
    });

    // Experience Slider
    const experienceSwiper = new Swiper('.experience-swiper', {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: '.experience-nav-next',
            prevEl: '.experience-nav-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1.2,
                slidesOffsetBefore: 20,
            },
            992: {
                slidesPerView: 2.2,
                slidesOffsetBefore: 60,
            },
            1200: {
                slidesPerView: 2.8,
                slidesPerGroup: 1,
                slidesOffsetBefore: 220,
            }
        }
    });

});
