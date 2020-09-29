const botConfig = require("./config.json");
const settings = require("./settings.json");
const Discord = require("discord.js");
const Kahoot = require("kahoot.js-updated");
const client = new Kahoot();

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

    if(cmd == `${prefix}floodgame`) {
        if(args.length == 2) {
                let embed = new Discord.MessageEmbed();
                embed.setAuthor("Kahoot-Flooder", bot.user.avatarURL, "https://nucker.me/discord");
                embed.setTitle("Flooding info");
                embed.setDescription("This is the game I will be flooding.");
                embed.addField("Pin", args[0], false);
                embed.addField("Amount", args[1], false);
                embed.setColor("2C2F33");
                embed.setFooter("Kahoot-flooder made by Nucker", bot.user.avatarURL);
                embed.setTimestamp();

                message.channel.send(embed);
                for (var i = 0; i < parseInt(args[1]); i += 1) {
            new Kahoot().join(parseInt(args[0]), "bot-"+i).catch(err=> {
                console.log("Failed to join: " + err.description || err.status);
                message.channel.send("Unable to bot. Please make sure your using the right usage");
                message.channel.send(`${prefix}floodgame {pin} {amount}`);
            });
            }
        }else {
            message.channel.send(`${prefix}floodgame {pin} {amount}`);
        }
        return;
    } else if(cmd == `${prefix}help`) {
        message.channel.send("Only one command:P");
        return message.channel.send("`!floodgame {pin} {amount}`");
    }
});

bot.login(botConfig.token);