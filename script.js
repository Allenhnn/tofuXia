document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('scan-progress');
    const progressText = document.getElementById('progress-text');
    const dataFeed = document.getElementById('data-feed');
    const alertButton = document.getElementById('alert-button');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');

    let progress = 0;
    const progressInterval = 100; // 每 100 毫秒更新一次

    // 隨機數據消息
    const messages = [
        "INIT: Protocol 3-Delta activated...",
        "STATUS: System integrity check [FAIL]",
        "LOG: Unauthorized memory access detected. [CODE: 0xDEADBEEF]",
        "SCAN: Scanning file system... (C:\\Windows\\System32\\config\\)",
        "ALERT: Elevated privilege request blocked.",
        "DATA: Transmitting encrypted payload to host. (192.168.1.105)",
        "ERROR: Critical thread terminated unexpectedly. [PID: 404]",
        "WARNING: Resource utilization at 98%. System lag detected."
    ];

    // 模擬進度條跳動
    const updateProgress = () => {
        if (progress < 100) {
            // 每次隨機增加 1 到 5 的進度，營造不穩定的感覺
            progress += Math.floor(Math.random() * 5) + 1;
            if (progress > 100) progress = 100;

            progressBar.style.width = progress + '%';
            progressText.textContent = `正在執行緊急協議 (${progress}%)`;

            // 隨機在進度條更新時添加一行數據
            if (Math.random() < 0.6) {
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                addDataFeedLine(randomMessage);
            }

        } else {
            // 進度完成後的最終狀態
            clearInterval(progressTimer);
            progressText.textContent = `分析完成。需要立即處理！`;
            progressBar.style.backgroundColor = '#00ff41'; // 轉為綠色，但內容仍具警示性
            addDataFeedLine("FINAL: System analysis complete. Require IMMEDIATE human intervention.", true);
        }
    };

    const progressTimer = setInterval(updateProgress, progressInterval);

    // 添加數據流線路
    const addDataFeedLine = (text, isCritical = false) => {
        const line = document.createElement('p');
        line.textContent = `> ${new Date().toLocaleTimeString()} ${text}`;
        
        if (isCritical) {
            line.style.color = '#ff0000'; // 關鍵訊息用紅色
            line.style.fontWeight = 'bold';
        }

        dataFeed.appendChild(line);
        // 自動滾動到底部
        dataFeed.scrollTop = dataFeed.scrollHeight;
    };

    // 彈出模態框事件
    alertButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // 關閉模態框事件
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // 點擊背景也關閉模態框
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 初始載入時添加一些數據
    addDataFeedLine("Initializing Security Analysis Module...", true);
    addDataFeedLine("Attempting connection to remote log server...", false);
});