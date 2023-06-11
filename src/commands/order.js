import { SlashCommandBuilder } from '@discordjs/builders';

const orderCommand = new SlashCommandBuilder()
    .setName('order')
    .setDescription('Order your favorite meal!')
    .addStringOption((option) =>
        option
            .setName('food')
            .setDescription('Select your favorite food')
            .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName('drink')
            .setDescription('Select your favorite drink')
            .setRequired(true)
    );

export default orderCommand.toJSON();