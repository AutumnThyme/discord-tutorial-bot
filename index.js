const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

client.commands = new Discord.Collection();
client.cooldown = new Discord.Collection();
client.config = {
    TOKEN: "OTE1ODM4NDExNjc0MzYxODY2.Yaha_A.DPx8duPJLLhCC1tZnKJJH6eypjY", //Discord Bot Token
    prefix: ".",
    cooldown: 15000
};

// Load Commands
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        if (!f.endsWith(".js")) return;
        let command = require(`./commands/${f}`);
        client.commands.set(command.help.name, command);
    });
});

// Events
client.once("ready", () => {
    console.log("Ready!");
});

client.on("error", console.error);

client.on("warn", console.warn);


client.on("message", async (message) => {
    if (message.author.id == 'e250827017912713217') {
        if (message.attachments.size > 0) {
            message.delete();
            message.channel.send("bitch", {
                tts: true
               })
            if (message.attachments.every(attachIsImage)){
                //something
                
            }
        }
       
    }
    else if (message.author.id == 'e498696213860974593') {
        message.pin();
        message.channel.send("e", {
            tts: true
           })
    }
    else {
        if (!message.guild || message.author.bot) return;
        // Handle XP
        xp(message);
        // command handler
        if (!message.content.startsWith(client.config.prefix)) return;
        let args = message.content.slice(client.config.prefix.length).trim().split(" ");
        let command = args.shift().toLowerCase();
        let commandFile = client.commands.get(command);
        if (!commandFile) return;
        let api = null;
        commandFile.run(client, message, args, api);
    }
    
});

function xp(message) {
    if (!client.cooldown.has(`${message.author.id}`) || !(Date.now() - client.cooldown.get(`${message.author.id}`) > client.config.cooldown)) {
        client.cooldown.set(`${message.author.id}`, Date.now());
    }
}

client.login(client.config.TOKEN);


function attachIsImage(msgAttach) {
    var url = msgAttach.url;
    //True if this url is a png image.
    return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 || url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1;
}
