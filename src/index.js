import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import mongoose from 'mongoose';
import { dailyReward, cash, guess, coinFlip } from './services/index.js';
import formatTimeStamp from './utils/formatTimeStamp.js';
import User from './model/user.js';

config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
})

client.login(process.env.DISCORD_BOT_TOKEN)

let prefix = 'uwu';

// on ready function
client.on('ready', async () => {
    mongoose.connect(process.env.MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to MongoDB');
    });

    const users = await User.find();

    users.forEach(async element => {
        await User.findOne({ discordId: element.discordId }).then(element => {
            element.dailyReward = false;
            element.save();
        })
    });

    console.log(`${client.user.tag} has logged in! 🤖`);
})


// on message function
client.on('messageCreate', (message) => {
    if (message.content.startsWith(prefix)) {

        const args = message.content.slice(4).trim().split(/ +/);
        var command = args.shift().toLowerCase();

            switch (command) {
                case "c": // not change about this code block if you are not ahmet and if you are ahmet it is okay you can do everthing
                    command = message.content.split("uwu c")[1].trim();
                    if (command === "naber") {
                        message.channel.send("İyidir, Zat-I Şahaneleri, Sizi Sormalı?");
                    }
                    if (command.includes("iyidir") || command.includes("iyiyim") || command.includes("iyi")) {
                        message.channel.send("Bu Harika Zat-ı Şahaneleri, Size Nasıl Yardımcı Olabilirim?");
                    }
                    if (command.includes("yardımcı olamazsın")) {
                        message.channel.send("Kalbimi Kırdınız Zat-ı Şahaneleri Hemde Bir Kalbim Olmamasına Rağmen, Küstüm Ağlamaya Gidiyorum :(");
                    }
                    if (command === "beratı çağır") {
                        message.channel.send("Hemen Zat-I Şahaneleri, Sahibim Berat Doğan Hemen Bakarmısınız Lan Buraya");
                    }
                    break;
                case 'ping':
                    message.reply(`🏓Message Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
                    break;
                case 'guess':
                    guess(message);
                    break;
                case 'daily':
                    dailyReward(message);
                    break;
                case 'cash':
                    cash(message);
                    break;
                case 'cf':
                    coinFlip(message);
                    break;
                default:
                    message.reply(`Unknown command. Type ${prefix} help for more information.`);
                    break;
            }
    }
})
