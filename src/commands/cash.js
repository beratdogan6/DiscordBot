import { SlashCommandBuilder } from '@discordjs/builders';

const cashCommand = new SlashCommandBuilder()
    .setName('cash')
    .setDescription('Shows your cash')

export default cashCommand.toJSON();