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
    }, 1000); // Увеличим задержку до 1 секунды
});

// Функция для проверки, запущено ли приложение через Telegram
function isInTelegramWebApp() {
    return window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData;
}

// Функция для возврата в бот
function goToBot() {
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.close();
    } else {
        const telegramLink = "https://t.me/CayrosExchangeP2PBot"; // Замените YourBotName на имя вашего бота
        if (isMobileDevice()) {
            window.location.href = "tg://resolve?domain=CayrosExchangeP2PBot";
        } else {
            window.location.href = telegramLink;
        }
    }
}

// Функция для проверки, является ли устройство мобильным
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
