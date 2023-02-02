import { Queue } from "distube";
import { Interaction } from "../../structures/Interaction";

export default new Interaction()
.setName("skip")
.setDescription("Salta la canción a la siguiente.")
.setEnabledCommand(true)
.setChannelOnly(true)
.setSameChannel(true)
.setCheckQueue(true)
.setDJOnly(true)
.setCallback(async ({ bot, int }) => {
    try {
        const queue: Queue | undefined = bot.distube.getQueue(int.guildId);
        const song: string | undefined = queue?.songs[0].name;
        if (queue?.songs.length === 1) await queue?.stop().catch(err => { console.error(err); return int.editReply(`${bot.getEmoji("warning")} Ocurrió un error al intentar saltar la canción`); });
        else await queue?.skip().catch(err => { console.error(err); return int.editReply(`${bot.getEmoji("warning")} Ocurrió un error al intentar saltar la canción`); });

        return int.editReply(`La canción **${song}** acaba de ser saltada.`);
    } catch (error) {
        console.error(error);
    }
});
