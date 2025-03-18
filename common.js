document.addEventListener("DOMContentLoaded", function () {
    // Если объект Telegram.WebApp отсутствует, показываем сообщение и блокируем доступ
    if (!window.Telegram || !window.Telegram.WebApp) {
        // Скрываем всё содержимое страницы
        document.body.innerHTML = `
            <div style="text-align:center; margin-top:50px;">
                <h2>Ошибка!</h2>
                <p>Это приложение можно запускать только из Telegram.</p>
                <button onclick="goToBot()">Вернуться в бот</button>
            </div>
        `;
        // Функция для перенаправления в бот
        function goToBot() {
            window.location.href = "https://t.me/CayrosExchangeP2PBot"; // Замените YourBotName на имя вашего бота
        }
    } else {
        console.log("Приложение успешно запущено из Telegram.");
    }
});
