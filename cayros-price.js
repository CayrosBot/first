// ====== Конфигурация ======
const POOL_ID = "6AvMUjDypofK8nw5Ez13qwFswJkLKomKTzX95ZWd682n";
const SPREAD_PERCENT = 25; // 25% спред между покупкой и продажей

// ====== Основная функция ======
async function getCayrosRates() {
  try {
    // 1. Получаем цену CAYROS в USDT из Raydium
    const poolResponse = await fetch(
      `https://api-v3.raydium.io/pools/info/ids?ids=${POOL_ID}`
    );
    const poolData = await poolResponse.json();

    if (!poolData.success || !poolData.data[0]) {
      throw new Error("Ошибка: пул CAYROS не найден");
    }

    const cayrosUsdt = poolData.data[0].price;

    // 2. Получаем курс USDT/RUB из CoinGecko
    const rubResponse = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=rub"
    );
    const rubData = await rubResponse.json();
    const usdtRub = rubData.tether?.rub;

    if (!usdtRub) {
      throw new Error("Ошибка: не удалось получить курс USDT/RUB");
    }

    // 3. Рассчитываем курсы
    const baseRateRub = cayrosUsdt * usdtRub;
    const buyRate = baseRateRub * 1.25;  // +25%
    const sellRate = baseRateRub * 0.75; // -25%

    return {
      base: baseRateRub.toFixed(2),
      buy: buyRate.toFixed(2),
      sell: sellRate.toFixed(2),
      updated: new Date().toLocaleTimeString()
    };

  } catch (error) {
    console.error("Ошибка при получении курса:", error);
    return {
      base: "N/A",
      buy: "N/A",
      sell: "N/A",
      updated: "Ошибка"
    };
  }
}

// ====== Экспорт для других страниц ======
// Вариант 1: Веб-страницы могут вызывать getCayrosRates() напрямую
// Вариант 2: Автоматическое обновление каждые 30 секунд
let currentRates = { base: "Загрузка...", buy: "Загрузка...", sell: "Загрузка..." };

async function updateRates() {
  currentRates = await getCayrosRates();
  console.log("Курсы обновлены:", currentRates);
}

updateRates();
setInterval(updateRates, 30000); // Обновление каждые 30 сек

// Делаем переменную доступной глобально
window.CayrosRates = {
  get: getCayrosRates,
  current: currentRates
};