import { Queue } from "distube";
import { Interaction } from "../../structures/Interaction";

export default new Interaction()
.setName("loop")
.setDescription("Repite la canción o la lista.")
.addStringOption(opt => opt.setName("modo").setDescription("Selecciona alguna de las opciones para repetir o desactivar la repetición.").addChoices({ name: "Song", value: "song" }, { name: "Queue", value: "queue" }, { name: "OFF", value: "off" }).setRequired(true))
.setEnabledCommand(true)
.setChannelOnly(true)
.setSameChannel(true)
.setCheckQueue(true)
.setDJOnly(true)
.setCallback(async ({ bot, int }) => {
    try {
	const queue: Queue | undefined = bot.distube.getQueue(int.guildId);
	if (int.options.getString("modo") === "song") {
	    bot.distube.setRepeatMode(int.guildId, 1);
	} else if (int.options.getString("modo") === "queue") {
	    bot.distube.setRepeatMode(int.guildId, 2);
	} else {
	    bot.distube.setRepeatMode(int.guildId, 0);
	}
	return int.editReply(`${bot.getEmoji("check")} Bien! La ${queue?.repeatMode === 1 ? "canción se repetirá a partir de ahora" : queue?.repeatMode === 2 ? "lista se repetira a partir de ahora" : "repetición ha sido desactivada"}.`);
    } catch (error) {
        console.error(error);
    }
});
