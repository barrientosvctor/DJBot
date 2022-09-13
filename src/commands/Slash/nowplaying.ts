import { DJBotEmbed } from "../../structures/DJBotEmbed";
import { Interaction } from "../../structures/Interaction";
import progressbar from "string-progressbar";
import { Queue } from "distube";

export default new Interaction()
.setName("nowplaying")
.setDescription("Muestra información de la música que está sonando.")
.setEnabledCommand(true)
.setCheckQueue(true)
.setCallback(async ({ bot, int }) => {
    try {
	const queue: Queue | undefined = bot.distube.getQueue(int.guildId);
	const embed: DJBotEmbed = new DJBotEmbed(int.user, int.guild, {})
	.setTitle("Está sonando...")
	.setURL(queue?.songs[0].url || null)
	.setThumbnail(queue?.songs[0].thumbnail || null)
	.setDescription(`${queue?.songs[0].name} (\`${queue?.songs[0].formattedDuration}\`)\nPedido por: ${queue?.songs[0].user}\n\n(*${queue?.formattedCurrentTime}/${queue?.songs[0].formattedDuration}*)\n[${progressbar.splitBar(queue!.songs[0].duration, queue!.currentTime, 16, '▬', '🔘')[0]}]\nVolumen: \`${queue?.volume}%\` | Repetir: \`${queue?.repeatMode === 2 ? 'ON | Lista' : queue?.repeatMode === 1 ? 'ON | Canción' : 'OFF'}\``);

	return int.editReply({ embeds: [embed] });
    } catch (error) {
        console.error(error);
    }
});
