import { EmbedBuilder } from "discord.js";
import { Command } from "../../../structures/Command";

export default new Command({
    name: "shuffle",
    description: "Pone en modo aleatorio la lista de canciones.",
    cooldown: 3,
    aliases: ["shf"],
    enabled: true,
    channelOnly: true,
    sameChannel: true,
    checkQueue: true,
    djOnly: true,
    run(bot, msg) {
	try {
	    bot.distube.getQueue(msg.guildId!)?.shuffle().then(() => {
                return msg.reply(`${bot.getEmoji("check")} Ahora la lista está en modo aleatorio.`);
            }).catch(err => { console.error(err); msg.channel.send(`${bot.getEmoji("warning")} Ocurrió un error mientras que se intentaba activar el modo aleatorio en la lista`); });
	} catch (error) {
	    console.error(error);
	    bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
	}
    }
});
