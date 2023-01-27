(function() {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        if (all) {
            select(el, all).forEach(e => e.addEventListener(type, listener))
        } else {
            select(el, all).addEventListener(type, listener)
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)



    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        if (!header.classList.contains('header-scrolled')) {
            offset -= 10
        }

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }



    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Clients Slider
     */
    new Swiper('.clients-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 40
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 60
            },
            640: {
                slidesPerView: 4,
                spaceBetween: 80
            },
            992: {
                slidesPerView: 5,
                spaceBetween: 120
            }
        }
    });



    /**
     * Testimonials slider
     */
    new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 40
            },

            1200: {
                slidesPerView: 3,
            }
        }
    });

    /**
     * Animation on scroll
     */
    function aos_init() {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
    }
    window.addEventListener('load', () => {
        aos_init();
    });

})();

// banner slider js here

/**
 *  Utility functions
 */
function utils() {
    /**
     * Returns max height value for a nodelist
     * @param {NodeList} nodeList The node list to calculate max height of
     */
    const calcMaxHeight = function(items) {
        let maxHeight = 0;

        items.forEach(item => {
            const h = item.clientHeight;
            maxHeight = h > maxHeight ? h : maxHeight;
        });
        return maxHeight;
    }

    /**
     * Removes Classes from NodeList
     * @param {NodeList} nodeList The node list to remove classes from
     * @param {Array} cssClasses Array of CSS classes to be removed
     */
    function removeClasses(nodeList, cssClasses) {
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].classList.remove(...cssClasses);
        }
    }

    /**
     * Adds Classes from NodeList
     * @param {NodeList} nodeList The node list to add classes to
     * @param {Array} cssClasses Array of CSS classes to be added
     */
    function addClasses(nodeList, cssClasses) {
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].classList.add(...cssClasses);
        }
    }
    /**
     * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
     * @param {function} fn The callback function
     * @param {int} delay The delay in milliseconds
     */
    const requestInterval = function(fn, delay) {
        const requestAnimFrame = (function() {
            return window.requestAnimationFrame || function(callback, element) {
                window.setTimeout(callback, 5000 / 60);
            };
        })();

        let start = new Date().getTime(),
            handle = {};

        function loop() {
            const current = new Date().getTime(),
                delta = current - start;

            if (delta >= delay) {
                fn.call();
                start = new Date().getTime();
            }

            handle.value = requestAnimFrame(loop);
        }

        handle.value = requestAnimFrame(loop);
        return handle;
    };
    /**
     * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
     * @param {int|object} handle The callback function
     */
    const clearRequestInterval = function(handle) {
        window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
            clearInterval(handle);
    };

    return {
        calcMaxHeight,
        removeClasses,
        addClasses,
        requestInterval,
        clearRequestInterval
    }
}

//program slider js here 


$('.services-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    arrows: false,
    autoplaySpeed: 2000,
    prevArrow: '<a class="slick-prev"><span class="icon-left"></span></a>',
    nextArrow: '<a class="slick-next"><span class="icon-right"></span></a>',
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
});

$('a[data-bs-toggle="tab"]').on('shown.bs.tab', function(e) {
    $('.services-slider').slick('setPosition');
})


/**
 *  Main Slider function
 */
function heroSlider() {
    const slider = {
        hero: document.querySelector('#hero-slider'),
        main: document.querySelector('#slides-main'),
        aux: document.querySelector('#slides-aux'),
        current: document.querySelector('#slider-nav .current'),
        handle: true,
        idle: true,
        activeIndex: -1,
        interval: 5000
    };

    const setHeight = function(holder, items) {
        const h = utils().calcMaxHeight(items);
        holder.style.height = `${h}px`;
    }

    const leadingZero = function() {
        return arguments[1] < 10 ? '0' + arguments[1] : arguments[1];
    }

    const setCurrent = function() {
        slider.current.innerText = leadingZero `${slider.activeIndex + 1}`;
    }

    const changeSlide = function(direction) {
        slider.idle = false;
        slider.hero.classList.remove('prev', 'next');
        if (direction == 'next') {
            slider.activeIndex = (slider.activeIndex + 1) % slider.total;
            slider.hero.classList.add('next');
        } else {
            slider.activeIndex = (slider.activeIndex - 1 + slider.total) % slider.total;
            slider.hero.classList.add('prev');
        }

        //reset classes
        utils().removeClasses(slider.items, ['prev', 'active']);

        //set prev  
        const prevItems = [...slider.items]
            .filter(item => {
                let prevIndex;
                if (slider.hero.classList.contains('prev')) {
                    prevIndex = slider.activeIndex == slider.total - 1 ? 0 : slider.activeIndex + 1;
                } else {
                    prevIndex = slider.activeIndex == 0 ? slider.total - 1 : slider.activeIndex - 1;
                }

                return item.dataset.index == prevIndex;
            });

        //set active
        const activeItems = [...slider.items]
            .filter(item => {
                return item.dataset.index == slider.activeIndex;
            });

        utils().addClasses(prevItems, ['prev']);
        utils().addClasses(activeItems, ['active']);
        setCurrent();

        const activeImageItem = slider.main.querySelector('.active');
        activeImageItem.addEventListener('transitionend', waitForIdle, {
            once: true
        });
    }

    const stopAutoplay = function() {
        slider.autoplay = false;
        utils().clearRequestInterval(slider.handle);
    }

    const waitForIdle = function() {
        !slider.autoplay && autoplay(false); //restart
        slider.idle = true;
    }

    const wheelControl = function() {
        slider.hero.addEventListener('wheel', e => {
            if (slider.idle) {
                const direction = e.deltaY > 0 ? 'next' : 'prev';
                stopAutoplay();
                changeSlide(direction);
            }
        });
    }

    const autoplay = function(initial) {
        slider.autoplay = true;
        slider.items = slider.hero.querySelectorAll('[data-index]');
        slider.total = slider.items.length / 2;

        const loop = () => changeSlide('next');

        initial && requestAnimationFrame(loop);
        slider.handle = utils().requestInterval(loop, slider.interval);
    }

    const loaded = function() {
        slider.hero.classList.add('loaded');
    }

    const touchControl = function() {
        const touchStart = function(e) {
            slider.ts = parseInt(e.changedTouches[0].clientX);
            window.scrollTop = 0;
        }

        const touchMove = function(e) {
            slider.tm = parseInt(e.changedTouches[0].clientX);
            const delta = slider.tm - slider.ts;
            window.scrollTop = 0;

            if (slider.idle) {
                const direction = delta < 0 ? 'next' : 'prev';
                stopAutoplay();
                changeSlide(direction);
            }
        }

        slider.hero.addEventListener('touchstart', touchStart);
        slider.hero.addEventListener('touchmove', touchMove);
    }

    const start = function() {
        autoplay(true);
        wheelControl();
        window.innerWidth <= 1024 && touchControl();
        slider.aux.addEventListener('transitionend', loaded, {
            once: true
        });
    }

    const loadingAnimation = function() {
        slider.hero.classList.add('ready');
        slider.current.addEventListener('transitionend', start, {
            once: true
        });
    }

    const init = function() {
        setHeight(slider.aux, slider.aux.querySelectorAll('.slide-title'));
        loadingAnimation();
    }

    const resize = function() {
        setHeight(slider.aux, slider.aux.querySelectorAll('.slide-title'));
    }

    return {
        init,
        resize
    }
}

window.addEventListener('load', heroSlider().init);
window.addEventListener("resize", heroSlider().resize);

/*page scroll*/