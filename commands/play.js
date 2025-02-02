const fs = require("fs");
const sox = require("sox-stream");


const { PassThrough, Writable } = require('stream')

module.exports.run = async (client, message, args) => {

    const voicechannel = message.member.voice.channel;
    if (!voicechannel) return message.channel.send("Please join a voice channel!");

    if (!fs.existsSync(`./recorded-${message.author.id}.pcm`)) return message.channel.send("Your audio is not recorded!");

    const connection = await message.member.voice.channel.join();
    //const Rstream = fs.createReadStream(`./recorded-${message.author.id}.pcm`);

    const output = fs.createReadStream(`./recorded-${message.author.id}.pcm`);

    const dispatcher = connection.play(output, {
        type: "converted"
    });

    dispatcher.on("finish", () => {
        message.member.voice.channel.leave();
        return message.channel.send("finished playing audio");
    })
}

module.exports.help = {
    name: "play"
};