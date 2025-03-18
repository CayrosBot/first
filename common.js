// Проверка на запуск приложения через Telegram Web App
document.addEventListener("DOMContentLoaded", function () {
    // Если объект Telegram.WebApp отсутствует, перенаправляем пользователя в бот
    if (!window.Telegram || !window.Telegram.WebApp) {
        alert("Это приложение можно запускать только из Telegram.");
        window.location.href = "https://t.me/CayrosExchangeP2PBot"; // Замените YourBotName на имя вашего бота
    } else {
        console.log("Приложение успешно запущено из Telegram.");
    }
});