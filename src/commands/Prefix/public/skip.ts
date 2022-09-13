import { EmbedBuilder } from "discord.js";
import { Queue } from "distube";
import { Command } from "../../../structures/Command";

export default new Command({
    name: "skip",
    description: "Salta la canción a la siguiente en la lista.",
    cooldown: 3,
    aliases: ["skp"],
    enabled: true,
    channelOnly: true,
    sameChannel: true,
    checkQueue: true,
    djOnly: true,
    async run(bot, msg) {
	try {
	    const queue: Queue | undefined = bot.distube.getQueue(msg.guildId!);
            
            if (queue?.songs.length === 1) await queue?.stop().catch(err => { console.error(err); msg.channel.send(`${bot.getEmoji("warning")} Ocurrió un error al intentar saltar la canción`); });
            else await queue?.skip().catch(err => { console.error(err); msg.channel.send(`${bot.getEmoji("warning")} Ocurrió un error al intentar saltar la canción`); });

            return msg.reply(`${bot.getEmoji("check")} La canción acaba de ser saltada a la siguiente en la lista.`);
	} catch (error) {
	    console.error(error);
	    bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
	}
    }
});
