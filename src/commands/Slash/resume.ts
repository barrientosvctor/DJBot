import { Interaction } from "../../structures/Interaction";

export default new Interaction()
.setName("resume")
.setDescription("Continua la canción que estaba sonando.")
.setEnabledCommand(true)
.setChannelOnly(true)
.setSameChannel(true)
.setCheckQueue(true)
.setDJOnly(true)
.setCallback(async ({ bot, int }) => {
    try {
	if (bot.distube.getQueue(int.guildId)?.playing) return int.editReply(`La canción **${bot.distube.getQueue(int.guildId)?.songs[0].name}** (${bot.distube.getQueue(int.guildId)?.songs[0].formattedDuration}) ya estaba sonando desde antes.`);
	bot.distube.getQueue(int.guildId)?.resume();
	return int.editReply(`Bien! La canción **${bot.distube.getQueue(int.guildId)?.songs[0].name}** (${bot.distube.getQueue(int.guildId)?.songs[0].formattedDuration}) ha vuelto a sonar.`)
    } catch (error) {
        console.error(error);
    }
});
