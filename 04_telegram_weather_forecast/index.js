const TelegramBot = require("node-telegram-bot-api");
const token = process.env["TELEGRAM_BOT_TOKEN"];
const bot = new TelegramBot(token, { polling: true });
const weatherApi = require("./src/weather");

// start command input handler
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const opts = {
    // convenient appearance of buttons for interaction
    reply_markup: {
      inline_keyboard: [
        [{ text: "at intervals of 3 hours", callback_data: "3" }],
        [{ text: "at intervals of 6 hours", callback_data: "6" }],
      ],
    },
  };
  bot.sendMessage(chatId, "Select forecast interval:", opts);
});

// user select handler
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const interval = query.data;

  if (interval === "3") {
    const weather = weatherApi
      .getWeatherData(+interval)
      .then((result) => bot.sendMessage(chatId, result));
  } else if (interval === "6") {
    const weather = weatherApi
      .getWeatherData(+interval)
      .then((result) => bot.sendMessage(chatId, result));
  }
});
