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
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(4).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        switch (command) {
            case 'ping':
                message.reply('Pong!');
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