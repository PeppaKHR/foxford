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

// HADI Data for each hypothesis
const hadiData = {
    1: {
        hypothesis: "Снижение конверсии связано с изменением структуры входящего трафика и холодным исследовательским спросом в сентябре",
        action: "• Изучение входящих заявок, запросов и болей (маркетинг)\n• Анализ причин отказов и длительности сделки (продажи)\n• Глубинные интервью с тремя сегментами: купили, не купили, думают\n• Проверка конверсии лидов в последующих месяцах",
        data: "Метрики: конверсия по сегментам лидов, время до оплаты, доля исследовательских запросов\nДата проверки: Дни 3-7",
        impact: "Понимание сегментации лидов, перестройка воронки под разные типы спроса, рост конверсии за счет правильной работы с каждым сегментом",
        confidence: 0.9,
        effort: 3
    },
    2: {
        hypothesis: "Невозможно конвертировать в покупку, если пользователю мешает бот / плохая коммуникация",
        action: "• Сравнить конверсию лидов с первым контактом через бота vs живого менеджера (CRM)\n• Проанализировать записи звонков бота: доля недозвонов, отказов\n• A/B тест: 50% лидов — бот, 50% — живой менеджер\n• Опрос отказавшихся: \"Что помешало принять решение?\"",
        data: "Метрики: конверсия бот vs менеджер, доля недозвонов, негативные реакции\nДата проверки: Дни 6-10",
        impact: "Улучшение коммуникации с лидами, рост конверсии за счет качественного контакта, прогрев холодных лидов",
        confidence: 0.7,
        effort: 5
    },
    3: {
        hypothesis: "Внутреннее сравнение тарифов и эффект «колеблющегося пользователя»",
        action: "• Проанализировать внутренние переходы между тарифами на сайте\n• Сегментировать пользователей по поведенческим паттернам\n• Проверить маркетинговые кампании (приоритет тарифам для продвижения?)\n• Настроить рекомендации внутри платформы",
        data: "Метрики: переходы между тарифами, время на принятие решения, доля колеблющихся\nДата проверки: Дни 3-7",
        impact: "Сокращение цикла принятия решения, фокусировка на ценности конкретного тарифа, рост конверсии за счет снижения внутренней конкуренции",
        confidence: 0.6,
        effort: 4
    }
};

// Update HADI section based on selected hypothesis
function updateHADI(hypothesisNumber) {
    // Remove selected class from all hypothesis cards
    document.querySelectorAll('.hypothesis-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selected class to clicked hypothesis
    const selectedCard = document.querySelector(`[data-hypothesis="${hypothesisNumber}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
        
        // Scroll to HADI section
        const hadiSection = document.querySelector('.hadi-section');
        if (hadiSection) {
            setTimeout(() => {
                hadiSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
    
    // Get data for selected hypothesis
    const data = hadiData[hypothesisNumber];
    if (!data) return;
    
    // Update HADI content
    document.getElementById('hadi-hypothesis').textContent = data.hypothesis;
    document.getElementById('hadi-action').textContent = data.action;
    document.getElementById('hadi-data').textContent = data.data;
    document.getElementById('hadi-impact').textContent = data.impact;
    
    // Update confidence scale (0-1 to 0-100%)
    const confidencePercent = data.confidence * 100;
    document.getElementById('confidence-scale').style.width = confidencePercent + '%';
    document.getElementById('confidence-value').textContent = `Уверенность: ${(data.confidence * 100).toFixed(0)}%`;
    
    // Update effort scale (inverted: lower effort = higher bar, scale 1-10 to 0-100%)
    // Effort 3 = 30% (simple), Effort 5 = 50% (medium), Effort 10 = 100% (complex)
    const effortPercent = (data.effort / 10) * 100;
    document.getElementById('effort-scale').style.width = effortPercent + '%';
    const effortLabels = { 1: 'Очень простая', 2: 'Простая', 3: 'Средняя', 4: 'Средняя', 5: 'Средняя', 6: 'Сложная', 7: 'Сложная', 8: 'Очень сложная', 9: 'Очень сложная', 10: 'Критически сложная' };
    document.getElementById('effort-value').textContent = `Сложность: ${data.effort}/10 (${effortLabels[data.effort] || 'Средняя'})`;
}
