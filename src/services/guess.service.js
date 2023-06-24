import User from '../model/user.js'

export default async function guess(message) {
    const sender = message.author.username;

    message.channel.send(`**${sender}** 1 ile 10 arasında bir sayı tuttum bilmeye çalış!`);

    const filter = m => !isNaN(m.content) && m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector({ filter, max: 1, time: 10000 });

    collector.on('collect', m => {
        const guessedNumber = parseInt(m.content);
        const randomNumber = Math.floor(Math.random() * 10) + 1;

        if (guessedNumber === randomNumber) {
            message.channel.send(`**${sender}** Doğru bildinn :partying_face: `);
        } else {
            message.channel.send(`**${sender}** Ahh beeee, ${randomNumber} olması lazımdı. Bir dahaki sefere :pensive: `);
        }
    });

    collector.on('end', collected => {
        if (collected.size === 0) {
            message.channel.send(`**${sender}** Time\'s up! You didn\'t provide a valid number.`);
        }
    });
}