import { DJBotEmbed } from "../../structures/DJBotEmbed";
import { Interaction } from "../../structures/Interaction";
import { Queue, Song } from "distube";

export default new Interaction()
.setName("queue")
.setDescription("Muestra la lista de canciones.")
.setEnabledCommand(true)
.setCheckQueue(true)
.setCallback(async ({ bot, int }) => {
    try {
	const queue: Queue | undefined = bot.distube.getQueue(int.guildId);
	const embed: DJBotEmbed = new DJBotEmbed(int.user, int.guild, { footer: { text: queue?.songs.length === 1 ? `1 canción en total.` : `${queue?.songs.length} canciones en total.` } })
	.setTitle(`Lista de ${int.guild.name}`)
	.setThumbnail(queue?.songs[0].thumbnail || null)
	.setDescription(queue?.songs.map((song: Song, i: number): string => `**${i+1}.** - [${song?.name}](${song?.url}) | \`(${song?.formattedDuration})\``).join("\n").substring(0, 3000) || "Información no disponible.");

	return int.editReply({ embeds: [embed] });
    } catch (error) {
        console.error(error);
    }
});
