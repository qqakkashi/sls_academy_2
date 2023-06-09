const { Command } = require("commander");
const program = new Command();
const bot = require("./src/telegram-bot");
// solve the error Error 504 EPARSE: Error parsing response by adding this variable to the env
process.env["NTBA_FIX_350"] = 1;

// get chat_id from env
const chat_id = process.env["CHAT_ID"];

program.version("1.0");

// command for send messages
program
  .command("message")
  .argument("<message>")
  .description("Send message to Telegram Bot")
  .alias("m")
  .action(async (msg) => {
    await bot.sendMessage(chat_id, msg);
    process.exit();
  });

// command for send photos
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

// parsing argv
program.parse();
