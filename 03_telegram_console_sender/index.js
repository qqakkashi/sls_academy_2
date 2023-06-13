const { Command } = require("commander");
const program = new Command();
const bot = require("./src/telegram-bot");
process.env["NTBA_FIX_350"] = 1;

const chat_id = "500264725";

program.version("1.0");

program
  .command("message")
  .argument("<message>")
  .description("Send message to Telegram Bot")
  .alias("m")
  .action(async (msg) => {
    await bot.sendMessage(chat_id, msg);
    process.exit();
  });

program
  .command("photo")
  .argument("<path>")
  .description(
    "Send photo to Telegram Bot. Just drag and drop it console after p-flag"
  )
  .alias("p")
  .action(async (path) => {
    await bot.sendPhoto(chat_id, path);
    process.exit();
  });

program.parse();
