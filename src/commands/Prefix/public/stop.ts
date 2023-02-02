import { EmbedBuilder } from "discord.js";
import { Command } from "../../../structures/Command";

export default new Command({
    name: "stop",
    description: "Detiene la lista de canciones y saca al bot del canal de voz.",
    cooldown: 3,
    enabled: true,
    channelOnly: true,
    sameChannel: true,
    djOnly: true,
    async run(bot, msg) {
        try {
            await bot.distube.stop(msg).then(() => {
                return msg.reply(`${bot.getEmoji("check")} La lista ha sido eliminada.`);
            }).catch(err => { console.error(err); msg.channel.send(`${bot.getEmoji("warning")} Ocurrió un error al intentar eliminar la lista`); });
        } catch (error) {
            console.error(error);
            bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
        }
    }
});
