// ============================================================
// MAIN.JS - Hiệu ứng 3D nền + Tương tác cơ bản
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
    // ----- THREE.JS BACKGROUND (trang chủ) -----
    const heroCanvas = document.getElementById('heroCanvas');
    if (heroCanvas) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        heroCanvas.prepend(renderer.domElement);

        // Ánh sáng
        const ambientLight = new THREE.AmbientLight(0x404060);
        scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffd700, 1);
        dirLight.position.set(1, 2, 1);
        scene.add(dirLight);

        // Particle system
        const particlesGeo = new THREE.BufferGeometry();
        const particleCount = 2000;
        const posArray = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 40;
        }
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMat = new THREE.PointsMaterial({
            color: 0xffd700,
            size: 0.08,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
        });
        const particleSystem = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particleSystem);

        // Một vài hình khối 3D xoay
        const geometry = new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16);
        const material = new THREE.MeshStandardMaterial({
            color: 0xff6b00,
            metalness: 0.7,
            roughness: 0.2,
            emissive: 0xff6b00,
            emissiveIntensity: 0.1,
        });
        const torusKnot = new THREE.Mesh(geometry, material);
        torusKnot.position.x = 2.5;
        torusKnot.position.y = 0.5;
        scene.add(torusKnot);

        const geometry2 = new THREE.IcosahedronGeometry(0.6, 1);
        const material2 = new THREE.MeshStandardMaterial({
            color: 0xffd700,
            metalness: 0.5,
            roughness: 0.3,
            emissive: 0xffd700,
            emissiveIntensity: 0.05,
        });
        const icosa = new THREE.Mesh(geometry2, material2);
        icosa.position.x = -2.5;
        icosa.position.y = -0.2;
        scene.add(icosa);

        camera.position.z = 5;

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            torusKnot.rotation.x += 0.005;
            torusKnot.rotation.y += 0.01;
            icosa.rotation.x += 0.008;
            icosa.rotation.y += 0.006;
            particleSystem.rotation.y += 0.0005;
            renderer.render(scene, camera);
        }
        animate();

        // Resize handler
        window.addEventListener('resize', function () {
            const w = window.innerWidth;
            const h = window.innerHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        });
    }

    // ----- FILTER GAME (games.html) -----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const gameGrid = document.getElementById('gameGrid');

    if (filterBtns.length && gameGrid) {
        // Dữ liệu game mẫu
        const games = [
            { id: 1, name: 'Nổ Hũ Kim Cương', category: 'slot', icon: '💎', desc: 'Slot 3D với giải thưởng khủng' },
            { id: 2, name: 'Poker Royal', category: 'card', icon: '♠️', desc: 'Game bài Poker đỉnh cao' },
            { id: 3, name: 'Roulette 3D', category: 'casino', icon: '🎡', desc: 'Roulette 3D chân thực' },
            { id: 4, name: 'Baccarat VIP', category: 'casino', icon: '🃏', desc: 'Baccarat với dealer 3D' },
            { id: 5, name: 'Tiến Lên Miền Nam', category: 'card', icon: '🀄', desc: 'Game bài truyền thống' },
            { id: 6, name: 'Sloth Mania', category: 'slot', icon: '🎰', desc: 'Slot 3D nhiều tính năng' },
        ];

        function renderGames(filter = 'all') {
            const filtered = filter === 'all' ? games : games.filter(g => g.category === filter);
            gameGrid.innerHTML = filtered.map(g => `
                <div class="game-card" data-id="${g.id}">
                    <div class="thumb">${g.icon}</div>
                    <div class="info">
                        <h4>${g.name}</h4>
                        <p>${g.desc}</p>
                    </div>
                </div>
            `).join('');
        }

        renderGames();

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                renderGames(this.dataset.filter);
            });
        });

        // Click game -> mở modal 3D (demo)
        gameGrid.addEventListener('click', function (e) {
            const card = e.target.closest('.game-card');
            if (card) {
                const name = card.querySelector('.info h4')?.textContent || 'Game 3D';
                const modal = document.getElementById('gameModal');
                if (modal) {
                    document.getElementById('gameTitle').textContent = name;
                    document.getElementById('gameDesc').textContent = 'Đang tải mô hình 3D...';
                    modal.classList.add('active');
                    // Giả lập load 3D
                    const container = document.getElementById('game3dContainer');
                    container.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#888;font-size:1.2rem;">🎮 Đang tải ${name} ...</div>`;
                    // Sau 1.5s hiển thị 3D demo
                    setTimeout(() => {
                        container.innerHTML = `
                            <div style="display:flex;align-items:center;justify-content:center;height:100%;flex-direction:column;gap:15px;">
                                <div style="font-size:4rem;">🎰</div>
                                <div style="color:#ffd700;font-weight:600;">${name} - 3D Mode</div>
                                <div style="color:#888;font-size:0.85rem;">Mô phỏng đồ họa 3D</div>
                            </div>
                        `;
                    }, 1500);
                }
            }
        });

        // Close modal
        const closeBtn = document.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                document.getElementById('gameModal').classList.remove('active');
            });
        }
        window.addEventListener('click', function (e) {
            const modal = document.getElementById('gameModal');
            if (e.target === modal) modal.classList.remove('active');
        });
    }
});