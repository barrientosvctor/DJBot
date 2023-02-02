import { Interaction } from "../../structures/Interaction";

export default new Interaction()
.setName("repeat")
.setDescription("Repite desde el incio la canción que está sonando.")
.setEnabledCommand(true)
.setChannelOnly(true)
.setSameChannel(true)
.setCheckQueue(true)
.setDJOnly(true)
.setCallback(async ({ bot, int }) => {
    try {
        bot.distube.getQueue(int.guildId)?.seek(0);
        return int.editReply(`${bot.getEmoji("check")} Bien! La canción **${bot.distube.getQueue(int.guildId)?.songs[0].name}** (${bot.distube.getQueue(int.guildId)?.songs[0].formattedDuration}) se ha repetido.`)
    } catch (error) {
        console.error(error);
    }
});
