// ============================================================
// GAME-LOADER.JS - Quản lý tải và hiển thị game 3D
// ============================================================

// Hàm này có thể mở rộng để load file .glb / .gltf
function loadGame3D(containerId, gameId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Xóa nội dung cũ
    container.innerHTML = '';

    // Tạo scene Three.js riêng cho game
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ánh sáng
    const ambient = new THREE.AmbientLight(0x404060);
    scene.add(ambient);
    const light = new THREE.DirectionalLight(0xffd700, 1.5);
    light.position.set(2, 3, 4);
    scene.add(light);

    // Tạo object 3D mẫu (có thể thay bằng model thật)
    const geo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const mat = new THREE.MeshStandardMaterial({
        color: 0xff6b00,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0xff6b00,
        emissiveIntensity: 0.1,
    });
    const cube = new THREE.Mesh(geo, mat);
    scene.add(cube);

    // Thêm particle nhỏ xung quanh
    const particlesGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(300 * 3);
    for (let i = 0; i < 300 * 3; i++) {
        pos[i] = (Math.random() - 0.5) * 6;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const particlesMat = new THREE.PointsMaterial({
        color: 0xffd700,
        size: 0.05,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    camera.position.z = 3.5;

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.015;
        particles.rotation.y += 0.002;
        renderer.render(scene, camera);
    }
    animate();

    // Resize
    const resizeObserver = new ResizeObserver(() => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w > 0 && h > 0) {
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        }
    });
    resizeObserver.observe(container);
}