document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. DATA: PROJECT DETAILS FOR MODAL
    // ==========================================
    const projectData = {
        '1': {
            title: 'Poster Layout',
            category: 'Posters',
            image: 'assets/images/171.jpg',
            description: 'A clean and balanced poster layout design built in CorelDRAW. The design emphasizes clear grid alignment, hierarchy, and intentional whitespace to present details in an aesthetic, readable format. Ideal for corporate events or announcements.',
            tools: ['CorelDRAW', 'Canva', 'Layout Design'],
            focus: 'Visual Balance & Grid Systems'
        },
        '2': {
            title: 'Brochure Design',
            category: 'Brochures',
            image: 'assets/images/172.jpg',
            description: 'A professional multi-page corporate brochure designed using Adobe Express and CorelDRAW. This layout includes custom graphics, clean content columns, and cohesive branding, making it highly effective for marketing campaigns and business presentations.',
            tools: ['Adobe Express', 'CorelDRAW', 'Brochure Design'],
            focus: 'Typography & Multi-page Layouts'
        },
        '3': {
            title: 'Acrylic Signage boards',
            category: 'Boards',
            image: 'assets/images/184.jpg',
            description: 'A custom Acrylic Signage boards designed with vibrant gradients and visual assets. The vector assets were developed in CorelDRAW and were finalized in Photoshop to produce realistic lighting overlays.',
            tools: ['CorelDRAW', 'Photoshop'],
            focus: 'Acrylic Signage boards'
        },
        '4': {
            title: 'Poster Design',
            category: 'Posters',
            image: 'assets/images/175.jpg',
            description: 'An artistic, creative poster layout showcasing advanced typography and raster editing. Built in Photoshop and CorelDRAW, it combines photo masking techniques with vector styling to produce a high-contrast promotional banner.',
            tools: ['CorelDRAW', 'Photoshop', 'Poster Design'],
            focus: 'Color Contrast & Artistic Assets'
        }
    };

    // ==========================================
    // 2. THEME & ACCENT CONTROLLER
    // ==========================================
    const htmlEl = document.documentElement;
    const themeToggleBtn = document.getElementById('themeToggleBtn');

    // Theme Switcher Logic
    const currentTheme = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const activeTheme = htmlEl.getAttribute('data-theme');
            const newTheme = activeTheme === 'light' ? 'dark' : 'light';
            htmlEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Re-render icons if needed (Lucide handles standard elements)
            updateThemeIcons(newTheme);
        });
    }

    function updateThemeIcons(theme) {
        // Simple visual reinforcement
        const darkIcon = themeToggleBtn.querySelector('.theme-icon-dark');
        const lightIcon = themeToggleBtn.querySelector('.theme-icon-light');
        if (theme === 'light') {
            if (darkIcon) darkIcon.style.display = 'none';
            if (lightIcon) lightIcon.style.display = 'block';
        } else {
            if (darkIcon) darkIcon.style.display = 'block';
            if (lightIcon) lightIcon.style.display = 'none';
        }
    }
    // Initialize icons
    updateThemeIcons(currentTheme);

    // Accent Color Picker Logic
    const accentPicker = document.getElementById('accentPicker');
    const savedAccent = localStorage.getItem('accent-color') || '124, 58, 237'; // Default violet

    // Set initial accent
    htmlEl.style.setProperty('--accent-rgb', savedAccent);

    if (accentPicker) {
        const dots = accentPicker.querySelectorAll('.accent-dot');

        // Highlight active saved dot
        dots.forEach(dot => {
            if (dot.getAttribute('data-accent') === savedAccent) {
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            }

            dot.addEventListener('click', (e) => {
                const accentVal = dot.getAttribute('data-accent');
                htmlEl.style.setProperty('--accent-rgb', accentVal);
                localStorage.setItem('accent-color', accentVal);

                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');

                showToast('Accent color updated successfully!');
            });
        });
    }

    // ==========================================
    // 3. MOUSE INTERACTIVE EFFECTS
    // ==========================================
    // Hero glow tracker
    const heroSection = document.getElementById('hero');
    const heroGlow = document.getElementById('heroGlow');

    if (heroSection && heroGlow) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            heroGlow.style.left = `${x}px`;
            heroGlow.style.top = `${y}px`;
        });
    }

    // Skills card border glow tracker
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ==========================================
    // 4. NAVIGATION & MOBILE MENU
    // ==========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');

    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
            // Toggle hamburger icon between menu and x
            const icon = mobileMenuBtn.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Close menu when links are clicked
        const navLinks = navList.querySelectorAll('.nav-link, .nav-cta');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // Header Shadow on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.style.boxShadow = 'var(--shadow-md)';
            header.style.borderBottom = '1px solid var(--border-color)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Smooth Scrolling with Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 5. PROJECT FILTER TAB LOGIC
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active state and assign to clicked button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                // Animating out before hiding
                card.style.transform = 'scale(0.95)';
                card.style.opacity = '0';

                setTimeout(() => {
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.transform = 'scale(1)';
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.classList.add('hidden');
                    }
                }, 300);
            });
        });
    });

    // ==========================================
    // 6. LIGHTBOX MODAL LOGIC
    // ==========================================
    const modal = document.getElementById('projectModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDescription = document.getElementById('modalDescription');
    const modalFocus = document.getElementById('modalFocus');
    const modalTools = document.getElementById('modalTools');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');

    portfolioCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-id');
            const data = projectData[projectId];

            if (data) {
                // Populate Modal Data
                modalImage.src = data.image;
                modalImage.alt = data.title;
                modalTitle.textContent = data.title;
                modalCategory.textContent = data.category;
                modalDescription.textContent = data.description;
                modalFocus.textContent = data.focus;

                // Clear and create tools tags
                modalTools.innerHTML = '';
                data.tools.forEach(tool => {
                    const tag = document.createElement('span');
                    tag.className = 'meta-tag';
                    tag.textContent = tool;
                    modalTools.appendChild(tag);
                });

                // Open Modal
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden'; // Stop page scrolling
            }
        });
    });

    // Close Modal helper
    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Resume page scrolling
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // ESC key closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // ==========================================
    // 7. CONTACT FORM SUBMIT & TOAST FEEDBACK
    // ==========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Set sending feedback
            submitBtn.innerHTML = 'Sending Message...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.8';

            // Simulate server delivery
            setTimeout(() => {
                showToast('Thank you! Your message has been sent successfully.');
                contactForm.reset();

                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }, 1800);
        });
    }

    // Floating Toast Notification Logic
    function showToast(message) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <i data-lucide="check-circle" class="toast-success-icon"></i>
            <span class="toast-message">${message}</span>
        `;

        container.appendChild(toast);
        lucide.createIcons(); // Instantiates toast icon

        // Trigger animation transition in
        setTimeout(() => {
            toast.classList.add('show');
        }, 50);

        // Remove toast after duration
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 4000);
    }

    // ==========================================
    // 8. SCROLL REVEAL (INTERSECTION OBSERVER)
    // ==========================================
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // We add class and control visual states in CSS transitions
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
        sectionObserver.observe(section);
    });

});
