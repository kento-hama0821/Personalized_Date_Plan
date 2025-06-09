// 背景パーティクルアニメーションの初期化
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#ff69b4" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": false, "anim": { "enable": false } },
        "size": { "value": 3, "random": true, "anim": { "enable": false } },
        "line_linked": { "enable": true, "distance": 150, "color": "#4a90e2", "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
        "modes": {
            "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
            "push": { "particles_nb": 4 }
        }
    },
    "retina_detect": true
});

document.addEventListener('DOMContentLoaded', function() {
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80; // ナビゲーションの高さ分
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // スクロールスパイの実装
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
        const currentPos = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (currentPos >= sectionTop && currentPos < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // スクロールアニメーションの実装
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.classList.add('is-visible');
            }
        });
    }

    // スクロールイベントリスナー
    window.addEventListener('scroll', () => {
        updateActiveLink();
        checkFade();
    });

    // 初期チェック
    updateActiveLink();
    checkFade();

    // AIコアのホバーエフェクト
    const aiCore = document.querySelector('.ai-core');
    if (aiCore) {
        aiCore.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1)';
        });
        aiCore.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // 将来のチャットページへの遷移処理
    const startLink = document.getElementById('start-link');
    if (startLink) {
        startLink.addEventListener('click', function(event) {
            event.preventDefault();
            document.body.style.transition = 'opacity 0.8s ease-out';
            document.body.style.opacity = '0';

            setTimeout(() => {
                alert("チャットページへ遷移します！(現在は未作成)");
                document.body.style.opacity = '1';
            }, 800);
        });
    }
});