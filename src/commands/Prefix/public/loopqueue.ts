import { EmbedBuilder } from "discord.js";
import { Queue } from "distube";
import { Command } from "../../../structures/Command";

export default new Command({
    name: "loopqueue",
    description: "Activa o desactiva la repetición de la lista de canciones.",
    cooldown: 3,
    aliases: ["lq"],
    enabled: true,
    channelOnly: true,
    sameChannel: true,
    checkQueue: true,
    djOnly: true,
    run(bot, msg) {
	try {
	    const queue: Queue | undefined = bot.distube.getQueue(msg.guildId!);

            if (queue?.repeatMode === 2) bot.distube.setRepeatMode(msg, 0);
            else bot.distube.setRepeatMode(msg, 2);

            return msg.reply(`${bot.getEmoji("check")} Bien, la repetición de la lista ha sido ${queue?.repeatMode === 2 ? 'activado' : 'desactivado'}.`);
	} catch (error) {
	    console.error(error);
	    bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
	}
    }
});
