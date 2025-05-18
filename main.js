document.addEventListener('DOMContentLoaded', () => {
    // Loader
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        loader.classList.add('hidden');
    });

    // Fireworks Text Animation
    const fireworksText = document.getElementById('fireworks-text');
    const textContent = fireworksText.textContent;
    fireworksText.innerHTML = textContent
        .split('')
        .map((char, i) => `<span class="firework-letter" style="animation-delay: ${i * 0.1}s">${char}</span>`)
        .join('');

    const letters = document.querySelectorAll('.firework-letter');
    setTimeout(() => {
        letters.forEach(letter => letter.classList.add('visible'));
    }, 500);

    // Fireworks and Particles
    fireworksText.addEventListener('click', (e) => {
        createFirework(e.clientX, e.clientY);
        letters.forEach(letter => {
            letter.style.animation = 'none';
            letter.offsetHeight;
            letter.style.animation = `cyberGlitch 0.5s ${Math.random() * 0.2}s`;
            createTextFireParticles(letter);
        });
    });

    function createFirework(x, y) {
        const firework = document.createElement('div');
        firework.className = 'firework-explode';
        firework.style.left = `${x}px`;
        firework.style.top = `${y}px`;
        document.body.appendChild(firework);

        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            const angle = (i / 8) * 360;
            const distance = Math.random() * 50 + 20;
            sparkle.style.setProperty('--sparkle-x', `${Math.cos(angle * Math.PI / 180) * distance}px`);
            sparkle.style.setProperty('--sparkle-y', `${Math.sin(angle * Math.PI / 180) * distance}px`);
            firework.appendChild(sparkle);
        }

        setTimeout(() => firework.remove(), 1200);
    }

    function createTextFireParticles(letter) {
        const rect = letter.getBoundingClientRect();
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.className = 'text-fire-particle';
            const xMove = (Math.random() - 0.5) * 50;
            const yMove = (Math.random() - 0.5) * 50;
            particle.style.left = `${rect.left + rect.width / 2}px`;
            particle.style.top = `${rect.top + rect.height / 2}px`;
            particle.style.setProperty('--x-move', `${xMove}px`);
            particle.style.setProperty('--y-move', `${yMove}px`);
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1500);
        }
    }

    // Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mousedown', () => cursor.classList.add('click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));

    // Scroll to Intro
    window.scrollToIntro = () => {
        document.getElementById('intro').scrollIntoView({ behavior: 'smooth' });
    };

    // Stats Counter
    const statItems = document.querySelectorAll('.stat-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const h3 = entry.target.querySelector('h3');
                const target = parseInt(h3.dataset.count);
                let count = 0;
                const increment = target / 50;
                const updateCount = () => {
                    count += increment;
                    h3.textContent = Math.round(count);
                    if (count < target) requestAnimationFrame(updateCount);
                    else h3.textContent = target;
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statItems.forEach(item => observer.observe(item));

    // Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // Profile Cards Animation
    const profileCards = document.querySelectorAll('.profile-card');
    const profileObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible', 'anim-hologram');
            }
        });
    }, { threshold: 0.2 });

    profileCards.forEach(card => profileObserver.observe(card));

    // Profile Popup
    // profileCards.forEach(card => {
    //     card.addEventListener('click', (e) => {
    //         if (e.target.closest('.details-toggle') || e.target.closest('.profile-social a')) return;
    //         const popup = createProfilePopup(card);
    //         document.body.appendChild(popup);
    //         setTimeout(() => popup.classList.add('active'), 10);
    //     });
    // });

    function createProfilePopup(card) {
        const popup = document.createElement('div');
        popup.className = 'profile-popup';
        const content = card.querySelector('.profile-content').cloneNode(true);
        content.querySelector('.details-toggle').remove();
        content.querySelector('.profile-details').classList.add('visible');
        const imgSrc = card.querySelector('.profile-img').src;
        popup.innerHTML = `
            <button class="popup-close"><i class="fas fa-times"></i></button>
            <div class="popup-content">
                <img src="${imgSrc}" alt="Profile">
                ${content.outerHTML}
            </div>
            <div class="popup-scanline"></div>
        `;
        popup.querySelector('.popup-close').addEventListener('click', () => {
            popup.classList.remove('active');
            setTimeout(() => popup.remove(), 500);
        });
        return popup;
    }

    // Hologram Widget Toggle
    const widgetToggle = document.getElementById('widget-toggle-1');
    const hologramWidget = document.getElementById('hologram-widget-1');
    widgetToggle.addEventListener('click', () => {
        hologramWidget.classList.toggle('active');
        widgetToggle.classList.toggle('active');
    });

    // Show More/Less Profiles
    const showMoreBtn = document.getElementById('show-more-btn');
    let isExpanded = false;
    showMoreBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        profileCards.forEach(card => {
            if (card.classList.contains('hidden')) {
                card.style.display = isExpanded ? 'flex' : 'none';
                if (isExpanded) {
                    card.classList.add('visible', 'anim-hologram');
                    profileObserver.observe(card);
                }
            }
        });
        showMoreBtn.textContent = isExpanded ? 'Show Less' : 'Show More';
        showMoreBtn.classList.toggle('active');
    });

    // Footer Animation
    const footer = document.querySelector('.footer');
    const footerObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            footer.classList.add('visible');
            footerObserver.unobserve(footer);
        }
    }, { threshold: 0.2 });
    footerObserver.observe(footer);

    // Profile Details Toggle
    window.toggleDetails = (button) => {
        const card = button.closest('.profile-card');
        const details = card.querySelector('.profile-details');
        details.classList.toggle('visible');
        button.innerHTML = details.classList.contains('visible')
            ? 'Hide Details <i class="fas fa-chevron-up"></i>'
            : 'Show Details <i class="fas fa-chevron-down"></i>';
    };

    // Dynamic Cyber Particles
    function createCyberParticle() {
        const particle = document.createElement('div');
        particle.className = 'cyber-particle';
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const xMove = (Math.random() - 0.5) * 100;
        const yMove = (Math.random() - 0.5) * 100;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--x-move', `${xMove}px`);
        particle.style.setProperty('--y-move', `${yMove}px`);
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 5000);
    }

    setInterval(createCyberParticle, 1000);

    // Code Particles (Matrix-like)
    function createCodeParticle() {
        const particle = document.createElement('div');
        particle.className = 'code-particle';
        particle.textContent = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));
        particle.style.left = `${Math.random() * window.innerWidth}px`;
        particle.style.top = `0px`;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 6000);
    }

    setInterval(createCodeParticle, 500);

    // Glitch Particles
    function createGlitchParticle() {
        const particle = document.createElement('div');
        particle.className = 'glitch-particle';
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const xMove = (Math.random() - 0.5) * 80;
        const yMove = (Math.random() - 0.5) * 80;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--x-move', `${xMove}px`);
        particle.style.setProperty('--y-move', `${yMove}px`);
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 3000);
    }

    setInterval(createGlitchParticle, 800);
});

const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});
document.addEventListener('mousedown', () => cursor.classList.add('click'));
document.addEventListener('mouseup', () => cursor.classList.remove('click'));

// Add this function to create cursor particles
function createCursorParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    const xMove = (Math.random() - 0.5) * 30;
    const yMove = (Math.random() - 0.5) * 30;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty('--x-move', `${xMove}px`);
    particle.style.setProperty('--y-move', `${yMove}px`);
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
}

// Modify the mousemove event listener
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    // Spawn a particle every 100ms to avoid performance issues
    if (Math.random() < 0.1) { // 10% chance per mousemove
        createCursorParticle(e.clientX, e.clientY);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Loader
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        loader.classList.add('hidden');
    });

    // Fireworks Text Animation
    const fireworksText = document.getElementById('fireworks-text');
    const textContent = fireworksText.textContent;
    fireworksText.innerHTML = textContent
        .split('')
        .map((char, i) => `<span class="firework-letter" style="animation-delay: ${i * 0.1}s">${char}</span>`)
        .join('');

    const letters = document.querySelectorAll('.firework-letter');
    setTimeout(() => {
        letters.forEach(letter => letter.classList.add('visible'));
    }, 500);

    fireworksText.addEventListener('click', (e) => {
        createFirework(e.clientX, e.clientY);
        letters.forEach(letter => {
            letter.style.animation = `cyberGlitch 0.2s ${Math.random() * 0.1}s infinite`;
            createTextFireParticles(letter);
            setTimeout(() => {
                letter.style.animation = `cyberGlitch 1.2s ${Math.random() * 0.2}s infinite`;
            }, 800);
        });
    });

    function createFirework(x, y) {
        const firework = document.createElement('div');
        firework.className = 'firework-explode';
        firework.style.left = `${x}px`;
        firework.style.top = `${y}px`;
        document.body.appendChild(firework);

        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            const angle = (i / 8) * 360;
            const distance = Math.random() * 50 + 20;
            sparkle.style.setProperty('--sparkle-x', `${Math.cos(angle * Math.PI / 180) * distance}px`);
            sparkle.style.setProperty('--sparkle-y', `${Math.sin(angle * Math.PI / 180) * distance}px`);
            firework.appendChild(sparkle);
        }

        setTimeout(() => firework.remove(), 1200);
    }

    function createTextFireParticles(letter) {
        const rect = letter.getBoundingClientRect();
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.className = 'text-fire-particle';
            const xMove = (Math.random() - 0.5) * 50;
            const yMove = (Math.random() - 0.5) * 50;
            particle.style.left = `${rect.left + rect.width / 2}px`;
            particle.style.top = `${rect.top + rect.height / 2}px`;
            particle.style.setProperty('--x-move', `${xMove}px`);
            particle.style.setProperty('--y-move', `${yMove}px`);
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1500);
        }
    }

    // Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    function createCursorParticle(x, y) {
        const particleCount = Math.floor(Math.random() * 2) + 2;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'cursor-particle';
            const xMove = (Math.random() - 0.5) * 40;
            const yMove = (Math.random() - 0.5) * 40;
            particle.style.left = `${x + (Math.random() - 0.5) * 10}px`;
            particle.style.top = `${y + (Math.random() - 0.5) * 10}px`;
            particle.style.setProperty('--x-move', `${xMove}px`);
            particle.style.setProperty('--y-move', `${yMove}px`);
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1200);
        }
    }

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        if (Math.random() < 0.3) {
            createCursorParticle(e.clientX, e.clientY);
        }
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
        createCursorParticle(cursor.offsetLeft + 20, cursor.offsetTop + 20);
    });
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));

    // Scroll to Intro
    window.scrollToIntro = () => {
        document.getElementById('intro').scrollIntoView({ behavior: 'smooth' });
    };

    // Stats Counter
    const statItems = document.querySelectorAll('.stat-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const h3 = entry.target.querySelector('h3');
                const target = parseInt(h3.dataset.count);
                let count = 0;
                const increment = target / 50;
                const updateCount = () => {
                    count += increment;
                    h3.textContent = Math.round(count);
                    if (count < target) requestAnimationFrame(updateCount);
                    else h3.textContent = target;
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statItems.forEach(item => observer.observe(item));

    // Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // Profile Cards Animation
    const profileCards = document.querySelectorAll('.profile-card');
    const profileObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible', 'anim-hologram');
            }
        });
    }, { threshold: 0.2 });

    profileCards.forEach(card => profileObserver.observe(card));

    // // Profile Popup
    // profileCards.forEach(card => {
    //     card.addEventListener('click', (e) => {
    //         if (e.target.closest('.details-toggle') || e.target.closest('.profile-social a')) return;
    //         const popup = createProfilePopup(card);
    //         document.body.appendChild(popup);
    //         setTimeout(() => popup.classList.add('active'), 10);
    //     });
    // });

    function createProfilePopup(card) {
        const popup = document.createElement('div');
        popup.className = 'profile-popup';
        const content = card.querySelector('.profile-content').cloneNode(true);
        content.querySelector('.details-toggle').remove();
        content.querySelector('.profile-details').classList.add('visible');
        const imgSrc = card.querySelector('.profile-img').src;
        popup.innerHTML = `
            <button class="popup-close"><i class="fas fa-times"></i></button>
            <div class="popup-content">
                <img src="${imgSrc}" alt="Profile">
                ${content.outerHTML}
            </div>
            <div class="popup-scanline"></div>
        `;
        popup.querySelector('.popup-close').addEventListener('click', () => {
            popup.classList.remove('active');
            setTimeout(() => popup.remove(), 500);
        });
        return popup;
    }

    // Hologram Widget Toggle
    const widgetToggle = document.getElementById('widget-toggle');
    const hologramWidget = document.getElementById('hologram-widget');
    widgetToggle.addEventListener('click', () => {
        hologramWidget.classList.toggle('active');
        widgetToggle.classList.toggle('active');
    });

    // Show More/Less Profiles
    const showMoreBtn = document.getElementById('show-more-btn');
    let isExpanded = false;
    showMoreBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        profileCards.forEach(card => {
            if (card.classList.contains('hidden')) {
                card.style.display = isExpanded ? 'flex' : 'none';
                if (isExpanded) {
                    card.classList.add('visible', 'anim-hologram');
                    profileObserver.observe(card);
                }
            }
        });
        showMoreBtn.textContent = isExpanded ? 'Show Less' : 'Show More';
        showMoreBtn.classList.toggle('active');
    });

    // Footer Animation
    const footer = document.querySelector('.footer');
    const footerObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            footer.classList.add('visible');
            footerObserver.unobserve(footer);
        }
    }, { threshold: 0.2 });
    footerObserver.observe(footer);

    // Profile Details Toggle
    window.toggleDetails = (button) => {
        const card = button.closest('.profile-card');
        const details = card.querySelector('.profile-details');
        details.classList.toggle('visible');
        button.innerHTML = details.classList.contains('visible')
            ? 'Hide Details <i class="fas fa-chevron-up"></i>'
            : 'Show Details <i class="fas fa-chevron-down"></i>';
    };

    // Dynamic Cyber Particles
    function createCyberParticle() {
        const particle = document.createElement('div');
        particle.className = 'cyber-particle';
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const xMove = (Math.random() - 5) * 100;
        const yMove = (Math.random() - 5) * 100;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--x-move', `${xMove}px`);
        particle.style.setProperty('--y-move', `${yMove}px`);
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 5000);
    }

    setInterval(createCyberParticle, 1000);

    // Code Particles (Matrix-like)
    function createCodeParticle() {
        const particle = document.createElement('div');
        particle.className = 'code-particle';
        particle.textContent = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));
        particle.style.left = `${Math.random() * window.innerWidth}px`;
        particle.style.top = `0px`;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 6000);
    }

    setInterval(createCodeParticle, 500);

    // Glitch Particles
    function createGlitchParticle() {
        const particle = document.createElement('div');
        particle.className = 'glitch-particle';
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const xMove = (Math.random() - 5) * 80;
        const yMove = (Math.random() - 5) * 80;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--x-move', `${xMove}px`);
        particle.style.setProperty('--y-move', `${yMove}px`);
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 3000);
    }

    setInterval(createGlitchParticle, 800);
});