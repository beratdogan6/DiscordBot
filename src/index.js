import { config } from 'dotenv'
import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest'
import mongoose from 'mongoose'
import { dailyCommand, orderCommand, registerCommand, cashCommand } from './commands/index.js'
import { dailyReward, register, cash } from './services/index.js'
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

const rest = new REST({ version: '10' }).setToken(TOKEN)

client.login(TOKEN)

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

    console.log(users);

    console.log(`${client.user.tag} has logged in! 🤖`);
})

// on message function
client.on('messageCreate', (message) => {
    let formattedTimestamp = formatTimeStamp(message.createdTimestamp)
    // console.log(message);
    // console.log(`Message: ${message.content} \nSender: ${message.author.username}#${message.author.discriminator} \nTime: ${formattedTimestamp}`);
})

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        switch (interaction.commandName) {
            case 'order':
                interaction.reply({
                    content: `You ordered ${interaction.options.get('food').value} and ${interaction.options.get('drink').value}`
                })
                break;
            case 'daily':
                dailyReward(interaction);
                break;
            case 'register':
                register(interaction);
                break;
            case 'cash':
                console.log(interaction.user.id);
                cash(interaction);
                break;
        }
    }
})

// slash commands
async function main() {
    const commands = [
        orderCommand,
        dailyCommand,
        registerCommand,
        cashCommand
    ];

    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
        })
    } catch (err) {
        console.log(err);
    }
}

main();