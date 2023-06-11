import User from '../model/user.js'

export default async function register(interaction) {
    const user = await User.findOne({ discordId: interaction.user.id });
    if (!user) {
        try {
            await User.create({ discordId: interaction.user.id });
            return interaction.reply({
                content: 'You successfully registered your account!'
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        return interaction.reply({
            content: 'You already registered your account!'
        });
    }
}