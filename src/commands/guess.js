import { SlashCommandBuilder } from '@discordjs/builders';

const guessCommand = new SlashCommandBuilder()
    .setName('guess')
    .setDescription('Guess the number')
    .addStringOption((option) =>
        option
            .setName('number')
            .setDescription('Enter a number between 1 and 10')
            .setRequired(true)
    )

export default guessCommand.toJSON();