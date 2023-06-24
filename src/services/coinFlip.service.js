import User from '../model/user.js'

export default async function coinFlip(message) {
    const user = await User.findOne({ discordId: message.author.id })
    const sender = message.author.username;

    if (!user) {
        await User.create({ discordId: message.author.id });


    } else {
        const amount = message.content.split(' ')[2];

        if (amount > user.coin || user.coin == 0) {
            return message.channel.send(`**${sender}** You don't have enough coin!`);
        } else if (amount == 'all') {
            const random = Math.floor(Math.random() * 2);

            if (random == 1) {
                let tempCoin = user.coin;

                user.coin += user.coin;
                await user.save();
                return message.channel.send('Coin is flipping...')
                    .then(sentMessage => {
                        setTimeout(() => {
                            sentMessage.edit(`**${sender}** You won ${tempCoin} coin!`);
                        }, 3000);
                    });
            } else {
                let tempCoin = user.coin;

                user.coin -= user.coin;
                await user.save();
                return message.channel.send('Coin is flipping...')
                    .then(sentMessage => {
                        setTimeout(() => {
                            sentMessage.edit(`**${sender}** You lost ${tempCoin} coin!`);
                        }, 3000);
                    });
            }
        }
        else {
            let intAmount = parseInt(amount);
            if (intAmount == NaN) {
                return message.channel.send('Coin is flipping...')
                    .then(sentMessage => {
                        setTimeout(() => {
                            sentMessage.edit(`**${sender}** Please enter a valid number!`);
                        }, 3000);
                    });
            } else {
                const random = Math.floor(Math.random() * 2);

                if (random == 1) {
                    user.coin += intAmount;
                    await user.save();
                    return message.channel.send('Coin is flipping...')
                        .then(sentMessage => {
                            setTimeout(() => {
                                sentMessage.edit(`**${sender}** You won ${intAmount} coin!`);
                            }, 3000);
                        });
                } else {
                    user.coin -= intAmount;
                    await user.save();
                    return message.channel.send('Coin is flipping...')
                        .then(sentMessage => {
                            setTimeout(() => {
                                sentMessage.edit(`**${sender}** You lost ${intAmount} coin!`);
                            }, 3000);
                        });
                }
            }
        }

    }
}