// ============================================================
// ADMIN.JS - Xử lý bảng quản trị
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
    // ----- NAVIGATION SIDEBAR -----
    const navLinks = document.querySelectorAll('.admin-nav a[data-page]');
    const pageTitle = document.getElementById('pageTitle');
    const content = document.getElementById('adminContent');

    // Dữ liệu nội dung các trang
    const pages = {
        dashboard: `
            <div class="stats-grid">
                <div class="stat-card"><h4>Người dùng</h4><p class="stat-number">1,234</p><span class="stat-change up">+12%</span></div>
                <div class="stat-card"><h4>Doanh thu hôm nay</h4><p class="stat-number">₫45.6M</p><span class="stat-change up">+8%</span></div>
                <div class="stat-card"><h4>Game đang chạy</h4><p class="stat-number">23</p><span class="stat-change">-</span></div>
                <div class="stat-card"><h4>Người chơi online</h4><p class="stat-number">89</p><span class="stat-change up">+5%</span></div>
            </div>
            <div class="admin-table-wrapper">
                <h3>📋 Người dùng mới nhất</h3>
                <table class="admin-table">
                    <thead><tr><th>ID</th><th>Tên</th><th>Email</th><th>Số dư</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
                    <tbody>
                        <tr><td>#001</td><td>Nguyễn Văn A</td><td>vana@email.com</td><td>₫2,500,000</td><td><span class="badge active">Hoạt động</span></td><td><button class="btn-sm btn-edit">✏️</button> <button class="btn-sm btn-delete">🗑️</button></td></tr>
                        <tr><td>#002</td><td>Trần Thị B</td><td>thib@email.com</td><td>₫1,200,000</td><td><span class="badge inactive">Khóa</span></td><td><button class="btn-sm btn-edit">✏️</button> <button class="btn-sm btn-delete">🗑️</button></td></tr>
                        <tr><td>#003</td><td>Lê Văn C</td><td>levanc@email.com</td><td>₫5,800,000</td><td><span class="badge active">Hoạt động</span></td><td><button class="btn-sm btn-edit">✏️</button> <button class="btn-sm btn-delete">🗑️</button></td></tr>
                    </tbody>
                </table>
            </div>
        `,
        users: `
            <div class="admin-table-wrapper">
                <h3>👥 Danh sách người dùng</h3>
                <table class="admin-table">
                    <thead><tr><th>ID</th><th>Tên</th><th>Email</th><th>Số dư</th><th>Ngày đăng ký</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
                    <tbody>
                        <tr><td>#001</td><td>Nguyễn Văn A</td><td>vana@email.com</td><td>₫2,500,000</td><td>01/01/2025</td><td><span class="badge active">Hoạt động</span></td><td><button class="btn-sm btn-edit">✏️</button> <button class="btn-sm btn-delete">🗑️</button></td></tr>
                        <tr><td>#002</td><td>Trần Thị B</td><td>thib@email.com</td><td>₫1,200,000</td><td>15/02/2025</td><td><span class="badge inactive">Khóa</span></td><td><button class="btn-sm btn-edit">✏️</button> <button class="btn-sm btn-delete">🗑️</button></td></tr>
                        <tr><td>#003</td><td>Lê Văn C</td><td>levanc@email.com</td><td>₫5,800,000</td><td>20/03/2025</td><td><span class="badge active">Hoạt động</span></td><td><button class="btn-sm btn-edit">✏️</button> <button class="btn-sm btn-delete">🗑️</button></td></tr>
                        <tr><td>#004</td><td>Phạm Thị D</td><td>thid@email.com</td><td>₫800,000</td><td>05/04/2025</td><td><span class="badge active">Hoạt động</span></td><td><button class="btn-sm btn-edit">✏️</button> <button class="btn-sm btn-delete">🗑️</button></td></tr>
                    </tbody>
                </table>
            </div>
        `,
        games: `
            <div class="admin-table-wrapper">
                <h3>🎮 Quản lý game <button class="btn-primary" style="padding:6px 18px;font-size:0.85rem;margin-left:15px;">+ Thêm game</button></h3>
                <table class="admin-table">
                    <thead><tr><th>ID</th><th>Tên game</th><th>Thể loại</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
                    <tbody>
                        <tr><td>#001</td><td>Nổ Hũ Kim Cương</td><td>Slot 3D</td><td><span class="badge active">Đang chạy</span></td><td><button class="btn-sm btn-edit">✏️</button> <button class="btn-sm btn-delete">🗑️</button></td></tr>
                        <tr><td>#002</td><td>Poker Royal</td><td>Game bài</td><td><span class="badge active">Đang chạy</span></td><td><button class="btn-sm btn-edit">✏️</button> <button class="btn-sm btn-delete">🗑️</button></td></tr>
                        <tr><td>#003</td><td>Roulette 3D</td><td>Casino</td><td><span class="badge inactive">Bảo trì</span></td><td><button class="btn-sm btn-edit">✏️</button> <button class="btn-sm btn-delete">🗑️</button></td></tr>
                    </tbody>
                </table>
            </div>
        `,
        transactions: `
            <div class="admin-table-wrapper">
                <h3>💰 Lịch sử giao dịch</h3>
                <table class="admin-table">
                    <thead><tr><th>Mã GD</th><th>Người dùng</th><th>Loại</th><th>Số tiền</th><th>Trạng thái</th><th>Thời gian</th></tr></thead>
                    <tbody>
                        <tr><td>#TX001</td><td>Nguyễn Văn A</td><td>Nạp tiền</td><td>₫1,000,000</td><td><span class="badge active">Thành công</span></td><td>10:30 22/06/2025</td></tr>
                        <tr><td>#TX002</td><td>Trần Thị B</td><td>Rút tiền</td><td>₫500,000</td><td><span class="badge inactive">Đang xử lý</span></td><td>09:15 22/06/2025</td></tr>
                        <tr><td>#TX003</td><td>Lê Văn C</td><td>Cược</td><td>₫200,000</td><td><span class="badge active">Thành công</span></td><td>08:00 22/06/2025</td></tr>
                    </tbody>
                </table>
            </div>
        `,
        settings: `
            <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:30px;border:1px solid rgba(255,255,255,0.06);">
                <h3 style="margin-bottom:20px;color:#fff;">⚙️ Cài đặt hệ thống</h3>
                <div style="display:grid;gap:20px;">
                    <div><label style="color:#888;display:block;margin-bottom:5px;">Tên hệ thống</label><input type="text" value="Sunwin 3D Entertainment" style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(0,0,0,0.3);color:#fff;"></div>
                    <div><label style="color:#888;display:block;margin-bottom:5px;">Tỷ lệ thưởng mặc định (%)</label><input type="number" value="95" style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(0,0,0,0.3);color:#fff;"></div>
                    <div><label style="color:#888;display:block;margin-bottom:5px;">Bảo trì hệ thống</label>
                        <select style="width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(0,0,0,0.3);color:#fff;">
                            <option value="off">Tắt</option>
                            <option value="on">Bật</option>
                        </select>
                    </div>
                    <button class="btn-primary" style="border:none;cursor:pointer;width:fit-content;">💾 Lưu cài đặt</button>
                </div>
            </div>
        `
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.dataset.page;
            // Update active
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            // Update title & content
            const titles = {
                dashboard: '📊 Dashboard',
                users: '👥 Quản lý người dùng',
                games: '🎮 Quản lý game',
                transactions: '💰 Giao dịch',
                settings: '⚙️ Cài đặt'
            };
            pageTitle.textContent = titles[page] || page;
            content.innerHTML = pages[page] || '<p>Đang cập nhật...</p>';
        });
    });

    // ----- XỬ LÝ SỰ KIỆN TRÊN BẢNG (demo) -----
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-delete')) {
            if (confirm('Bạn có chắc muốn xóa mục này?')) {
                const row = e.target.closest('tr');
                if (row) row.remove();
            }
        }
        if (e.target.classList.contains('btn-edit')) {
            alert('Chức năng chỉnh sửa đang được phát triển.');
        }
    });
});