import User from '../model/user.js'

export default async function dailyReward(interaction) {
    const user = await User.findOne({ discordId: interaction.user.id });
    console.log(user);
    if (!user) {
        return interaction.reply({
            content: 'You are not registered in the database!'
        });
    }
    if (user.dailyReward) {
        return interaction.reply({
            content: 'You have already taken your daily reward!'
        });
    }
    user.coin += 500;
    user.dailyReward = true;
    await user.save();
    return interaction.reply({
        content: 'You have received your daily reward!'
    });
}