import { Queue } from "distube";
import { Interaction } from "../../structures/Interaction";

export default new Interaction()
.setName("remove")
.setDescription("Elimina una canción de la lista.")
.addIntegerOption(opt => opt.setName("número").setDescription("Escribe el número de lista de la canción que quieres sacar de la lista.").setRequired(true))
.setEnabledCommand(true)
.setChannelOnly(true)
.setSameChannel(true)
.setCheckQueue(true)
.setDJOnly(true)
.setCallback(async ({ bot, int }) => {
    try {
        const queue: Queue | undefined = bot.distube.getQueue(int.guildId);
        if (int.options.getInteger("número")! == 0) return int.editReply("¿Qué intentas hacer?").then(msg => setTimeout(() => msg.delete(), 5000));
        if (int.options.getInteger("número")! > queue!.songs.length) return int.editReply(`${bot.getEmoji("error")} No puedo eliminar una canción que no existe.`);

        if (int.options.getInteger("número")! === 1) {
            if (queue?.songs.length === 1) {
                int.editReply(`${bot.getEmoji("check")} La canción **${queue?.songs[0].name}** fue eliminado de la lista.`);
                queue?.songs.splice(0, 1);
                bot.distube.stop(int).catch(err => { console.error(err); return int.editReply(`${bot.getEmoji("warning")} Hubo un error al intentar eliminar la canción.`); });
            } else {
                int.editReply(`${bot.getEmoji("check")} La canción **${queue?.songs[0].name}** fue eliminado de la lista.`);
                bot.distube.skip(int).catch(err => { console.error(err); return int.editReply(`${bot.getEmoji("warning")} Hubo un error al intentar eliminar la canción.`); });
            }
        } else {
            int.editReply(`${bot.getEmoji("check")} La canción **${queue?.songs[int.options.getInteger("número")!-1].name}** fue eliminado de la lista.`);
            queue?.songs.splice(int.options.getInteger("número")!-1, 1);
        }
    } catch (error) {
        console.error(error);
    }
});
