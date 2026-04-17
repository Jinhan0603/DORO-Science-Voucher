/* ========================================
   DORO Education Portal - Main JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Header scroll effect ---
    const header = document.getElementById('site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 10);
        });
    }

    // --- Scroll animations ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe program cards
    document.querySelectorAll('.program-card, .animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // Observe step cards
    document.querySelectorAll('.step-card').forEach(el => {
        scrollObserver.observe(el);
    });

    // --- Progress bar for program pages ---
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // --- Table of Contents highlight ---
    const tocItems = document.querySelectorAll('.toc-item');
    const sections = [];

    tocItems.forEach(item => {
        const targetId = item.getAttribute('data-target');
        const section = document.getElementById(targetId);
        if (section) {
            sections.push({ element: section, tocItem: item });
        }

        item.addEventListener('click', () => {
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    if (sections.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + 200;
            let current = sections[0];

            sections.forEach(s => {
                if (scrollPos >= s.element.offsetTop) {
                    current = s;
                }
            });

            tocItems.forEach(item => item.classList.remove('active'));
            current.tocItem.classList.add('active');
        });
    }

    // --- Step card active state based on scroll ---
    const stepCards = document.querySelectorAll('.step-card');
    if (stepCards.length > 0) {
        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active from all
                    stepCards.forEach(c => c.classList.remove('active'));
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.5 });

        stepCards.forEach(card => stepObserver.observe(card));
    }

    // --- Checklist toggle ---
    document.querySelectorAll('.checklist-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const item = this.closest('.checklist-item');
            item.classList.toggle('checked', this.checked);

            // Save state to localStorage
            const key = `doro-checklist-${window.location.pathname}-${this.id}`;
            localStorage.setItem(key, this.checked);
        });

        // Restore state from localStorage
        const key = `doro-checklist-${window.location.pathname}-${checkbox.id}`;
        const saved = localStorage.getItem(key);
        if (saved === 'true') {
            checkbox.checked = true;
            checkbox.closest('.checklist-item').classList.add('checked');
        }
    });

    // --- FAQ accordion ---
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.closest('.faq-item');
            const answer = item.querySelector('.faq-answer');
            const isOpen = item.classList.contains('open');

            // Close all others
            document.querySelectorAll('.faq-item.open').forEach(other => {
                if (other !== item) {
                    other.classList.remove('open');
                    other.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });

            // Toggle current
            item.classList.toggle('open', !isOpen);
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // --- Program card entrance animation with stagger ---
    const cards = document.querySelectorAll('.program-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
    });

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => cardObserver.observe(card));
});
