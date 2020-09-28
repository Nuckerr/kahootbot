const botConfig = require("./config.json");
const settings = require("./settings.json");
const Discord = require("discord.js");
var Kahoot = require("kahoot.js-updated");
var cluster = require('cluster');
var user = new Kahoot();

const bot = new Discord.Client();
bot.on("ready", async () => {
    console.log("Bot is now online");
    bot.user.setActivity("Flooding kahoot games");
});
bot.on("message", async message => {
    let prefix = botConfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0]
    let args = messageArray.slice(1);

    if(cmd == `${prefix}flood`) {
        console.log("Joining...")
        var i;
            for (var i = 0; i < settings.amount; i += 1) {
                console.log("Joining kahoot...  ");
                user.join(pin, "bot-"+i);
            }   
        return message.channel.send("**Flooding**");
    }
});
    user.on("joined", () => {
        console.log("I joined the Kahoot!");
    });

bot.login(botConfig.token);