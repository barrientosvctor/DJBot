import { EmbedBuilder } from "discord.js";
import { Queue } from "distube";
import { Command } from "../../../structures/Command";

export default new Command({
    name: "remove",
    description: "Elimina una canción de la lista.",
    usage: "<número de lista>",
    cooldown: 3,
    aliases: ["rm"],
    enabled: true,
    channelOnly: true,
    sameChannel: true,
    checkQueue: true,
    djOnly: true,
    async run(bot, msg, args) {
	try {
	    if (!args![1]) return msg.reply(`${bot.getEmoji("noargs")} Escribe el número de la canción que vas a eliminar.`);
            if (isNaN(parseInt(args![1]))) return msg.reply(`${bot.getEmoji("error")} El argumento **${args![1]}** tiene que ser un número.`);

            const queue: Queue | undefined = bot.distube.getQueue(msg.guildId!);

            if (parseInt(args![1]) > queue!.songs.length) return msg.reply(`${bot.getEmoji("error")} No puedo eliminar una canción que no existe.`);
            if (parseInt(args![1]) === 0) return;

            if (parseInt(args![1]) === 1) {
                if (queue?.songs.length === 1) {
                    queue?.songs.splice(0, 1);
                    await bot.distube.stop(msg)?.catch(err => { console.error(err); msg.channel.send(`${bot.getEmoji("warning")} Hubo un error al intentar eliminar la canción: \`${err}\``) });    
                } else {
                    await bot.distube.skip(msg)?.catch(err => { console.error(err); msg.channel.send(`${bot.getEmoji("warning")} Hubo un error al intentar eliminar la canción: \`${err}\``) });
                }
                return msg.reply(`${bot.getEmoji("check")} La canción **${queue?.songs[0].name}** se ha eliminado de la lista.`);
            } else {
                msg.reply(`La canción **${queue?.songs[parseInt(args![1])-1].name}** se ha eliminado de la lista.`);
                queue?.songs.splice(parseInt(args![1])-1, 1);
            }
	} catch (error) {
	    console.error(error);
	    bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
	}
    }
});
