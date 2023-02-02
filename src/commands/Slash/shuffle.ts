import { Interaction } from "../../structures/Interaction";

export default new Interaction()
.setName("shuffle")
.setDescription("Pone un modo aleatorio en la lista.")
.setEnabledCommand(true)
.setChannelOnly(true)
.setSameChannel(true)
.setCheckQueue(true)
.setDJOnly(true)
.setCallback(async ({ bot, int }) => {
    try {
        bot.distube.getQueue(int.guildId)?.shuffle().then(() => { return int.editReply(`${bot.getEmoji("check")} Bien! El modo aleatorio ha sido puesto en la lista.`); }).catch(err => { console.error(err); return int.editReply(`${bot.getEmoji("warning")} Hubo un error al intentar poner el modo aleatorio la lista.`); })
    } catch (error) {
        console.error(error);
    }
});
