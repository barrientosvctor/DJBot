import { Interaction } from "../../structures/Interaction";

export default new Interaction()
.setName("volume")
.setDescription("Cambia el volumen de la música.")
.addIntegerOption(opt => opt.setName("volumen").setDescription("Especifica el número al que quieres cambiar el volumen de la música.").setRequired(true))
.setEnabledCommand(true)
.setChannelOnly(true)
.setSameChannel(true)
.setCheckQueue(true)
.setDJOnly(true)
.setCallback(async ({ bot, int }) => {
    try {
        if (int.options.getInteger("volumen")! < 0 || int.options.getInteger("volumen")! > 100) return int.editReply(`${bot.getEmoji("error")} El volumen no puede ser menor a *0* o mayor a *100*`);
        bot.distube.setVolume(int, int.options.getInteger("volumen")!);
        return int.editReply(`${bot.getEmoji("check")} El volumen cambió a **${int.options.getInteger("volumen")}%**`);
    } catch (error) {
        console.error(error);
    }
});
