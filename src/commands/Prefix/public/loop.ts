import { EmbedBuilder } from "discord.js";
import { Queue } from "distube";
import { Command } from "../../../structures/Command";

export default new Command({
    name: "loop",
    description: "Activa o desactiva la repetición de la canción que está sonando.",
    cooldown: 3,
    enabled: true,
    channelOnly: true,
    sameChannel: true,
    checkQueue: true,
    djOnly: true,
    run(bot, msg) {
	try {
	    const queue: Queue | undefined = bot.distube.getQueue(msg.guildId!);

            if (queue?.repeatMode === 0) bot.distube.setRepeatMode(msg.guildId!, 1);
            else bot.distube.setRepeatMode(msg.guildId!, 0);

            return msg.reply(`${bot.getEmoji("check")} Bien, a partir de ahora la canción **${queue?.songs[0].name}** (${queue?.songs[0].formattedDuration}) ${queue?.repeatMode === 1 ? 'se repetirá' : 'no se repetirá'}.`);
	} catch (error) {
	    console.error(error);
	    bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
	}
    }
});
