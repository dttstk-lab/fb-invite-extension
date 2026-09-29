document.getElementById('startBtn').addEventListener('click', async () => {
    // Lấy tab đang active hiện tại
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab.url.includes("facebook.com")) {
        // Thực thi mã content.js vào trang
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
        });
        
        // Cập nhật trạng thái nút
        const btn = document.getElementById('startBtn');
        btn.textContent = "Đang chạy (Xem thẻ Console)...";
        btn.style.backgroundColor = "#42b72a";
    } else {
        alert("Vui lòng mở trang sự kiện Facebook!");
    }
});

document.getElementById('scrollBtn').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab.url.includes("facebook.com")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['scroll.js']
        });
        
        const btn = document.getElementById('scrollBtn');
        btn.textContent = "Đang tải...";
        
        setTimeout(() => {
            btn.textContent = "Tự động tải danh sách";
        }, 3000);
    } else {
        alert("Vui lòng mở trang sự kiện Facebook!");
    }
});
