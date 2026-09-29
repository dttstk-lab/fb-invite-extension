// Đảm bảo không bị lỗi khai báo lại nếu script bị tiêm nhiều lần
if (typeof window.fbInviterRunning === 'undefined') {
    window.fbInviterRunning = true;
    
    (async function() {
        console.log("%c[System] Bắt đầu quét và chọn bạn bè...", "color: green; font-size: 16px; font-weight: bold;");

        const delay = (ms) => new Promise(res => setTimeout(res, ms));

        let totalSelected = 0;
        
        while (true) {
            let unselectedBoxes = document.querySelectorAll('div[role="checkbox"][aria-checked="false"]');
            
            if (unselectedBoxes.length === 0) {
                console.log("Đã quét hết trên màn hình hiện tại. Tiến hành cuộn để tải thêm...");
                
                let dialog = document.querySelector('div[role="dialog"]');
                if (dialog) {
                    let scrollableNodes = Array.from(dialog.querySelectorAll('*')).filter(
                        el => getComputedStyle(el).overflowY === 'auto' || getComputedStyle(el).overflowY === 'scroll'
                    );
                    
                    if (scrollableNodes.length > 0) {
                        scrollableNodes[0].scrollTop = scrollableNodes[0].scrollHeight;
                    } else {
                        dialog.scrollTop = dialog.scrollHeight;
                    }
                } else {
                    window.scrollBy(0, 1000);
                }
                
                await delay(2000); 
                
                unselectedBoxes = document.querySelectorAll('div[role="checkbox"][aria-checked="false"]');
                
                if (unselectedBoxes.length === 0) {
                    console.log("%c[System] Không tìm thấy thêm bạn bè nào. Đã chạm đáy danh sách.", "color: orange; font-weight: bold;");
                    break;
                }
            }

            for (let box of unselectedBoxes) {
                box.click();
                totalSelected++;
                console.log(`Đã chọn: ${totalSelected} người...`);
                
                await delay(Math.floor(Math.random() * 400) + 300);
            }
        }
        
        console.log(`%c[System] Hoàn tất! Đã tự động chọn tổng cộng ${totalSelected} bạn bè.`, "color: green; font-size: 16px; font-weight: bold;");
        console.log("%c[Lưu ý] Vui lòng kiểm tra lại giao diện và TỰ BẤM NÚT GỬI LỜI MỜI.", "color: red; font-size: 14px;");
        
        alert(`Hoàn tất! Đã chọn tự động ${totalSelected} bạn bè.\nHãy tự tay bấm nút gửi lời mời ở góc dưới.`);
        
        // Reset trạng thái để có thể chạy lại nếu cần
        window.fbInviterRunning = undefined;
    })();
} else {
    console.log("Công cụ đã đang chạy rồi. Vui lòng chờ nó hoàn thành hoặc tải lại trang (F5).");
}
