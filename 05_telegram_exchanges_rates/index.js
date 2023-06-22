const TelegramBot = require("node-telegram-bot-api");
const token = process.env["TELEGRAM_BOT_TOKEN"];
const bot = new TelegramBot(token, { polling: true });
const currencyApi = require("./src/currency");

// const currency = currencyApi.getCurrenctValues();
// console.log(currency);

// start command input handler
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_markup: {
      resize_keyboard: true,
      keyboard: [[{ text: "USD" }, { text: "EUR" }]],
    },
  };
  bot.sendMessage(chatId, "Select currency: ", opts);
});

// user select handler
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const currency = msg.text;

  if (currency === "EUR") {
    currencyApi.getCurrenctValuesMonobank(978).then((result) => {
      const messageAboutCurrency = `\nBank: monobank\nCurrency:  ${currency}\nBuy: ${result.rateBuy}\nSell: ${result.rateSell}\n`;
      bot.sendMessage(chatId, messageAboutCurrency);
    });

    currencyApi.getCurrenctValuesPrivatBank(currency).then((result) => {
      const messageAboutCurrency = `\nBank: privatbank\nCurrency: ${currency}\nBuy: ${result.buy}\nSell: ${result.sale}\nVariant: non-cash rate\n`;
      bot.sendMessage(chatId, messageAboutCurrency);
    });

    currencyApi.getCurrenctValuesPrivatBank(currency, "cash").then((result) => {
      const messageAboutCurrency = `\nBank: privatbank\nCurrency: ${currency}\nBuy: ${result.buy}\nSell: ${result.sale}\nVariant: cash rate\n`;
      bot.sendMessage(chatId, messageAboutCurrency);
    });
  } else if (currency === "USD") {
    currencyApi.getCurrenctValuesMonobank(840).then((result) => {
      const messageAboutCurrency = `\nBank: monobank\nCurrency:  ${currency}\nBuy: ${result.rateBuy}\nSell: ${result.rateSell}\n`;

      bot.sendMessage(chatId, messageAboutCurrency);
    });

    currencyApi.getCurrenctValuesPrivatBank(currency).then((result) => {
      const messageAboutCurrency = `\nBank: privatbank\nCurrency: ${currency}\nBuy: ${result.buy}\nSell: ${result.sale}\nVariant: non-cash rate\n`;
      bot.sendMessage(chatId, messageAboutCurrency);
    });

    currencyApi.getCurrenctValuesPrivatBank(currency, "cash").then((result) => {
      const messageAboutCurrency = `\nBank: privatbank\nCurrency: ${currency}\nBuy: ${result.buy}\nSell: ${result.sale}\nVariant: cash rate\n`;
      bot.sendMessage(chatId, messageAboutCurrency);
    });
  } else {
    bot.sendMessage(chatId, "Wrong currency option");
  }
});
