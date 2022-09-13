import { EmbedBuilder } from "discord.js";
import { Queue } from "distube";
import { Command } from "../../../structures/Command";

export default new Command({
    name: "seek",
    description: "Adelanta o atrasa una canción a un segundo específico.",
    usage: "<número en segundos>",
    cooldown: 3,
    aliases: ["sk"],
    enabled: true,
    channelOnly: true,
    sameChannel: true,
    checkQueue: true,
    djOnly: true,
    run(bot, msg, args) {
	try {
	    if (!args![1]) return msg.reply(`${bot.getEmoji("noargs")} Escribe el segundo al que quieres mover la canción.`);
            if (isNaN(parseInt(args![1]))) return msg.reply(`${bot.getEmoji("error")} El argumento **${args![1]}** debe ser un número.`);
        
            const queue: Queue | undefined = bot.distube.getQueue(msg.guildId!);

            if (queue?.songs[0].isLive) return msg.reply(`${bot.getEmoji("error")} No puedo adelantar o atrasar transmisiones en vivo.`);
            if (parseInt(args![1]) > queue!.songs[0].duration) return msg.reply(`${bot.getEmoji("error")} No puedo adelantar la canción a más de **${queue?.songs[0].duration}** segundos.`);

            bot.distube.seek(msg, parseInt(args![1]));
            return msg.reply(`${bot.getEmoji("check")} La canción **${queue?.songs[0].name}** acaba de ser movida al segundo ${parseInt(args![1])}.`)
	} catch (error) {
	    console.error(error);
	    bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
	}
    }
});
