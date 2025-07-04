document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.getElementById('copy-button');
    const contractAddress = '3BtunCQ3KdpsYtXQU9SmkGopnDkaQHuEgG14Dy1Lbonk';
    
    if (copyButton) {
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(contractAddress).then(() => {
                const originalContent = copyButton.innerHTML;
                copyButton.innerHTML = 'Copied!';
                setTimeout(() => {
                    copyButton.innerHTML = originalContent;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    const canvas = document.getElementById('background-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            particles = [];
            const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.5,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity})`;
                ctx.fill();
            });
            requestAnimationFrame(animate);
        };

        const init = () => {
            setCanvasSize();
            createParticles();
            animate();
        };

        window.addEventListener('resize', () => {
            setCanvasSize();
            createParticles();
        });

        init();
    }
}); 