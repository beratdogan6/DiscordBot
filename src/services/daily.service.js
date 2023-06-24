import User from '../model/user.js'

export default async function dailyReward(message) {
    const user = await User.findOne({ discordId: message.author.id });
    const sender = message.author.username;

    if (!user) {
        await User.create({ discordId: message.author.id, coin: 500, dailyReward: true });
        return message.reply({
            content: `💰 | **${sender}** You have received your daily reward! \n💶 | Here is your 500 Coin!`
        });
    } else {
        if (user.dailyReward) {
            return message.reply({
                content: `**${sender}** You have already taken your daily reward!`
            });
        } else {
            user.coin += 500;
            user.dailyReward = true;
            await user.save();
            return message.reply({
                content: `💰 | **${sender}** You have received your daily reward! \n💶 | Here is your 500 Coin!`
            });
        }
    }
}