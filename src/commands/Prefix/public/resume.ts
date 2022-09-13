import { EmbedBuilder } from "discord.js";
import { Queue } from "distube";
import { Command } from "../../../structures/Command";

export default new Command({
    name: "resume",
    description: "Continua reproduciendo la canción que estaba sonando.",
    cooldown: 3,
    aliases: ["rsm"],
    enabled: true,
    channelOnly: true,
    sameChannel: true,
    checkQueue: true,
    djOnly: true,
    run(bot, msg) {
	try {
	    const queue: Queue | undefined = bot.distube.getQueue(msg.guildId!);

            if (queue?.playing) return msg.reply(`${bot.getEmoji("check")} La canción **${queue?.songs[0].name}** ya estaba sonando anteriormente.`);
            queue?.resume();
            
            return msg.reply(`${bot.getEmoji("check")} La canción **${queue?.songs[0].name}** ha sido continuada.`);
	} catch (error) {
	    console.error(error);
	    bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
	}
    }
});
