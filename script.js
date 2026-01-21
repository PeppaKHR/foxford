// Smooth scroll and animations
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animate cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe all cards
    const cards = document.querySelectorAll('.data-card, .hypothesis-card, .team-card, .dashboard-card, .system-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(card);
    });

    // Highlight RICE scores
    const riceScores = document.querySelectorAll('.rice-score');
    riceScores.forEach(score => {
        score.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s';
        });
        score.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Chain animation
    const chainItems = document.querySelectorAll('.chain-item');
    chainItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s, transform 0.5s';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
});

// Toggle RICE table
function toggleRiceTable(hypothesisNumber) {
    
    const riceScore = document.querySelectorAll('.rice-score')[hypothesisNumber - 1];
    const riceTable = document.getElementById(`rice-table-${hypothesisNumber}`);
    
    if (!riceTable) return;
    
    const isActive = riceTable.classList.contains('active');
    
    // Close all tables first
    document.querySelectorAll('.rice-table').forEach(table => {
        table.classList.remove('active');
    });
    document.querySelectorAll('.rice-score').forEach(score => {
        score.classList.remove('active');
    });
    
    // Open clicked table if it wasn't active
    if (!isActive) {
        riceScore.classList.add('active');
        riceTable.classList.add('active');
    }
}

// Image Modal functions
function openImageModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    if (modal && modalImg) {
        modalImg.src = imageSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeImageModal(event) {
    if (event) {
        event.stopPropagation();
    }
    const modal = document.getElementById('imageModal');
    
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});

