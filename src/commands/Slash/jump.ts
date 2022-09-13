import { Interaction } from "../../structures/Interaction";

export default new Interaction()
.setName("jump")
.setDescription("Adelanto la lista al número de lista que me indiques.")
.addIntegerOption(opt => opt.setName("número").setDescription("Escribe aquí el número de lista al que quieres adelantarte.").setRequired(true))
.setEnabledCommand(true)
.setChannelOnly(true)
.setSameChannel(true)
.setCheckQueue(true)
.setDJOnly(true)
.setCallback(async ({ bot, int }) => {
    try {
	if (int.options.getInteger("número") === 0) return int.editReply(`¿Qué intentas hacer?`).then(msg => setTimeout(() => msg.delete(), 5000)).catch(() => {});
	if (int.options.getInteger("número") === 1) return int.editReply(`Estás escuchando esa canción, prueba con otro número.`).then(msg => setTimeout(() => msg.delete(), 10000)).catch(() => {});
	if (int.options.getInteger("número")! > bot.distube.getQueue(int.guildId)!.songs.length) return int.editReply(`No puedo adelantar la lista a un número de lista que no existe.`);

	await bot.distube.jump(int, int.options.getInteger("número")!-1).then(() => {
	    return int.editReply(`${bot.getEmoji("check")} He adelantado la lista al número **${int.options.getInteger("número")}**`);
	}).catch(err => { console.error(err); return int.editReply(`${bot.getEmoji("error")} Ocurrió un error al intentar adelantar la lista.`); });
    } catch (error) {
        console.error(error);
    }
});
