document.addEventListener('DOMContentLoaded', function() {
    // **Header Search Functionality**
    const searchIcon = document.getElementById('search-icon');
    const searchBox = document.getElementById('search-box');
    const closeSearch = document.getElementById('close-search');
    
    if (searchIcon && searchBox && closeSearch) {
        searchIcon.addEventListener('click', function() {
            searchBox.classList.add('active');
        });
        
        closeSearch.addEventListener('click', function() {
            searchBox.classList.remove('active');
        });
    }

    // **Mobile Menu**
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    
    if (hamburgerMenu && mobileMenu && closeMenu) {
        hamburgerMenu.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
        
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = ''; 
        });
    }

    // **Product Gallery**
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const dots = document.querySelectorAll('.gallery-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (mainImage && thumbnails.length && dots.length) {
        let currentIndex = 0;
        const maxIndex = thumbnails.length - 1;
        
        // Function to update gallery
        function updateGallery(index) {
            // Update main image
            const newImageSrc = thumbnails[index].getAttribute('data-image');
            mainImage.src = newImageSrc;
            
            // Update active thumbnail
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnails[index].classList.add('active');
            
            // Update active dot
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            
            currentIndex = index;
        }
        
        // Thumbnail click event
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                updateGallery(index);
            });
        });
        
        // Dot click event
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateGallery(index);
            });
        });
        
        // Previous button click
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                let newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = maxIndex; 
                updateGallery(newIndex);
            });
        }
        
        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                let newIndex = currentIndex + 1;
                if (newIndex > maxIndex) newIndex = 0; 
                updateGallery(newIndex);
            });
        }
    }

    // **Radio Button Selection for Add to Cart**
    const flavorRadios = document.querySelectorAll('input[name="flavor"]');
    const purchaseRadios = document.querySelectorAll('input[name="purchase"]');
    const addToCartBtn = document.getElementById('add-to-cart');
    
    if (flavorRadios.length && purchaseRadios.length && addToCartBtn) {
        function updateAddToCartLink() {
            const selectedFlavor = document.querySelector('input[name="flavor"]:checked').value;
            const selectedPurchase = document.querySelector('input[name="purchase"]:checked').value;
            
            // Construct URL based on selections
            const baseUrl = 'https://alcami.com/cart/add?';
            const productId = 'product=alcami-elements';
            const flavorParam = `&flavor=${selectedFlavor}`;
            const purchaseParam = `&type=${selectedPurchase}`;
            
            const newUrl = baseUrl + productId + flavorParam + purchaseParam;
            addToCartBtn.href = newUrl;
        }
        
        // Initialize the link
        updateAddToCartLink();
        
        // Update link when selections change
        flavorRadios.forEach(radio => {
            radio.addEventListener('change', updateAddToCartLink);
        });
        
        purchaseRadios.forEach(radio => {
            radio.addEventListener('change', updateAddToCartLink);
        });
    }

    // **Counter Animation for Stats**
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.getElementById('stats-section');
    
    let counted = false;
    
    function startCounting() {
        if (counted) return;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.round(current);
                    requestAnimationFrame(updateCounter); 
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
        
        counted = true; 
    }
    
    // Check if stats section is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Start counting when stats section is in viewport
    function checkScroll() {
        if (statsSection && isInViewport(statsSection)) {
            startCounting();
        }
    }
    
    // Check on scroll and initial load
    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // **Testimonials Slider**
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevTestimonial = document.querySelector('.testimonial-prev');
    const nextTestimonial = document.querySelector('.testimonial-next');
    
    if (testimonialsTrack && testimonials.length && testimonialDots.length) {
        let testimonialIndex = 0;
        const maxTestimonialIndex = testimonials.length - 1;
        
        function updateTestimonialSlider(index) {
            // Update slider position
            testimonialsTrack.style.transform = `translateX(-${index * 100}%)`;
            
            // Update active dot
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            testimonialDots[index].classList.add('active');
            
            testimonialIndex = index;
        }
        
        // Dot click event
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateTestimonialSlider(index);
            });
        });
        
        // Previous button click
        if (prevTestimonial) {
            prevTestimonial.addEventListener('click', () => {
                let newIndex = testimonialIndex - 1;
                if (newIndex < 0) newIndex = maxTestimonialIndex; // Wrap around
                updateTestimonialSlider(newIndex);
            });
        }
        
        // Next button click
        if (nextTestimonial) {
            nextTestimonial.addEventListener('click', () => {
                let newIndex = testimonialIndex + 1;
                if (newIndex > maxTestimonialIndex) newIndex = 0; // Wrap around
                updateTestimonialSlider(newIndex);
            });
        }
        
        // Auto slide every 5 seconds
        setInterval(() => {
            let newIndex = testimonialIndex + 1;
            if (newIndex > maxTestimonialIndex) newIndex = 0;
            updateTestimonialSlider(newIndex);
        }, 115000);
    }

    // **FAQ Accordion**
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            header.addEventListener('click', () => {
                // Close all other items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }
});