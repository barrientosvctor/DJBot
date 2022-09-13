import { EmbedBuilder } from "discord.js";
import { Command } from "../../../structures/Command";

export default new Command({
    name: "clearqueue",
    description: "Limpia la lista de canciones.",
    cooldown: 3,
    aliases: ["cq"],
    enabled: true,
    channelOnly: true,
    sameChannel: true,
    checkQueue: true,
    djOnly: true,
    async run(bot, msg) {
	try {
	    await bot.distube.getQueue(msg.guildId!)?.stop().then(() => {
                return msg.reply(`${bot.getEmoji("check")} La lista acaba de ser limpiada.`);
            }).catch(err => { console.error(err); msg.channel.send(`Ocurrió un error mientras que se intentaba limpiar la lista`); });
	} catch (error) {
	    console.error(error);
	    bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
	}
    }
});
