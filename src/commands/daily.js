import { SlashCommandBuilder } from '@discordjs/builders';

const dailyCommand = new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Take daily reward!')

export default dailyCommand.toJSON();