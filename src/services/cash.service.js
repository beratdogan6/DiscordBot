import User from '../model/user.js'

export default async function cash(interaction) {
    const user = await User.findOne({ discordId: interaction.user.id })
    if (!user) {
        return interaction.reply({
            content: 'You are not registered in the database!'
        });
    } else {
        return interaction.reply({
            content: `Your total cash is ${user.coin}`
        });
    }
}