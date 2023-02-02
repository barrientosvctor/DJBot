import { Interaction } from "../../structures/Interaction";

export default new Interaction()
.setName("clearqueue")
.setDescription("Limpia la lista de canciones por completo.")
.setEnabledCommand(true)
.setChannelOnly(true)
.setSameChannel(true)
.setCheckQueue(true)
.setDJOnly(true)
.setCallback(async ({ bot, int }) => {
    try {
        await bot.distube.getQueue(int.guildId)?.stop().then(() => {
            return int.editReply("Todas las canciones fueron eliminadas de la lista.");
        }).catch(err => {
            console.error(err);
            return int.editReply(`${bot.getEmoji("error")} Hubo un error al intentar limpiar la lista.`);
        });
    } catch (error) {
        console.error(error);
    }
});
