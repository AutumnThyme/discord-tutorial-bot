module.exports.run = (client, message, args) => {
    return message.channel.send("$m");
}

module.exports.help = {
    name: "roll"
};