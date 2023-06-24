import User from '../model/user.js'

export default async function cash(message) {
    const user = await User.findOne({ discordId: message.author.id })
    const sender = message.author.username;

    if (!user) {
        await User.create({ discordId: message.author.id });

        return message.reply({
            content: `**${sender}** Your total cash is 0.`
        });
    } else {
        return message.reply({
            content: `**${sender}** Your total cash is ${user.coin}`
        });
    }
}