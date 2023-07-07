import { config } from 'dotenv'
import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest'
import mongoose from 'mongoose'
import { dailyReward, cash, guess, coinFlip } from './services/index.js'
import formatTimeStamp from './utils/formatTimeStamp.js'
import User from './model/user.js'

config();

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.DISCORD_GUILD_ID;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
})

client.login(TOKEN)

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
    const berat = message.guild.members.cache.get('404923621862014977');
    if (!message.author.bot) {
        let msg = message.content
        if (msg === "naber") {
            message.channel.send("İyidir, Zat-I Şahaneleri, Sizi Sormalı?");
        }
        if (msg.includes("iyidir") || msg.includes("iyiyim") || msg.includes("iyi")) {
            message.channel.send("Bu Harika Zat-ı Şahaneleri, Size Nasıl Yardımcı Olabilirim?");
        }
        if (msg.includes("yardımcı olamazsın")) {
            message.channel.send("Kalbimi Kırdınız Zat-ı Şahaneleri Hemde Bir Kalbim Olmamasına Rağmen, Küstüm Ağlamaya Gidiyorum :(");
        }
        if (msg === "beratı çağır") {
            message.channel.send(`Hemen Zat-I Şahaneleri, Sahibim ${berat}, Hemen Bakarmısınız Lan Buraya`);
        }
    }
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(4).trim().split(/ +/);
        var command = args.shift().toLowerCase();

        switch (command) {
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