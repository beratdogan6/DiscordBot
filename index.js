import { config } from 'dotenv'
import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest'

config();

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.DISCORD_GUILD_ID;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
})

const rest = new REST({ version: '10' }).setToken(TOKEN)

client.login(TOKEN)

// on ready function
client.on('ready', () => {
    console.log(`${client.user.tag} has logged in! 🤖`);
})

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        console.log('Hello, World');
        interaction.reply({ content: 'Hello there!!!!' })
    }
})

// on message function
client.on('messageCreate', (message) => {
    if (message.content == 'hello') {
        console.log('doğru dedin');
    } else {
        console.log('yakışmadı!');
    }
})

// slash commands
async function main() {
    const commands = [
        {
            name: 'order',
            description: 'Order something...'
        }
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