import { EmbedBuilder } from "discord.js";
import { Queue } from "distube";
import { Command } from "../../../structures/Command";

export default new Command({
    name: "pause",
    description: "Pausa la canción que está sonando.",
    cooldown: 3,
    aliases: ["ps"],
    enabled: true,
    channelOnly: true,
    sameChannel: true,
    checkQueue: true,
    djOnly: true,
    run(bot, msg, args, prefix) {
	try {
	    const queue: Queue | undefined = bot.distube.getQueue(msg.guildId!);

            if (queue?.paused) return msg.reply(`${bot.getEmoji("error")} La canción **${queue.songs[0].name}** ya estaba pausada anteriormente.`);
            queue?.pause();
            
            return msg.reply(`${bot.getEmoji("check")} La canción **${queue?.songs[0].name}** (${queue?.songs[0].formattedDuration}) fue pausada. Para continuar escuchando la canción, haga uso del comando ${prefix}resume`);
	} catch (error) {
	    console.error(error);
	    bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
	}
    }
});
