const TelegramBot = require("node-telegram-bot-api");

// get token from env
const token = process.env["TELEGRAM_BOT_TOKEN"];

// instantiate the bot and tell it to run in polling mode
const bot = new TelegramBot(token, { polling: true });

module.exports = bot;
