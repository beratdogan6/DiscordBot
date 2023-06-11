import { SlashCommandBuilder } from '@discordjs/builders';

const registerCommand = new SlashCommandBuilder()
    .setName('register')
    .setDescription('Register your account')

export default registerCommand.toJSON();