import { Queue } from "distube";
import { Interaction } from "../../structures/Interaction";

export default new Interaction()
.setName("seek")
.setDescription("Busca una parte especifica de la canción en segundos.")
.addIntegerOption(opt => opt.setName("número").setDescription("Especifica en segundos el momento que quieres adelantar o atrasar la canción.").setRequired(true))
.setEnabledCommand(true)
.setChannelOnly(true)
.setSameChannel(true)
.setCheckQueue(true)
.setDJOnly(true)
.setCallback(async ({ bot, int }) => {
    try {
	const queue: Queue | undefined = bot.distube.getQueue(int.guildId);
	if (queue?.songs[0].isLive) return int.editReply(`${bot.getEmoji("error")} No puedo adelantar o atrasar streams.`);
	if (int.options.getInteger("número")! > queue!.songs[0].duration) return int.editReply(`${bot.getEmoji("error")} No puedo adelantar la canción a más de ${queue?.songs[0].duration} segundos.`)

	bot.distube.seek(int, int.options.getInteger("número") as number);
	return int.editReply(`Ahora la canción **${queue?.songs[0].name}** sonará desde el *segundo ${int.options.getInteger("número")}*`);
    } catch (error) {
        console.error(error);
    }
});
