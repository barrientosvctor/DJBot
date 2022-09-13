import { Command } from "../../../structures/Command";
import { DJBotEmbed } from "../../../structures/DJBotEmbed";
import { EmbedBuilder } from "discord.js";
import progressbar from "string-progressbar";
import { Queue } from "distube";

export default new Command({
    name: "nowplaying",
    description: "Muestra información de la música que está sonando.",
    cooldown: 3,
    aliases: ["now", "np"],
    enabled: true,
    checkQueue: true,
    run(bot, msg) {
	try {
	    const queue: Queue | undefined = bot.distube.getQueue(msg.guildId!);
            const embed: DJBotEmbed = new DJBotEmbed(msg.author, msg.guild!, {});

            embed.setTitle('Está sonando...')
            embed.setURL(queue?.songs[0].url || null)
            embed.setThumbnail(queue?.songs[0].thumbnail || null)
	    embed.setDescription(`${queue?.songs[0].name} (\`${queue?.songs[0].formattedDuration}\`)\nPedido por: ${queue?.songs[0].user}\n\n(*${queue?.formattedCurrentTime}/${queue?.songs[0].formattedDuration}*)\n[${progressbar.splitBar(queue!.songs[0].duration, queue!.currentTime, 16, '▬', '🔘')[0]}]\nVolumen: \`${queue?.volume}%\` | Repetir: \`${queue?.repeatMode === 2 ? 'ON | Lista' : queue?.repeatMode === 1 ? 'ON | Canción' : 'OFF'}\``);

            return msg.reply({ embeds: [embed] });
	} catch (error) {
	    console.error(error);
	    bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
	}
    }
});
