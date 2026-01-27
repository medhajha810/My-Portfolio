/**
 * Direction-Aware Image Hover - Vanilla JavaScript Implementation
 * Creates a directional slide effect on images based on mouse entry direction
 * No external dependencies required
 */

class DirectionAwareHover {
    constructor(container) {
        this.container = container;
        this.image = container.querySelector('img');
        this.overlay = null;
        this.textContent = null;

        if (!this.image) return;

        this.init();
    }

    init() {
        // Wrap image if not already wrapped
        if (!this.container.classList.contains('direction-hover-wrapper')) {
            this.wrapImage();
        }

        // Create overlay
        this.createOverlay();

        // Bind events
        this.bindEvents();
    }

    wrapImage() {
        this.container.classList.add('direction-hover-wrapper');
        this.container.style.position = 'relative';
        this.container.style.overflow = 'hidden';

        // Scale image slightly for zoom effect
        this.image.style.transform = 'scale(1.15)';
        this.image.style.transition = 'transform 0.5s ease-out';
    }

    createOverlay() {
        // Create dark overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'direction-hover-overlay';
        this.overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: 1;
        `;

        this.container.appendChild(this.overlay);

        // Create text content overlay if there's a caption
        const caption = this.container.dataset.caption;
        if (caption) {
            this.textContent = document.createElement('div');
            this.textContent.className = 'direction-hover-text';
            this.textContent.innerHTML = caption;
            this.textContent.style.cssText = `
                position: absolute;
                bottom: 1rem;
                left: 1rem;
                color: white;
                opacity: 0;
                transition: opacity 0.5s ease-out, transform 0.5s ease-out;
                z-index: 2;
                pointer-events: none;
            `;
            this.container.appendChild(this.textContent);
        }
    }

    bindEvents() {
        this.container.addEventListener('mouseenter', (e) => this.handleMouseEnter(e));
        this.container.addEventListener('mouseleave', () => this.handleMouseLeave());
    }

    handleMouseEnter(event) {
        const direction = this.getDirection(event);

        // Show overlay
        this.overlay.style.opacity = '1';

        // Apply directional transform to image
        this.applyDirectionalTransform(direction);

        // Show text with directional animation
        if (this.textContent) {
            this.textContent.style.opacity = '1';
            this.applyTextTransform(direction);
        }
    }

    handleMouseLeave() {
        // Hide overlay
        this.overlay.style.opacity = '0';

        // Reset image transform
        this.image.style.transform = 'scale(1.15) translate(0, 0)';

        // Hide text
        if (this.textContent) {
            this.textContent.style.opacity = '0';
            this.textContent.style.transform = 'translate(0, 0)';
        }
    }

    getDirection(event) {
        const rect = this.container.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        const x = event.clientX - rect.left - (w / 2) * (w > h ? h / w : 1);
        const y = event.clientY - rect.top - (h / 2) * (h > w ? w / h : 1);
        const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;

        // 0 = top, 1 = right, 2 = bottom, 3 = left
        return ['top', 'right', 'bottom', 'left'][d];
    }

    applyDirectionalTransform(direction) {
        const transforms = {
            top: 'scale(1.15) translateY(20px)',
            right: 'scale(1.15) translateX(-20px)',
            bottom: 'scale(1.15) translateY(-20px)',
            left: 'scale(1.15) translateX(20px)'
        };

        this.image.style.transform = transforms[direction] || 'scale(1.15)';
    }

    applyTextTransform(direction) {
        const transforms = {
            top: 'translateY(-20px)',
            right: 'translateX(20px)',
            bottom: 'translateY(2px)',
            left: 'translateX(-2px)'
        };

        this.textContent.style.transform = transforms[direction] || 'translate(0, 0)';
    }

    destroy() {
        if (this.overlay) this.overlay.remove();
        if (this.textContent) this.textContent.remove();
        this.image.style.transform = '';
        this.image.style.transition = '';
    }
}

// Auto-initialize on all images with direction-aware class
function initDirectionAwareHovers() {
    const containers = document.querySelectorAll('.direction-aware-hover');
    const instances = [];

    containers.forEach(container => {
        if (!container.dataset.directionInitialized) {
            instances.push(new DirectionAwareHover(container));
            container.dataset.directionInitialized = 'true';
        }
    });

    return instances;
}

// Auto-apply to all images in specific containers
function applyDirectionAwareToImages() {
    const imageSelectors = [
        '.achievement-image img',
        '.project-image',
        '.leadership-grid-image img',
        '.about-image img',
        '.cert-image-container img'
    ];

    imageSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(img => {
            const parent = img.parentElement;
            if (!parent.classList.contains('direction-aware-hover')) {
                parent.classList.add('direction-aware-hover');
            }
        });
    });

    initDirectionAwareHovers();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        applyDirectionAwareToImages();
        setTimeout(applyDirectionAwareToImages, 1000);
        setTimeout(applyDirectionAwareToImages, 2000);
    });
} else {
    applyDirectionAwareToImages();
    setTimeout(applyDirectionAwareToImages, 1000);
    setTimeout(applyDirectionAwareToImages, 2000);
}

// Watch for new images
const observer = new MutationObserver(() => {
    setTimeout(applyDirectionAwareToImages, 100);
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Export
window.DirectionAwareHover = DirectionAwareHover;
window.initDirectionAwareHovers = initDirectionAwareHovers;
window.applyDirectionAwareToImages = applyDirectionAwareToImages;
