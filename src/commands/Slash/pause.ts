import { Interaction } from "../../structures/Interaction";

export default new Interaction()
.setName("pause")
.setDescription("Pausa la canción que está sonando.")
.setEnabledCommand(true)
.setChannelOnly(true)
.setSameChannel(true)
.setCheckQueue(true)
.setDJOnly(true)
.setCallback(async ({ bot, int }) => {
    try {
	if (bot.distube.getQueue(int.guildId)?.paused) return int.editReply(`${bot.getEmoji("error")} La canción ya estaba pausada anteriormente, para continuar la canción usa el comando /resume`);
	bot.distube.getQueue(int.guildId)?.pause();
	return int.editReply(`La canción **${bot.distube.getQueue(int.guildId)?.songs[0].name}** ha sido pausada. Para continuarla usa el comando /resume`);
    } catch (error) {
        console.error(error);
    }
});
