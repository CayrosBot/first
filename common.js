document.addEventListener("DOMContentLoaded", function () {
    // Скрываем содержимое страницы до проверки
    document.body.style.visibility = "hidden";

    // Отложенная проверка на наличие Telegram.WebApp
    setTimeout(function () {
        if (isInTelegramWebApp()) {
            // Если всё в порядке, показываем содержимое страницы
            document.body.style.visibility = "visible";
            console.log("Приложение успешно запущено из Telegram.");
        } else {
            // Если проверка не прошла, показываем сообщение об ошибке
            document.body.innerHTML = `
                <div style="text-align:center; margin-top:50px;">
                    <h2>Ошибка!</h2>
                    <p>Это приложение можно запускать только из Telegram.</p>
                    <button class="telegram-button" onclick="goToBot()">Перейти в бот</button>
                </div>
            `;
            document.body.style.visibility = "visible";
        }
    }, 3000); // Увеличили задержку до 3 секунд для надежности
});

// Функция для проверки, запущено ли приложение через Telegram
function isInTelegramWebApp() {
    return window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData;
}

// Функция для возврата в бот
function goToBot() {
    if (window.Telegram && window.Telegram.WebApp) {
        // Закрываем Web App, если оно было запущено через Telegram
        window.Telegram.WebApp.close();
    } else {
        // Переходим в бот через ссылку
        const telegramLink = "https://t.me/CayrosExchangeP2PBot"; // Замените на имя вашего бота
        if (isMobileDevice()) {
            // На мобильных устройствах используем специальную ссылку
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
