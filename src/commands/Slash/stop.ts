import { Interaction } from "../../structures/Interaction";

export default new Interaction()
.setName("stop")
.setDescription("Detiene la reproducción de música y saca al bot del canal de voz.")
.setEnabledCommand(true)
.setChannelOnly(true)
.setSameChannel(true)
.setDJOnly(true)
.setCallback(async ({ bot, int }) => {
    try {
        bot.distube.stop(int).catch(err => { console.error(err); return int.editReply(`${bot.getEmoji("warning")} Hubo un error al intentar parar la reproducción de música.`); });
        return int.editReply(`${bot.getEmoji("check")} La reproducción de música ha parado.`);
    } catch (error) {
        console.error(error);
    }
});
