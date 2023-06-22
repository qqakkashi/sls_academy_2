const TelegramBot = require("node-telegram-bot-api");
const token = process.env["TELEGRAM_BOT_TOKEN"];
const bot = new TelegramBot(token, { polling: true });
const weatherApi = require("./src/weather");
console.log(process.env["TELEGRAM_BOT_TOKEN"]);

// start command input handler
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_markup: {
      resize_keyboard: true,
      keyboard: [
        [
          { text: "at intervals of 3 hours", callback_data: "3" },
          { text: "at intervals of 6 hours", callback_data: "6" },
        ],
      ],
    },
  };
  bot.sendMessage(chatId, "Select forecast interval:", opts);
});

// user select handler
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const interval = msg.text.slice(16).slice(0, -6);

  if (interval === "3" || interval === "6") {
    weatherApi.getWeatherData(+interval).then((result) => {
      bot.sendMessage(chatId, result).then(() => {
        bot.deleteMessage(chatId, msg.message_id);
      });
    });
  }
});
