document.addEventListener("DOMContentLoaded", function () {
    // Проверяем, запущено ли приложение через Telegram
    if (isInTelegramWebApp()) {
        console.log("Приложение успешно запущено из Telegram.");
    } else {
        // Если проверка не прошла, показываем сообщение об ошибке
        document.body.innerHTML = `
            <div style="text-align:center; margin-top:50px;">
                <h2>Ошибка!</h2>
                <p>Это приложение можно запускать только из Telegram.</p>
                <button onclick="goToBot()">Вернуться в бот</button>
            </div>
        `;
    }
});

// Функция для проверки, запущено ли приложение через Telegram
function isInTelegramWebApp() {
    return window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData;
}

// Функция для возврата в бот
function goToBot() {
    // Если приложение запущено через Telegram, используем метод close()
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.close();
    } else {
        // Если приложение открыто через браузер, используем универсальную ссылку
        const telegramLink = "https://t.me/CayrosExchangeP2PBot"; // Замените YourBotName на имя вашего бота
        if (isMobileDevice()) {
            // На мобильных устройствах лучше использовать tg:// ссылку
            window.location.href = "tg://resolve?domain=CayrosExchangeP2PBot";
        } else {
            // На десктопах используем обычную ссылку
            window.location.href = telegramLink;
        }
    }
}

// Функция для проверки, является ли устройство мобильным
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
