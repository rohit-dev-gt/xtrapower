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

    // ==========================================
    // Ultra-Premium Webflow GSAP Animations
    // ==========================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {

        const customEase = "power4.out";
        const slowEase = "expo.out";

        // 1. Fluid Typography Reveals (Aggressive Clip-Paths with SplitType)
        // This splits the text into lines and animates them up individually 
        // behind a mask, exactly like Circle and other top Webflow sites.
        const splitElements = document.querySelectorAll('.hero-content h1, .hero-content p, .section-header h2, .section-header p, .about-intro-section h2, .about-intro-section p');

        if (typeof SplitType !== 'undefined' && splitElements.length > 0) {
            splitElements.forEach(el => {
                // Split text into lines
                const textSplit = new SplitType(el, { types: 'lines' });

                // Wrap each line in a container with overflow hidden to create the mask
                textSplit.lines.forEach(line => {
                    const wrapper = document.createElement('div');
                    wrapper.style.overflow = 'hidden';
                    wrapper.style.display = 'block'; // Ensure it takes full width/behaves as block
                    // padding to prevent cutting off descending letters like 'y' or 'g'
                    wrapper.style.paddingBottom = '5px';
                    line.parentNode.insertBefore(wrapper, line);
                    wrapper.appendChild(line);
                });

                // Animate the actual lines up from below their new masked wrappers
                gsap.from(textSplit.lines, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    y: 100, // Distance to slide up
                    opacity: 0,
                    rotation: 2, // Very slight tilt on entrance
                    duration: 1.2,
                    stagger: 0.1, // Line by line cascade
                    ease: customEase
                });
            });
        }

        // Buttons just fade and slide as normal
        gsap.utils.toArray('.hero-content .btn').forEach((btn) => {
            gsap.from(btn, {
                scrollTrigger: {
                    trigger: btn,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                },
                y: 40,
                opacity: 0,
                duration: 1.2,
                ease: slowEase,
                delay: 0.4
            });
        });

        // 2. Continuous Scrubbing Parallax for Backgrounds & Hero
        if (document.querySelector('.hero-section')) {
            // Parallax the hero background slider while scrolling
            gsap.to('.hero-swiper', {
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: "top top",
                    end: "bottom top",
                    scrub: 1 // 1 second lag
                },
                y: 250, // Move the hero section down slower than scroll to create depth
                opacity: 0.3
            });
        }

        // 3. Image Zooms and Parallax on Scroll (Scrubbed)
        // As you scroll down the page, the images inside cards slowly zoom out
        gsap.utils.toArray('.farmer-card img, .product-item img, img[src*="about-"].img-fluid, .rounded-4 img, .video-bg').forEach(img => {
            let wrapper = img.parentElement;
            if (wrapper) wrapper.style.overflow = "hidden";

            // Set initial scale to 1.3
            gsap.set(img, { scale: 1.3, transformOrigin: "center center" });

            // Scrub zoom out as we scroll past
            gsap.to(img, {
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top bottom", // Start when card enters bottom
                    end: "bottom top",   // End when card leaves top
                    scrub: 1             // 1 second lag for smoothness
                },
                scale: 1,
                y: 30, // Slight parallax y movement opposite to scroll
                ease: "none"
            });
        });

        // 4. Staggered Cascades (Cards & Grids)
        // Huge swoops for grid items in 3D space
        const cascadeGroups = [
            '.farmers-grid',
            '.top-products-swiper .swiper-wrapper', // Stagger inside swiper
            '.stats-content',
            '.reviews-swiper .swiper-wrapper',
            'footer .row'
        ];

        cascadeGroups.forEach(groupSelector => {
            const group = document.querySelector(groupSelector);
            if (group) {
                const children = group.children;
                if (children.length > 0) {
                    gsap.from(children, {
                        scrollTrigger: {
                            trigger: group,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        },
                        y: 150, // Huge swoop up
                        opacity: 0,
                        scale: 0.9,
                        rotationY: 15, // 3D swing inwards
                        duration: 1.8,
                        stagger: 0.15,
                        transformOrigin: "left center",
                        ease: slowEase
                    });
                }
            }
        });

        // 5. Huge Background Text Scrubbing (Watermarks)
        gsap.utils.toArray('.watermark-bg, .bg-heading').forEach(text => {
            gsap.to(text, {
                scrollTrigger: {
                    trigger: text.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2 // High lag for heavy feel
                },
                x: () => window.innerWidth * 0.15, // Move dynamically based on screen width
                ease: "none"
            });
        });

        // 6. Stage Cards Specific Aggressive Reveal
        gsap.utils.toArray('.stage-card').forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                },
                y: 100,
                opacity: 0,
                scale: 0.8,
                duration: 1.5,
                ease: slowEase
            });
        });

        // 7. Red Strip 3D Flip & Slide
        if (document.querySelector('.red-strip-info')) {
            gsap.from('.red-strip-info', {
                scrollTrigger: {
                    trigger: '.red-strip-info',
                    start: "top 100%",
                    toggleActions: "play none none reverse"
                },
                y: 150,
                opacity: 0,
                rotationX: -90, // Full 3D flip over
                transformOrigin: "center top",
                duration: 1.5,
                ease: "back.out(1.5)"
            });
        }
    }

    // ==========================================
    // Advanced Interactions (Hover / Mouse / Cursor)
    // ==========================================

    // Disable standard interactions on touch devices
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

    if (!isTouchDevice) {
        // A. Custom GSAP Cursor
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        // Move cursor
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                ease: "power2.out"
            });
        });

        // Expand cursor on links and buttons
        const hoverElements = document.querySelectorAll('a, button, .farmer-card, .stage-card, .btn');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
            });
        });

        // B. Magnetic Buttons & Links
        const magneticElements = document.querySelectorAll('.btn-primary, .social-icons a, .social-icons-footer a');
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(el, {
                    x: x * 0.4, // Magnetic pull strength
                    y: y * 0.4,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: "elastic.out(1, 0.3)" // Snap back
                });
            });
        });

        // C. Inner Hover Parallax for Cards
        // For image cards where we want the image to shift opposite to mouse
        const parallaxCards = document.querySelectorAll('.farmer-card, .product-item, .info-card');
        parallaxCards.forEach(card => {
            const img = card.querySelector('img');
            if (img) {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;

                    gsap.to(img, {
                        x: x * 20, // Move 20px max
                        y: y * 20,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                });
                card.addEventListener('mouseleave', () => {
                    gsap.to(img, {
                        x: 0,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out"
                    });
                });
            }
        });
    }

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
