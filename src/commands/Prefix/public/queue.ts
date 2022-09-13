import { EmbedBuilder } from "discord.js";
import { Queue } from "distube";
import { Command } from "../../../structures/Command";
import { DJBotEmbed } from "../../../structures/DJBotEmbed";

export default new Command({
    name: "queue",
    description: "Muestra la lista de canciones.",
    cooldown: 3,
    aliases: ["q"],
    enabled: true,
    checkQueue: true,
    run(bot, msg) {
	try {
	    const queue: Queue | undefined = bot.distube.getQueue(msg.guildId!);
            const embed: DJBotEmbed = new DJBotEmbed(msg.author, msg.guild!, { footer: { text: queue!.songs.length > 1 ? `${queue?.songs.length} canciones en total.` : `${queue?.songs.length} canción en total.` } });

            embed.setTitle(`Lista de ${msg.guild?.name}`)
            embed.setThumbnail(queue?.songs[0].thumbnail || null)
            embed.setDescription(queue?.songs.map((song, i) => `**${i + 1}.** - [${song.name}](${song.url}) | \`(${song.formattedDuration})\``).join('\n').substring(0, 3000) || "Información no disponible.");

            return msg.reply({ embeds: [embed] });
	} catch (error) {
	    console.error(error);
	    bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
	}
    }
});
