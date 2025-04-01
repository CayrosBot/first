// ====== Конфигурация ======
const POOL_ID = "6AvMUjDypofK8nw5Ez13qwFswJkLKomKTzX95ZWd682n";
const SPREAD_PERCENT = 25; // 25% спред между покупкой и продажей

// Прокси-сервер для обхода CORS (используем бесплатный CORS Anywhere)
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

// ====== Основная функция ======
async function getCayrosRates() {
  try {
    // 1. Получаем цену CAYROS в USDT из Raydium через прокси
    const poolResponse = await fetch(
      `${CORS_PROXY}https://api-v3.raydium.io/pools/info/ids?ids=${POOL_ID}`
    );
    
    if (!poolResponse.ok) throw new Error("Ошибка запроса к Raydium API");
    
    const poolData = await poolResponse.json();

    if (!poolData.success || !poolData.data[0]) {
      throw new Error("Ошибка: пул CAYROS не найден");
    }

    const cayrosUsdt = poolData.data[0].price;

    // 2. Получаем курс USDT/RUB из CoinGecko через прокси
    const rubResponse = await fetch(
      `${CORS_PROXY}https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=rub`
    );
    
    if (!rubResponse.ok) throw new Error("Ошибка запроса к CoinGecko API");
    
    const rubData = await rubResponse.json();
    const usdtRub = rubData.tether?.rub;

    if (!usdtRub) {
      throw new Error("Ошибка: не удалось получить курс USDT/RUB");
    }

    // 3. Рассчитываем курсы
    const baseRateRub = cayrosUsdt * usdtRub;
    const buyRate = baseRateRub * (1 + SPREAD_PERCENT/100);
    const sellRate = baseRateRub * (1 - SPREAD_PERCENT/100);

    return {
      base: baseRateRub.toFixed(2),
      buy: buyRate.toFixed(2),
      sell: sellRate.toFixed(2),
      updated: new Date().toLocaleTimeString(),
      status: "success"
    };

  } catch (error) {
    console.error("Ошибка при получении курса:", error);
    return {
      base: "N/A",
      buy: "N/A",
      sell: "N/A",
      updated: "Ошибка",
      status: "error",
      message: error.message
    };
  }
}

// ====== Инициализация и обновление ======
let currentRates = { 
  base: "Загрузка...", 
  buy: "Загрузка...", 
  sell: "Загрузка...",
  status: "loading"
};

async function updateRates() {
  const newRates = await getCayrosRates();
  currentRates = {...newRates};
  
  // Обновляем UI если функция вызвана из index.html
  if (typeof updateUI === 'function') {
    updateUI(currentRates);
  }
  
  console.log("Курсы обновлены:", currentRates);
  return currentRates;
}

// Первоначальная загрузка
updateRates().catch(console.error);

// Периодическое обновление
const updateInterval = setInterval(updateRates, 30000);

// Экспорт для других страниц
window.CayrosRates = {
  get: getCayrosRates,
  current: currentRates,
  update: updateRates,
  stopUpdates: () => clearInterval(updateInterval)
};
