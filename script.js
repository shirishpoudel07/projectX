// ======= Store Data =======
const storesData = [
    {
        id: 1,
        name: "GALLERIA",
        floor: "ground",
        category: "fashion",
        contact: "9808267654",
        image: "logo.jpg",
        description: "Premium fashion and clothing store offering the latest trends and styles for men and women."
    },
    {
        id: 2,
        name: "THE MAKEUP FACTORY",
        floor: "ground",
        category: "beauty",
        contact: "9851021417",
        image: "layout.jpg",
        description: "Complete beauty and personal care products with professional makeup services."
    },
    {
        id: 3,
        name: "PUMA",
        floor: "ground",
        category: "fashion",
        contact: "9813891605",
        image: "logo.jpg",
        description: "International sports and fashion brand offering athletic wear and accessories."
    },
    {
        id: 4,
        name: "Tech Hub",
        floor: "first",
        category: "electronics",
        contact: "9846123789",
        image: "layout.jpg",
        description: "Latest electronics, gadgets, and technology products for all your digital needs."
    },
    {
        id: 5,
        name: "Café Himalaya",
        floor: "second",
        category: "food",
        contact: "9801234567",
        image: "logo.jpg",
        description: "Authentic Nepali and international cuisine in a comfortable dining environment."
    },
    {
        id: 6,
        name: "Fashion Forward",
        floor: "first",
        category: "fashion",
        contact: "9808267456",
        image: "layout.jpg",
        description: "Trendy fashion for all ages with the latest styles and seasonal collections."
    },
    {
        id: 7,
        name: "Game Zone",
        floor: "second",
        category: "entertainment",
        contact: "9812345678",
        image: "logo.jpg",
        description: "Gaming and entertainment center with arcade games and family fun activities."
    },
    {
        id: 8,
        name: "Digital World",
        floor: "first",
        category: "electronics",
        contact: "9823456789",
        image: "layout.jpg",
        description: "Computer accessories, mobile devices, and digital solutions for modern life."
    },
    {
        id: 9,
        name: "Business Strategy Consulting",
        floor: "ground",
        category: "consultancy",
        contact: "+977 61 123456",
        image: "layout.jpg",
        description: "Strategic planning, market analysis, and business development consulting for startups and established companies."
    },
    {
        id: 10,
        name: "Legal Advisory Services",
        floor: "ground",
        category: "consultancy",
        contact: "+977 61 123457",
        image: "layout.jpg",
        description: "Comprehensive legal consultation covering business law, contracts, compliance, and regulatory matters."
    },
    {
        id: 11,
        name: "Financial Planning & Advisory",
        floor: "first",
        category: "consultancy",
        contact: "+977 61 123458",
        image: "layout.jpg",
        description: "Personal and business financial planning, investment strategies, and wealth management consultation."
    },
    {
        id: 12,
        name: "Marketing & Branding Solutions",
        floor: "first",
        category: "consultancy",
        contact: "+977 61 123459",
        image: "layout.jpg",
        description: "Digital marketing strategies, brand development, and promotional campaigns to grow your business."
    },
    {
        id: 13,
        name: "Technology Solutions Consulting",
        floor: "second",
        category: "consultancy",
        contact: "+977 61 123460",
        image: "layout.jpg",
        description: "IT consulting, digital transformation, and technology implementation for modern business needs."
    },
    {
        id: 14,
        name: "Real Estate Advisory",
        floor: "second",
        category: "consultancy",
        contact: "+977 61 123461",
        image: "layout.jpg",
        description: "Property investment guidance, market analysis, and real estate development consultation services."
    }
];

// ======= Store Functions =======
function createStoreCard(store) {
    return `
        <div class="store-card" data-floor="${store.floor}" data-category="${store.category}">
            <div class="store-image-container">
                <img src="${store.image}" alt="${store.name}" class="store-image">
                <div class="store-overlay">
                    <button class="btn btn-primary">View Details</button>
                </div>
            </div>
            <div class="store-details">
                <h3 class="store-name">${store.name}</h3>
                <div class="store-info">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>Floor: ${store.floor.charAt(0).toUpperCase() + store.floor.slice(1)}</span>
                </div>
                <div class="store-info">
                    <i class="fas fa-tag"></i>
                    <span>Category: ${store.category.charAt(0).toUpperCase() + store.category.slice(1)}</span>
                </div>
                <div class="store-info">
                    <i class="fas fa-phone"></i>
                    <span>Contact: ${store.contact}</span>
                </div>
                <p>${store.description}</p>
            </div>
        </div>
    `;
}

// ======= Pagination Variables =======
let currentPage = 1;
let itemsPerPage = 6;
let currentStores = [...storesData];

function renderStores(stores = currentStores, page = currentPage) {
    const storesGrid = document.getElementById('storesGrid');
    if (storesGrid) {
        // Read current search query if present for relevance sorting
        const searchInput = document.getElementById('store-search');
        const query = (searchInput ? searchInput.value : '').trim().toLowerCase();

        // Sort by relevance to query, then alphabetically by name
        const sorted = [...stores].sort((a, b) => {
            if (!query) {
                return a.name.localeCompare(b.name);
            }

            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            const descA = (a.description || '').toLowerCase();
            const descB = (b.description || '').toLowerCase();

            // Compute simple relevance score
            const score = (name, desc) => {
                if (name.startsWith(query)) return 3; // strongest
                if (name.includes(query)) return 2;
                if (desc.includes(query)) return 1;
                return 0;
            };

            const scoreA = score(nameA, descA);
            const scoreB = score(nameB, descB);

            if (scoreA !== scoreB) return scoreB - scoreA; // higher score first
            return nameA.localeCompare(nameB); // tie-breaker
        });

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const storesToShow = sorted.slice(startIndex, endIndex);
        
        storesGrid.innerHTML = storesToShow.map(store => createStoreCard(store)).join('');
        
        // Update pagination
        updatePagination(sorted.length, page);
    }
}

 





























































// Apply category/floor from URL query (e.g., stores.html?category=fashion&floor=ground)
function applyStoresQueryFilters() {
    const params = new URLSearchParams(window.location.search);
    const category = (params.get('category') || '').toLowerCase();
    const floor = (params.get('floor') || '').toLowerCase();

    const categoryFilter = document.getElementById('category-filter');
    const floorFilter = document.getElementById('floor-filter');

    let changed = false;

    const allowedCategories = ['fashion','electronics','food','beauty','entertainment'];
    const allowedFloors = ['ground','first','second'];

    if (categoryFilter && category && allowedCategories.includes(category)) {
        categoryFilter.value = category;
        changed = true;
    }
    if (floorFilter && floor && allowedFloors.includes(floor)) {
        floorFilter.value = floor;
        changed = true;
    }

    return changed;
}

function renderStoresByCategory() {
    const containers = document.querySelectorAll('.category-stores-grid');
    if (!containers.length) return;

    containers.forEach(container => {
        const cat = container.getAttribute('data-category');
        const list = storesData.filter(s => s.category === cat);
        container.innerHTML = list.map(store => createStoreCard(store)).join('');
    });
}

function updatePagination(totalItems, currentPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationInfo = document.getElementById('paginationInfo');
    const paginationNumbers = document.getElementById('paginationNumbers');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!paginationInfo || !paginationNumbers || !prevBtn || !nextBtn) return;
    
    // Update info text
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    paginationInfo.textContent = `Showing ${startItem}-${endItem} of ${totalItems} stores`;
    
    // Update navigation buttons
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // Generate page numbers
    let pageNumbersHTML = '';
    
    if (totalPages <= 7) {
        // Show all pages if 7 or fewer
        for (let i = 1; i <= totalPages; i++) {
            pageNumbersHTML += `<button class="page-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
    } else {
        // Show first page, last page, current page, and pages around current
        const showPages = [];
        
        // Always show first page
        showPages.push(1);
        
        if (currentPage > 3) {
            showPages.push('...');
        }
        
        // Show pages around current page
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            if (!showPages.includes(i)) {
                showPages.push(i);
            }
        }
        
        if (currentPage < totalPages - 2) {
            showPages.push('...');
        }
        
        // Always show last page
        if (totalPages > 1) {
            showPages.push(totalPages);
        }
        
        // Generate HTML
        showPages.forEach(page => {
            if (page === '...') {
                pageNumbersHTML += '<span class="page-number ellipsis">...</span>';
            } else {
                pageNumbersHTML += `<button class="page-number ${page === currentPage ? 'active' : ''}" data-page="${page}">${page}</button>`;
            }
        });
    }
    
    paginationNumbers.innerHTML = pageNumbersHTML;
    
    // Add event listeners to page numbers
    const pageButtons = paginationNumbers.querySelectorAll('.page-number:not(.ellipsis)');
    pageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const page = parseInt(button.dataset.page);
            goToPage(page);
        });
    });
}

function goToPage(page) {
    currentPage = page;
    renderStores(currentStores, currentPage);
    
    // Smooth scroll to top of stores section
    const storesSection = document.querySelector('.stores-section');
    if (storesSection) {
        storesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function filterStores() {
    const floorFilter = document.getElementById('floor-filter');
    const categoryFilter = document.getElementById('category-filter');
    
    if (!floorFilter || !categoryFilter) return;
    
    const floorValue = floorFilter.value;
    const categoryValue = categoryFilter.value;
    
    currentStores = storesData.filter(store => {
        const floorMatch = floorValue === 'all' || store.floor === floorValue;
        const categoryMatch = categoryValue === 'all' || store.category === categoryValue;
        return floorMatch && categoryMatch;
    });
    
    // Reset to first page when filtering
    currentPage = 1;
    renderStores(currentStores, currentPage);
}

// ======= Initialize Stores =======
function initStores() {
    const storesGrid = document.getElementById('storesGrid');
    if (storesGrid) {
        // First apply query-driven filters (no sliding)
        const applied = applyStoresQueryFilters();
        if (applied) {
            filterStores();
        } else {
            renderStores();
        }
        renderStoresByCategory(); // populate grouped sections
        
        const floorFilter = document.getElementById('floor-filter');
        const categoryFilter = document.getElementById('category-filter');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (floorFilter) {
            floorFilter.addEventListener('change', filterStores);
        }
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', filterStores);
        }

        // Category tiles now navigate to separate pages, so no click handlers needed here
        // The tiles have href attributes that will handle navigation automatically
        
        // Add pagination button event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    goToPage(currentPage - 1);
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const totalPages = Math.ceil(currentStores.length / itemsPerPage);
                if (currentPage < totalPages) {
                    goToPage(currentPage + 1);
                }
            });
        }
    }
}

// ======= Stats Counter Animation =======
function animateStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach((statNumber, index) => {
        // Skip if already animated by the generic counter
        if (statNumber.dataset.animated === '1') return;
        // Add a staggered delay for each stat
        setTimeout(() => {
            const targetValue = parseInt(statNumber.textContent);
            let currentValue = 0;
            const duration = 2000; // 2 seconds
            const increment = targetValue / (duration / 16); // 60fps
            const originalText = statNumber.textContent;
            const hasPlusSign = originalText.includes('+');
            
            // Set initial state
            statNumber.textContent = '0' + (hasPlusSign ? '+' : '');
            statNumber.style.opacity = '0.5';
            statNumber.style.transform = 'scale(0.8)';
            
            // Force a reflow to ensure the initial state is applied
            statNumber.offsetHeight;
        
        const updateCounter = () => {
            currentValue += increment;
            if (currentValue < targetValue) {
                statNumber.textContent = Math.floor(currentValue) + (hasPlusSign ? '+' : '');
                // Add a subtle scale effect, opacity and color transition
                    const progress = currentValue / targetValue;
                    const scale = 0.8 + (0.4 * progress); // Scale from 0.8 to 1.2
                    const opacity = 0.5 + (0.5 * progress); // Opacity from 0.5 to 1
                    statNumber.style.transform = `scale(${scale})`;
                    statNumber.style.opacity = opacity;
                
                // Color transition from gray to the final color
                const parent = statNumber.closest('.stat-box');
                let finalColor = '#333'; // Default text color
                
                if (parent.classList.contains('blue')) {
                    finalColor = 'var(--color-blue)';
                } else if (parent.classList.contains('darkblue')) {
                    finalColor = 'var(--color-darkblue)';
                } else if (parent.classList.contains('orange')) {
                    finalColor = 'var(--color-orange)';
                } else if (parent.classList.contains('yellow')) {
                    finalColor = 'var(--color-yellow)';
                }
                
                // Interpolate color from gray to final color
                statNumber.style.color = progress < 1 ? `rgba(100, 100, 100, ${1-progress})` : finalColor;
                
                // Add increasing text shadow as the animation progresses
                const shadowBlur = Math.floor(progress * 8);
                const shadowOpacity = progress * 0.5;
                statNumber.style.textShadow = `0 0 ${shadowBlur}px rgba(0,0,0,${shadowOpacity})`;
                requestAnimationFrame(updateCounter);
            } else {
                statNumber.textContent = originalText;
                    statNumber.style.transform = 'scale(1.2)';
                    statNumber.style.opacity = '1';
                
                // Set the final color
                const parent = statNumber.closest('.stat-box');
                if (parent.classList.contains('blue')) {
                    statNumber.style.color = 'var(--color-blue)';
                } else if (parent.classList.contains('darkblue')) {
                    statNumber.style.color = 'var(--color-darkblue)';
                } else if (parent.classList.contains('orange')) {
                    statNumber.style.color = 'var(--color-orange)';
                } else if (parent.classList.contains('yellow')) {
                    statNumber.style.color = 'var(--color-yellow)';
                }
                
                // Set final text shadow
                statNumber.style.textShadow = '0 0 4px rgba(0,0,0,0.3)';
                
                // Add a final bounce effect
                setTimeout(() => {
                    statNumber.style.transform = 'scale(1)';
                }, 200);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }, index * 300); // 300ms delay between each stat
    });
}

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Initialize stats animation when stats section is in viewport
function initStatsAnimation() {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        let animated = false;
        
        const checkScroll = () => {
            if (!animated && isInViewport(statsSection)) {
                animateStatsCounter();
                animated = true;
                window.removeEventListener('scroll', checkScroll);
            }
        };
        
        window.addEventListener('scroll', checkScroll);
        // Check on initial load as well
        checkScroll();
    }
}

// ======= Generic Number Counter (works on all pages) =======
function initNumberCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    const animateNumber = (el) => {
        const original = el.textContent.trim();
        const target = parseInt(original.replace(/[^0-9]/g, ''), 10) || 0;
        const hasPlus = original.includes('+');
        const duration = 2500; // slowed down from 1.5s to 2.5s
        let startTs = null;

        const format = (n) => n.toLocaleString();

        function step(ts) {
            if (!startTs) startTs = ts;
            const t = Math.min((ts - startTs) / duration, 1);
            // ease-out for smoother finish
            const progress = 1 - Math.pow(1 - t, 3);
            const value = Math.floor(progress * target);
            el.textContent = format(value) + (hasPlus ? '+' : '');
            if (progress < 1) requestAnimationFrame(step);
        }

        el.dataset.animated = '1';
        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.dataset.animated !== '1') {
                    animateNumber(entry.target);
                }
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(el => observer.observe(el));
}

// ======= Cinema Loader =======
function initCinemaLoader() {
    const loader = document.getElementById('cinema-loader');
    if (!loader) return; // Only on cinema page
    window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('hidden'), 900);
    });
}

// ======= Initialize when DOM is ready =======
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initStores();
        initStatsAnimation();
        initNumberCounters();
        initMobileMenu();
        initIPadEnhancements();
        initCinemaAnimation();
        initCinemaServices();
        initBookingSection();
        initCinemaLoader();
    });
} else {
    initStores();
    initStatsAnimation();
    initNumberCounters();
    initMobileMenu();
    initIPadEnhancements();
    initCinemaAnimation();
    initCinemaServices();
    initBookingSection();
    initCinemaLoader();
}

// ======= Mobile Menu Enhancement =======
function initMobileMenu() {
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburgerToggle && navLinks) {
        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerToggle.checked = false;
                navLinks.classList.remove('nav-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburgerToggle.contains(e.target) && 
                !navLinks.contains(e.target) && 
                hamburgerToggle.checked) {
                hamburgerToggle.checked = false;
                navLinks.classList.remove('nav-open');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && hamburgerToggle.checked) {
                hamburgerToggle.checked = false;
                navLinks.classList.remove('nav-open');
            }
        });
        
        // Prevent body scroll when menu is open
        hamburgerToggle.addEventListener('change', () => {
            if (hamburgerToggle.checked) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
}

// ======= iPad-specific enhancements =======
function initIPadEnhancements() {
    // Check if device is iPad
    const isIPad = /iPad/.test(navigator.userAgent) || 
                   (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    if (isIPad) {
        // Add iPad-specific classes
        document.body.classList.add('ipad-device');
        
        // Handle orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                // Recalculate layouts after orientation change
                window.dispatchEvent(new Event('resize'));
            }, 100);
        });
        
        // Enhanced touch interactions for iPad
        const touchElements = document.querySelectorAll('.btn, .nav-link, .nav-info-card, .store-card, .entertainment-card, .ad-option, .cuisine-tag');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            });
            
            element.addEventListener('touchcancel', function() {
                this.style.transform = '';
            });
        });
        
        // Prevent zoom on double tap for iPad
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // Add iPad-specific scroll behavior
        const smoothScrollElements = document.querySelectorAll('a[href^="#"]');
        smoothScrollElements.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ======= ENTERTAINMENT ANIMATION SYSTEM =======
// Add this JavaScript to your existing script.js file

class EntertainmentGameBackground {
    constructor() {
        this.container = null;
        this.elements = [];
        this.particles = [];
        this.gridLines = [];
        this.icons = [];
        this.isVisible = false;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.createContainer();
        if (this.container) {
            this.createAnimatedElements();
            this.setupVisibilityObserver();
            this.addInteractivity();
        }
    }

    createContainer() {
        const entertainmentSection = document.querySelector('.entertainment-section');
        if (!entertainmentSection) return;

        // Create animation container
        this.container = document.createElement('div');
        this.container.className = 'entertainment-bg-animation';
        this.container.id = 'entertainmentBgAnimation';
        
        // Insert as first child
        entertainmentSection.insertBefore(this.container, entertainmentSection.firstChild);
    }

    createAnimatedElements() {
        this.createFloatingGameElements();
        this.createParticleSystem();
        this.createNeonGrid();
        this.createGamingIcons();
        this.createFlyingElements();
        this.createRunningElements();
        this.createBouncingBalls();
        this.createShootingStars();
    }

    createFloatingGameElements() {
        const elementConfigs = [
            { class: 'floating-element', count: 4, size: [35, 55] },
            { class: 'floating-element controller', count: 3, size: [40, 25] },
            { class: 'floating-element joystick', count: 3, size: [30, 30] },
            { class: 'floating-element diamond', count: 3, size: [25, 25] }
        ];

        elementConfigs.forEach(config => {
            for (let i = 0; i < config.count; i++) {
                const element = document.createElement('div');
                element.className = config.class;
                
                const size = config.size[0] + Math.random() * (config.size[1] - config.size[0]);
                element.style.width = `${size}px`;
                element.style.height = `${size}px`;
                element.style.left = `${Math.random() * 90}%`;
                element.style.top = `${Math.random() * 90}%`;
                element.style.animationDelay = `${Math.random() * 6}s`;
                element.style.animationDuration = `${5 + Math.random() * 5}s`;
                
                this.container.appendChild(element);
                this.elements.push(element);
            }
        });
    }

    createParticleSystem() {
        // Create 20 particles for performance
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'game-particle';
            
            const size = 2 + Math.random() * 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 4}s`;
            particle.style.animationDuration = `${3 + Math.random() * 3}s`;
            
            this.container.appendChild(particle);
            this.particles.push(particle);
        }
    }

    createNeonGrid() {
        // Horizontal grid lines
        for (let i = 0; i < 4; i++) {
            const line = document.createElement('div');
            line.className = 'neon-grid-line';
            line.style.top = `${15 + i * 25}%`;
            line.style.animationDelay = `${i * 2}s`;
            line.style.animationDuration = `${6 + Math.random() * 4}s`;
            
            this.container.appendChild(line);
            this.gridLines.push(line);
        }

        // Vertical grid lines
        for (let i = 0; i < 3; i++) {
            const line = document.createElement('div');
            line.className = 'neon-grid-line vertical';
            line.style.left = `${20 + i * 30}%`;
            line.style.animationDelay = `${i * 3}s`;
            line.style.animationDuration = `${8 + Math.random() * 4}s`;
            
            this.container.appendChild(line);
            this.gridLines.push(line);
        }
    }

    createGamingIcons() {
        const gameIcons = ['🎮', '🕹️', '🎯', '🎲', '🎪', '🎨'];
        
        gameIcons.forEach((icon, index) => {
            const iconElement = document.createElement('div');
            iconElement.className = 'gaming-icon';
            iconElement.textContent = icon;
            iconElement.style.left = `${10 + Math.random() * 80}%`;
            iconElement.style.top = `${10 + Math.random() * 80}%`;
            iconElement.style.animationDelay = `${index * 1.5}s`;
            iconElement.style.animationDuration = `${8 + Math.random() * 4}s`;
            
            this.container.appendChild(iconElement);
            this.icons.push(iconElement);
        });
    }

    createFlyingElements() {
        const flyingItems = [
            { emoji: '✈️', class: 'flying-element', count: 3 },
            { emoji: '🚁', class: 'flying-element', count: 2 },
            { emoji: '🎈', class: 'balloon', count: 4 },
            { emoji: '🦋', class: 'butterfly', count: 3 },
            { emoji: '🐦', class: 'bird-element', count: 4 },
            { emoji: '☁️', class: 'cloud-element', count: 3 },
            { emoji: '🛩️', class: 'paper-plane', count: 2 },
            { emoji: '🚀', class: 'flying-element', count: 2 },
            { emoji: '🎯', class: 'floating-emoji', count: 2 },
            { emoji: '⭐', class: 'floating-emoji', count: 3 },
            { emoji: '🌟', class: 'floating-emoji', count: 2 },
            { emoji: '💫', class: 'floating-emoji', count: 2 }
        ];

        flyingItems.forEach(item => {
            for (let i = 0; i < item.count; i++) {
                const element = document.createElement('div');
                element.className = item.class;
                element.textContent = item.emoji;
                element.style.top = `${Math.random() * 60 + 10}%`;
                element.style.left = '-100px';
                element.style.animationDelay = `${Math.random() * 20}s`;
                element.style.animationDuration = `${10 + Math.random() * 15}s`;
                
                this.container.appendChild(element);
                this.elements.push(element);
            }
        });
    }

    createRunningElements() {
        const runningItems = [
            { emoji: '🚗', class: 'car-element', count: 3 },
            { emoji: '🚙', class: 'car-element', count: 2 },
            { emoji: '🏃‍♂️', class: 'running-element', count: 2 },
            { emoji: '🏃‍♀️', class: 'running-element', count: 2 },
            { emoji: '🚲', class: 'running-element', count: 2 },
            { emoji: '🛴', class: 'running-element', count: 2 },
            { emoji: '🐕', class: 'running-element', count: 2 },
            { emoji: '🐱', class: 'running-element', count: 1 },
            { emoji: '🚌', class: 'car-element', count: 1 }
        ];

        runningItems.forEach(item => {
            for (let i = 0; i < item.count; i++) {
                const element = document.createElement('div');
                element.className = item.class;
                element.textContent = item.emoji;
                element.style.left = '-100px';
                element.style.animationDelay = `${Math.random() * 25}s`;
                element.style.animationDuration = `${8 + Math.random() * 10}s`;
                
                this.container.appendChild(element);
                this.elements.push(element);
            }
        });
    }

    createBouncingBalls() {
        const ballColors = [
            'radial-gradient(circle at 30% 30%, #ff6b35, #dc2626)',
            'radial-gradient(circle at 30% 30%, #3b4cb8, #1e40af)',
            'radial-gradient(circle at 30% 30%, #10b981, #059669)',
            'radial-gradient(circle at 30% 30%, #f59e0b, #d97706)',
            'radial-gradient(circle at 30% 30%, #8b5cf6, #7c3aed)'
        ];

        for (let i = 0; i < 8; i++) {
            const ball = document.createElement('div');
            ball.className = 'bouncing-ball';
            ball.style.left = `${Math.random() * 80 + 10}%`;
            ball.style.top = `${Math.random() * 60 + 20}%`;
            ball.style.background = ballColors[i % ballColors.length];
            ball.style.animationDelay = `${Math.random() * 4}s`;
            ball.style.animationDuration = `${3 + Math.random() * 3}s`;
            
            this.container.appendChild(ball);
            this.elements.push(ball);
        }
    }

    createShootingStars() {
        for (let i = 0; i < 6; i++) {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            star.style.left = `${Math.random() * 50}%`;
            star.style.top = `${Math.random() * 50}%`;
            star.style.animationDelay = `${Math.random() * 8}s`;
            star.style.animationDuration = `${2 + Math.random() * 2}s`;
            
            this.container.appendChild(star);
            this.elements.push(star);
        }
    }

    addInteractivity() {
        // Mouse interaction for particles
        this.container.addEventListener('mousemove', (e) => {
            if (Math.random() < 0.3) { // 30% chance to create particle
                this.createMouseParticle(e);
            }
        });

        // Touch interaction for mobile
        this.container.addEventListener('touchmove', (e) => {
            if (Math.random() < 0.2 && e.touches[0]) { // 20% chance on mobile
                this.createTouchParticle(e.touches[0]);
            }
        });
    }

    createMouseParticle(e) {
        const rect = this.container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        this.createInteractionParticle(x, y);
    }

    createTouchParticle(touch) {
        const rect = this.container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 100;
        const y = ((touch.clientY - rect.top) / rect.height) * 100;
        
        this.createInteractionParticle(x, y);
    }

    createInteractionParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = '#ff6b35';
        particle.style.borderRadius = '50%';
        particle.style.opacity = '1';
        particle.style.boxShadow = '0 0 10px #ff6b35';
        particle.style.transform = 'scale(0)';
        particle.style.transition = 'all 0.6s ease-out';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '5';
        
        this.container.appendChild(particle);
        
        // Animate particle
        requestAnimationFrame(() => {
            particle.style.transform = 'scale(1)';
            particle.style.opacity = '0';
        });
        
        // Remove particle
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 600);
    }

    setupVisibilityObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.isVisible = entry.isIntersecting;
                this.toggleAnimations(this.isVisible);
            });
        }, { threshold: 0.1 });

        const entertainmentSection = document.querySelector('.entertainment-section');
        if (entertainmentSection) {
            observer.observe(entertainmentSection);
        }
    }

    toggleAnimations(play) {
        const allAnimatedElements = [
            ...this.elements,
            ...this.particles,
            ...this.gridLines,
            ...this.icons
        ];

        allAnimatedElements.forEach(element => {
            if (element && element.style) {
                element.style.animationPlayState = play ? 'running' : 'paused';
            }
        });
    }

    // Dynamic animation updates
    startDynamicEffects() {
        if (!this.isVisible) return;

        setInterval(() => {
            // Randomly pulse elements
            if (Math.random() < 0.1) {
                const randomElement = this.elements[Math.floor(Math.random() * this.elements.length)];
                if (randomElement) {
                    this.pulseElement(randomElement);
                }
            }

            // Randomly move particles
            if (Math.random() < 0.05) {
                this.shuffleParticles();
            }
        }, 1000);
    }

    pulseElement(element) {
        const originalTransform = element.style.transform;
        element.style.transform = originalTransform + ' scale(1.3)';
        element.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            element.style.transform = originalTransform;
            setTimeout(() => {
                element.style.transition = '';
            }, 300);
        }, 300);
    }

    shuffleParticles() {
        this.particles.forEach(particle => {
            if (Math.random() < 0.3) {
                particle.style.left = `${Math.random() * 100}%`;
            }
        });
    }
}

// Initialize the entertainment background animation
let entertainmentAnimation;

function initEntertainmentAnimation() {
    if (!entertainmentAnimation) {
        entertainmentAnimation = new EntertainmentGameBackground();
        // Start dynamic effects after a delay
        setTimeout(() => {
            if (entertainmentAnimation) {
                entertainmentAnimation.startDynamicEffects();
            }
        }, 2000);
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEntertainmentAnimation);
} else {
    initEntertainmentAnimation();
}

// Manual initialization function (call this if needed)
window.initEntertainmentBg = initEntertainmentAnimation;

// ======= CINEMA ANIMATION SYSTEM =======
// Cinema animation is now disabled - background is clean
function initCinemaAnimation() {
    // Animation system disabled for clean background
    console.log('Cinema animation disabled for clean background');
}

// ======= Cinema Services Animations =======
function initCinemaServices() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        // Staggered animation
        card.style.animationDelay = `${index * 0.2}s`;
        
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.05)';
            card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
        
        // Add click effects
        card.addEventListener('click', () => {
            createServiceClickEffect(card);
        });
    });
    
    // Animate service icons
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.3}s`;
        
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

function createServiceClickEffect(card) {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.background = 'rgba(255, 107, 53, 0.6)';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'rippleEffect 0.6s ease-out';
    
    card.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ======= Booking Section Interactions =======
function initBookingSection() {
    const bookingSelects = document.querySelectorAll('.booking-select');
    
    bookingSelects.forEach(select => {
        select.addEventListener('change', () => {
            // Add selection effect
            select.style.transform = 'scale(1.05)';
            select.style.borderColor = '#ff6b35';
            
            setTimeout(() => {
                select.style.transform = 'scale(1)';
            }, 200);
        });
        
        select.addEventListener('focus', () => {
            select.style.transform = 'scale(1.02)';
        });
        
        select.addEventListener('blur', () => {
            select.style.transform = 'scale(1)';
        });
    });
    
    // Animate booking buttons
    const bookingButtons = document.querySelectorAll('.booking-actions .btn');
    bookingButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', () => {
            createButtonClickEffect(button);
        });
    });
}

function createButtonClickEffect(button) {
    // Create sparkle effect
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.background = '#ff6b35';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = `sparkleEffect 0.8s ease-out`;
        
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        sparkle.style.left = centerX + 'px';
        sparkle.style.top = centerY + 'px';
        
        document.body.appendChild(sparkle);
        
        // Animate sparkle
        setTimeout(() => {
            const angle = (i * 45) * (Math.PI / 180);
            const distance = 50;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.opacity = '0';
        }, 10);
        
        // Remove sparkle
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 800);
    }
}

// Add sparkle animation to CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCinemaAnimation);
} else {
    initCinemaAnimation();
}

// Manual initialization function
window.initCinemaBg = initCinemaAnimation;


