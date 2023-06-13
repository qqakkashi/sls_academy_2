const TelegramBot = require("node-telegram-bot-api");

const token = "6221661724:AAHV8oX01yDpozDm5HHMrJt_U3CzOb8eYrk";

const bot = new TelegramBot(token, { polling: true });

module.exports = bot;
