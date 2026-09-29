if (typeof window.fbScrollerRunning === 'undefined') {
    window.fbScrollerRunning = true;
    
    (async function() {
        console.log("%c[System] Bắt đầu tự động cuộn tải danh sách...", "color: blue; font-size: 16px; font-weight: bold;");

        const delay = (ms) => new Promise(res => setTimeout(res, ms));

        let lastScrollHeight = 0;
        let retries = 0;
        const MAX_RETRIES = 4; // Cố thử đợi 4 lần

        while (retries < MAX_RETRIES) {
            let dialog = document.querySelector('div[role="dialog"]');
            
            if (dialog) {
                let scrollableNodes = Array.from(dialog.querySelectorAll('*')).filter(
                    el => getComputedStyle(el).overflowY === 'auto' || getComputedStyle(el).overflowY === 'scroll'
                );
                
                if (scrollableNodes.length > 0) {
                    let container = scrollableNodes[0];
                    if (container.scrollHeight > lastScrollHeight) {
                        lastScrollHeight = container.scrollHeight;
                        container.scrollTop = container.scrollHeight;
                        retries = 0; // Đã load thêm, reset retry
                        console.log("Đã cuộn thêm dữ liệu...");
                    } else {
                        retries++;
                        console.log(`Chưa thấy dữ liệu mới, đang đợi... (Thử ${retries}/${MAX_RETRIES})`);
                    }
                } else {
                    dialog.scrollTop = dialog.scrollHeight;
                    retries++;
                }
            } else {
                window.scrollBy(0, 1000);
                if (document.body.scrollHeight > lastScrollHeight) {
                    lastScrollHeight = document.body.scrollHeight;
                    retries = 0;
                } else {
                    retries++;
                }
            }
            
            await delay(1500); // Chờ 1.5s để Facebook render bạn bè mới
        }
        
        console.log("%c[System] Hoàn tất cuộn danh sách!", "color: blue; font-size: 16px; font-weight: bold;");
        alert("Đã cuộn đến cuối danh sách!\nBây giờ bạn có thể bấm 'Bắt đầu mời bạn bè'.");
        
        window.fbScrollerRunning = undefined;
    })();
} else {
    console.log("Công cụ cuộn đang chạy rồi, vui lòng chờ.");
}
